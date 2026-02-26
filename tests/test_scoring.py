import pytest
import pandas as pd
import numpy as np
from ibkr_tws.scanner_engine import ScannerEngine
from unittest.mock import MagicMock

@pytest.fixture
def scanner_engine():
    mock_service = MagicMock()
    return ScannerEngine(mock_service)

@pytest.fixture
def mock_data():
    """Create 100 days of mock stock data"""
    dates = pd.date_range(start='2023-01-01', periods=200)
    data = {
        'date': dates,
        'open': np.linspace(100, 150, 200),
        'high': np.linspace(105, 155, 200),
        'low': np.linspace(95, 145, 200),
        'close': np.linspace(100, 150, 200),
        'volume': [1000000] * 200
    }
    return pd.DataFrame(data)

def test_calculate_metrics_basic(scanner_engine, mock_data):
    config = {
        'min_price': 5.0,
        'min_volume_dollars': 500000,
        'min_adr': 1.0, # Lowering for test
        'min_score': 0,
        'lookback_days': 21
    }
    
    # Add a surge to the end to trigger signals
    mock_data.loc[mock_data.index[-1], 'close'] = 200
    mock_data.loc[mock_data.index[-1], 'volume'] = 5000000
    
    metrics = scanner_engine.calculate_metrics(mock_data, 'TEST', config)
    
    assert metrics is not None
    assert metrics['symbol'] == 'TEST'
    # Score should be high due to surge and trending data
    assert metrics['score'] > 5
    assert 'signals' in metrics
    assert 'adr' in metrics
    assert 'rs_pct' in metrics

def test_calculate_metrics_low_price(scanner_engine, mock_data):
    config = {'min_price': 1000.0}
    metrics = scanner_engine.calculate_metrics(mock_data, 'TEST', config)
    assert metrics is None

def test_calculate_metrics_low_volume(scanner_engine, mock_data):
    mock_data['volume'] = 100
    config = {'min_volume': 500000}
    metrics = scanner_engine.calculate_metrics(mock_data, 'TEST', config)
    assert metrics is None
