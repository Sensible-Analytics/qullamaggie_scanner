import pytest
import pandas as pd
import numpy as np
from unittest.mock import MagicMock, patch
from ibkr_tws.scanner_engine import ScannerEngine

@pytest.fixture
def mock_ib_service():
    service = MagicMock()
    mock_ib = MagicMock()
    service.get_ib.return_value = mock_ib
    return service

@pytest.fixture
def scanner_engine(mock_ib_service):
    return ScannerEngine(mock_ib_service)

def generate_mock_data(high_momentum=False, high_adr=True):
    """Generates mock historical data for testing."""
    dates = pd.date_range(end=pd.Timestamp.now(), periods=100)
    
    if high_momentum:
        # Stock goes from 10 to 100
        close = np.linspace(10, 100, 100)
    else:
        # Stock stays flat
        close = np.array([50.0] * 100)
        
    if high_adr:
        # High-low range is 10% of close
        high = close * 1.05
        low = close * 0.95
    else:
        # Low ADR
        high = close * 1.01
        low = close * 0.99
        
    return pd.DataFrame({
        'date': dates,
        'open': close,
        'high': high,
        'low': low,
        'close': close,
        'volume': [1000000] * 100
    })

@patch('ibkr_tws.scanner_engine.util.df')
@patch('ibkr_tws.scanner_engine.Stock')
def test_scan_multi_timeframe_aggregation(mock_stock, mock_util_df, scanner_engine, mock_ib_service):
    """Tests that stocks appearing in multiple timeframes are correctly aggregated and boosted."""
    mock_ib = mock_ib_service.get_ib()
    
    # Mock symbols returned by TWS for each timeframe
    # TF1: 1M (21d) -> ['AAPL', 'TSLA']
    # TF2: 3M (63d) -> ['AAPL', 'MSFT']
    # TF3: 6M (126d) -> ['AAPL', 'NVDA']
    # AAPL appears in 3, others in 1.
    
    def mock_req_scanner_data(sub):
        if sub.scanCode == 'TOP_PERC_GAIN': return [MagicMock(contractDetails=MagicMock(contract=MagicMock(symbol='AAPL'))), MagicMock(contractDetails=MagicMock(contract=MagicMock(symbol='TSLA')))]
        if sub.scanCode == 'MOST_ACTIVE': return [MagicMock(contractDetails=MagicMock(contract=MagicMock(symbol='AAPL'))), MagicMock(contractDetails=MagicMock(contract=MagicMock(symbol='MSFT')))]
        if sub.scanCode == 'HOT_BY_VOLUME': return [MagicMock(contractDetails=MagicMock(contract=MagicMock(symbol='AAPL'))), MagicMock(contractDetails=MagicMock(contract=MagicMock(symbol='NVDA')))]
        return []

    mock_ib.reqScannerData.side_effect = mock_req_scanner_data
    mock_ib.qualifyContracts.return_value = [True]
    mock_ib.reqHistoricalData.return_value = [MagicMock()] * 100
    
    # Mock historical data for all symbols
    # We want them to pass filters
    mock_util_df.return_value = generate_mock_data(high_momentum=True, high_adr=True)
    
    config = {
        'min_price': 5.0,
        'min_volume_dollars': 100000,
        'min_adr': 5.0,
        'min_score': 0
    }
    
    results = scanner_engine.scan_multi_timeframe(config)
    
    # Verify AAPL is first (appeared in 3 timeframes)
    assert results[0]['symbol'] == 'AAPL'
    assert '1M' in results[0]['timeframes']
    assert '3M' in results[0]['timeframes']
    assert '6M' in results[0]['timeframes']
    
    # AAPL should have a higher score than a single-TF stock due to +4 bonus (2 per additional TF)
    # TSLA appeared once, MSFT appeared once, NVDA appeared once.
    # Scores are based on metrics + TF bonus.
    
    # Verify others are present
    symbols = [r['symbol'] for r in results]
    assert 'TSLA' in symbols
    assert 'MSFT' in symbols
    assert 'NVDA' in symbols

def test_hard_filters_adr(scanner_engine, mock_ib_service):
    """Explicitly tests that ADR filter is enforced."""
    low_adr_data = generate_mock_data(high_momentum=True, high_adr=False)
    config = {'min_adr': 5.0} # ADR is ~2% in mock data
    
    metrics = scanner_engine.calculate_metrics(low_adr_data, 'LOW_ADR', config)
    assert metrics is None

def test_stop_scan_logic(scanner_engine, mock_ib_service):
    """Tests that the engine respects stop requests."""
    mock_ib = mock_ib_service.get_ib()
    mock_ib.qualifyContracts.return_value = [True]
    
    # Simulate a universe of 10 symbols
    symbols = [f'S{i}' for i in range(10)]
    config = {'min_score': 0}
    
    # Trigger stop after 3 symbols
    def progress_callback(data):
        if data['current'] == 3:
            scanner_engine.request_stop()
            
    scanner_engine.set_progress_callback(progress_callback)
    
    with patch('ibkr_tws.scanner_engine.util.df') as mock_df:
        mock_df.return_value = generate_mock_data()
        results = scanner_engine.scan_universe(symbols, config)
        
    # Should have processed 3 and then stopped
    assert len(results) <= 3
    assert scanner_engine.stop_requested is True

def test_rs_calculation_from_low(scanner_engine):
    """Tests that RS is calculated from the lowest point in the period."""
    # Create data: Low of 50, Current price 100 -> RS = 100%
    dates = pd.date_range(end=pd.Timestamp.now(), periods=100)
    close = [75] * 100
    close[-1] = 100 # Current
    low = [75] * 100
    low[50] = 50 # Periodic low
    
    df = pd.DataFrame({
        'date': dates,
        'high': close,
        'low': low,
        'close': close,
        'volume': [1000000] * 100
    })
    
    config = {'lookback_days': 100, 'min_price': 1, 'min_volume_dollars': 1, 'min_adr': 0}
    
    metrics = scanner_engine.calculate_metrics(df, 'TEST', config)
    assert metrics['rs_pct'] == 100.0 # (100/50 - 1) * 100
