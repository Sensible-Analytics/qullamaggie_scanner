import { useEffect, useRef, useCallback } from 'react';
import { useScannerStore } from '../store/scannerStore';
import { calculateMetrics, filterAndSortResults } from '../utils/calculations';
import { fetchBatchHistoricalData, STOCK_UNIVERSES, type StockUniverse } from '../services/stockApi';
import { UniverseSelect, FilterInputs } from './FilterComponents';
import { ScannerStatus } from './ScannerStatus';
import { ScoringLegend } from './ScoringLegend';

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
        <ScannerStatus isLoading={isLoading} />
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

      <ScoringLegend />
    </div>
  );
}
