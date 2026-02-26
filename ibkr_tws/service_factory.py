import logging
import threading

class ServiceFactory:
    _instance = None
    _lock = threading.RLock()  # Use RLock for re-entrant access
    
    _ib_service = None
    _scanner_engine = None
    _history_manager = None

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(ServiceFactory, cls).__new__(cls)
            return cls._instance

    @classmethod
    def get_ib_service(cls):
        # Import OUTSIDE lock to prevent deadlock during concurrent Streamlit init
        from ibkr_tws.ib_service import IBService
        
        with cls._lock:
            if cls._ib_service is None:
                cls._ib_service = IBService()
            return cls._ib_service

    @classmethod
    def get_scanner_engine(cls):
        # Import OUTSIDE lock to prevent deadlock during concurrent Streamlit init
        from ibkr_tws.scanner_engine import ScannerEngine
        
        with cls._lock:
            if cls._scanner_engine is None:
                service = cls.get_ib_service()
                cls._scanner_engine = ScannerEngine(service)
            return cls._scanner_engine

    @classmethod
    def get_history_manager(cls):
        # Import OUTSIDE lock to prevent deadlock during concurrent Streamlit init
        from ibkr_tws.history_manager import HistoryManager
        
        with cls._lock:
            if cls._history_manager is None:
                cls._history_manager = HistoryManager()
            return cls._history_manager
