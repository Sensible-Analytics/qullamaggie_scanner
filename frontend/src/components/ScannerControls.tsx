import { useEffect, useRef, useCallback } from 'react';
import { useScannerStore } from '../store/scannerStore';
import { calculateMetrics, filterAndSortResults } from '../utils/calculations';
import { fetchBatchHistoricalData, STOCK_UNIVERSES, type StockUniverse } from '../services/stockApi';
import { UniverseSelect, FilterInputs } from './FilterComponents';

export default function ScannerControls() {
  const {
    selectedUniverse,
    filters,
    setIsLoading,
    setError,
    setProgress,
    setResults,
    isLoading,
    error,
    results,
    resetScan,
    loadUniverses,
  } = useScannerStore();
  
  const hasAutoScanned = useRef(false);

  const handleRunScan = useCallback(async () => {
    resetScan();
    setIsLoading(true);
    
    try {
      const universe = STOCK_UNIVERSES.find((u: StockUniverse) => u.name === selectedUniverse);
      if (!universe) {
        throw new Error('Please select a valid stock universe');
      }
      
      const dataMap = await fetchBatchHistoricalData(
        universe.symbols,
        (current, total, symbol) => {
          setProgress({ current, total, symbol });
        }
      );
      
      if (dataMap.size === 0) {
        throw new Error('No data received. Please try again.');
      }
      
      const scanResults = [];
      for (const [symbol, data] of Array.from(dataMap.entries())) {
        const { metrics } = calculateMetrics(data, symbol, filters);
        if (metrics) {
          scanResults.push(metrics);
        }
      }
      
      const filteredResults = filterAndSortResults(scanResults, filters.minScore);
      setResults(filteredResults);
      setProgress(null);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  }, [selectedUniverse, filters, resetScan, setIsLoading, setError, setProgress, setResults]);

  useEffect(() => {
    loadUniverses();
  }, [loadUniverses]);

  useEffect(() => {
    if (!hasAutoScanned.current && results.length === 0 && !isLoading) {
      hasAutoScanned.current = true;
      handleRunScan();
    }
  }, [handleRunScan, results.length, isLoading]);

  return (
    <div className="rounded-lg border p-4" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
          Scanner Config
        </h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-green)' }}></span>
          <span className="text-xs font-mono" style={{ color: 'var(--accent-green)' }}>
            {isLoading ? 'running' : 'ready'}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <UniverseSelect />
        <FilterInputs />

        <button
          onClick={handleRunScan}
          disabled={isLoading}
          className="w-full py-2 px-4 rounded font-mono text-sm font-medium transition-all"
          style={{ 
            backgroundColor: isLoading ? 'var(--bg-tertiary)' : 'var(--accent-green)', 
            color: isLoading ? 'var(--text-muted)' : 'var(--bg-primary)',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? '[ scanning... ]' : '[ run scan ]'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded text-sm font-mono" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
          <p>{error}</p>
          <button 
            onClick={handleRunScan}
            className="mt-2 underline hover:no-underline"
          >
            retry
          </button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <h3 className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
          20-Point System
        </h3>
        <ul className="text-xs font-mono space-y-1" style={{ color: 'var(--text-muted)' }}>
          <li className="flex justify-between">
            <span>ADR%</span>
            <span style={{ color: 'var(--text-secondary)' }}>5 max</span>
          </li>
          <li className="flex justify-between">
            <span>RS Momentum</span>
            <span style={{ color: 'var(--text-secondary)' }}>4 max</span>
          </li>
          <li className="flex justify-between">
            <span>EMA Alignment</span>
            <span style={{ color: 'var(--text-secondary)' }}>7 max</span>
          </li>
          <li className="flex justify-between">
            <span>Tightness</span>
            <span style={{ color: 'var(--text-secondary)' }}>2 max</span>
          </li>
          <li className="flex justify-between">
            <span>Volume Surge</span>
            <span style={{ color: 'var(--text-secondary)' }}>2 max</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
