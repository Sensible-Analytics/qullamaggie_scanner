import json
import logging
import asyncio
from pathlib import Path

class IBService:
    _instance = None
    
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(IBService, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance
        
    def __init__(self, ib_instance=None):
        if self._initialized:
            return
        
        # Don't create IB instance here - it will be created lazily when needed
        self.ib = ib_instance  # Will be None initially
        self.logger = logging.getLogger(__name__)
        self.logger.info("IBService initialized (IB instance will be created on demand)")
        self.settings = self._load_settings()
        self._initialized = True
        
    def _load_settings(self):
        settings_path = Path(__file__).parent.parent / "settings.json"
        if settings_path.exists():
            with open(settings_path, 'r') as f:
                return json.load(f)
        return {
            "ibkr": {
                "host": "127.0.0.1",
                "port": 7497,
                "base_client_id": 10,
                "timeout": 20
            }
        }

    def save_settings(self):
        settings_path = Path(__file__).parent.parent / "settings.json"
        with open(settings_path, 'w') as f:
            json.dump(self.settings, f, indent=4)

    def connect(self, client_id_offset=0):
        """Standard connection attempt"""
        if self.ib.isConnected():
            return True, "Already connected"
            
        host = self.settings['ibkr']['host']
        port = self.settings['ibkr']['port']
        client_id = self.settings['ibkr']['base_client_id'] + client_id_offset
        timeout = self.settings['ibkr'].get('timeout', 20)
        
        try:
            # For Streamlit, we must ensure we are not blocking the main thread 
            # while allowing the background event loop to handle the timeout.
            self.ib.connect(host, port, clientId=client_id, timeout=timeout)
            return True, f"Connected to {host}:{port} (ID: {client_id})"
        except Exception as e:
            self.logger.error(f"Connection failed: {e}")
            return False, str(e)
            
    def connect_sync(self, client_id_offset=0):
        """
        Robust Connection Strategy:
        1. Spawns a dedicated background thread for the asyncio loop (if not present).
        2. Applies Py3.14 patches.
        3. Waits for connection result.
        """
        # Lazy-initialize IB instance if not already created
        if self.ib is None:
            import nest_asyncio
            import sys
            
            nest_asyncio.apply()
            
            from ib_insync import IB
            self.ib = IB()
            self.logger.info("IB instance created on-demand")
            
            # --- MONKEY PATCH (Idempotent) ---
            import ib_insync.client
            
            if not getattr(ib_insync.client.Client, '_is_patched', False):
                original_connectAsync = ib_insync.client.Client.connectAsync
                
                async def patched_connectAsync(self_client, host, port, clientId, timeout=2.0):
                    self_client._logger.info(f'Connecting to {host}:{port} with clientId {clientId}...')
                    self_client.host = host
                    self_client.port = int(port)
                    self_client.clientId = int(clientId)
                    self_client.connState = self_client.CONNECTING
                    timeout = timeout or 2.0
                    
                    try:
                        # 1. Connection Task
                        coro = self_client.conn.connectAsync(host, port)
                        task = asyncio.create_task(coro)
                        done, pending = await asyncio.wait([task], timeout=timeout)
                        
                        if task not in done:
                            task.cancel()
                            raise asyncio.TimeoutError(f"Connection to {host}:{port} timed out after {timeout}s")
                        
                        await task 
                        
                        self_client._logger.info('Connected')
                        msg = b'API\0' + self_client._prefix(b'v%d..%d%s' % (
                            self_client.MinClientVersion, self_client.MaxClientVersion,
                            b' ' + self_client.connectOptions if self_client.connectOptions else b''))
                        self_client.conn.sendMsg(msg)
                        
                        # 2. API Start Event Task
                        async def wait_api_start():
                            await self_client.apiStart
                        
                        task_start = asyncio.create_task(wait_api_start())
                        done, pending = await asyncio.wait([task_start], timeout=timeout)
                        
                        if task_start not in done:
                             task_start.cancel()
                             raise asyncio.TimeoutError("API handshake timed out (TWS not responding?)")
                        
                        await task_start
                        
                        self_client._logger.info('API connection ready')
                    except Exception as e:
                        self_client.disconnect()
                        self_client._logger.error(f"ConnectAsync failed: {e}")
                        raise e

                ib_insync.client.Client.connectAsync = patched_connectAsync
                ib_insync.client.Client._is_patched = True
                self.logger.warning("Applied monkey-patch to ib_insync.Client.connectAsync for Python 3.14 compatibility")
            # --- END PATCH ---

        if self.ib.isConnected():
            return True, "Already connected"

        host = self.settings['ibkr']['host']
        port = self.settings['ibkr']['port']
        client_id = self.settings['ibkr']['base_client_id'] + client_id_offset
        timeout = self.settings['ibkr'].get('timeout', 15)

        self.logger.info(f"⚡ Python 3.14 Background Connection attempting {host}:{port} (ID: {client_id})")
        # Shared synchronization primitive
        import threading
        import time
        
        # If we successfully connect, we don't want to re-run this logic heavily
        # But we need to ensure the loop thread is running.
        
        def _ib_loop_worker():
            import asyncio
            import sys
            
            # --- GLOBAL ASYNCIO PATCH for 3.14 (Critical) ---
            # Python 3.14's asyncio.wait_for uses asyncio.timeout(), which strictly requires
            # being called inside a Task. This breaks ib_insync internal calls (e.g. util.run or implicit waits).
            # We replace it with a manual wait implementation that is more forgiving.
            if not getattr(asyncio, '_wait_for_patched', False):
                async def forgiving_wait_for(fut, timeout=None):
                    if timeout is None:
                        return await fut
                    
                    if asyncio.iscoroutine(fut):
                        task = asyncio.create_task(fut)
                    else:
                        task = asyncio.ensure_future(fut)
                        
                    done, pending = await asyncio.wait([task], timeout=timeout)
                    if task in done:
                        return await task
                    else:
                        task.cancel()
                        try:
                            await task
                        except asyncio.CancelledError:
                            pass
                        raise asyncio.TimeoutError
                
                asyncio.wait_for = forgiving_wait_for
                asyncio._wait_for_patched = True
                self.logger.warning("Applied global patch to asyncio.wait_for")
            # -----------------------------------------------

            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            
            # Connect
            try:
                loop.run_until_complete(self.ib.connectAsync(host, port, clientId=client_id, timeout=timeout))
            except Exception as e:
                self.logger.error(f"Loop worker connection error: {e}")
            
            # Keep alive
            try:
                loop.run_forever()
            except Exception as e:
                 self.logger.error(f"Loop worker crashed: {e}")

        # Start the thread
        t = threading.Thread(target=_ib_loop_worker, daemon=True, name="IB_Loop_Thread")
        t.start()
        
        # Wait for connection in Main Thread
        # Since the worker runs in background, we poll for status
        start = time.time()
        while time.time() - start < timeout:
            if self.ib.isConnected():
                self.logger.info(f"✅ TWS Connected successfully (ID: {client_id})")
                return True, f"Connected to {host}:{port}"
            time.sleep(0.1)
            
        # Check if we failed
        return False, "Connection timed out (Check TWS/Gateway)"
    def disconnect(self):
        if self.ib and self.ib.isConnected():
            self.ib.disconnect()
    
    def is_connected(self):
        return self.ib is not None and self.ib.isConnected()

    def get_ib(self):
        return self.ib
