import pytest
from unittest.mock import MagicMock, patch
from ibkr_tws.ib_service import IBService

@pytest.fixture
def mock_ib():
    return MagicMock()

@pytest.fixture
def ib_service(mock_ib):
    # Reset singleton for testing
    IBService._instance = None
    return IBService(ib_instance=mock_ib)

def test_ib_service_singleton(ib_service):
    service2 = IBService()
    assert ib_service is service2

def test_connect_success(ib_service, mock_ib):
    mock_ib.isConnected.return_value = False
    
    success, msg = ib_service.connect()
    
    assert success is True
    assert "Connected" in msg
    mock_ib.connect.assert_called_once()

def test_connect_already_connected(ib_service, mock_ib):
    mock_ib.isConnected.return_value = True
    
    success, msg = ib_service.connect()
    
    assert success is True
    assert "Already connected" in msg
    mock_ib.connect.assert_not_called()

def test_connect_failure(ib_service, mock_ib):
    mock_ib.isConnected.return_value = False
    mock_ib.connect.side_effect = Exception("Connection Refused")
    
    success, msg = ib_service.connect()
    
    assert success is False
    assert "Connection Refused" in msg
