import pytest
import asyncio
import sys
import logging
from ibkr_tws.ib_service import IBService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@pytest.mark.asyncio
async def test_tws_connection_python_314_compatibility():
    """
    Verifies that IBService can connect to TWS on Python 3.14+
    without triggering 'Timeout should be used inside a task' errors.
    """
    if sys.version_info < (3, 11):
        pytest.skip("This test targets Python 3.11+ asyncio strictness")

    logger.info("Initializing IBService for Test...")
    service = IBService()
    
    # We use connect_sync because that's what the dashboard uses and where the patch lives
    logger.info("Attempting connect_sync()...")
    
    # Run in a thread executor to simulate Streamlit's usage pattern?
    # connect_sync spawns its own thread, so calling it directly is fine.
    
    # We need to wrap it in to_thread because connect_sync blocks for a few seconds waiting for result
    success, msg = await asyncio.to_thread(service.connect_sync)
    
    if success:
        logger.info(f"✅ Connection Successful: {msg}")
        assert service.is_connected()
        
        # Verify persistence
        await asyncio.sleep(2)
        assert service.is_connected(), "Connection dropped immediately!"
        
        # Verify data request (optional, requires TWS to be active/subscribed)
        # We just check if client is responsive
        assert service.ib.client.isConnected()
        
        service.disconnect()
        logger.info("✅ Disconnected cleanly")
    else:
        # If TWS is not running, we expect a graceful failure, NOT a crash.
        logger.info(f"⚠️ Connection failed (expected if TWS not running): {msg}")
        # We assert that it didn't crash with RuntimeError
        assert "Timeout should be used inside a task" not in msg

    # Explicit yield to let background tasks clean up might help pytest runner
    await asyncio.sleep(0.5)
