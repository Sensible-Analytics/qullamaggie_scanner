import { useScannerStore } from '../store/scannerStore';
import { STOCK_UNIVERSES } from '../services/stockApi';
import { calculateMetrics, filterAndSortResults } from '../utils/calculations';
import { fetchBatchHistoricalData } from '../services/stockApi';

export default function ScannerControls() {
  const {
    selectedUniverse,
    setSelectedUniverse,
    filters,
    updateFilters,
    setIsLoading,
    setError,
    setProgress,
    setResults,
    isLoading,
    error,
    resetScan,
  } = useScannerStore();

  const handleRunScan = async () => {
    resetScan();
    setIsLoading(true);
    
    try {
      const universe = STOCK_UNIVERSES.find(u => u.name === selectedUniverse);
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
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Scanner Controls</h2>
      
      <div className="space-y-4">
        {/* Universe Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Universe
          </label>
          <select
            value={selectedUniverse}
            onChange={(e) => setSelectedUniverse(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {STOCK_UNIVERSES.map((universe) => (
              <option key={universe.name} value={universe.name}>
                {universe.name} ({universe.symbols.length} symbols)
              </option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price ($)
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            min="0"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Volume ($ millions)
          </label>
          <input
            type="number"
            value={filters.minVolumeDollars / 1000000}
            onChange={(e) => updateFilters({ minVolumeDollars: Number(e.target.value) * 1000000 })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            min="0"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min ADR (%)
          </label>
          <input
            type="number"
            value={filters.minADR}
            onChange={(e) => updateFilters({ minADR: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            min="0"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Score (0-20)
          </label>
          <input
            type="number"
            value={filters.minScore}
            onChange={(e) => updateFilters({ minScore: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            min="0"
            max="20"
            step="1"
          />
        </div>

        <button
          onClick={handleRunScan}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md transition-colors ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? 'Scanning...' : 'Run Scan'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
          <button 
            onClick={handleRunScan}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Scoring System</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• ADR% (5 pts max)</li>
          <li>• RS Momentum (4 pts max)</li>
          <li>• EMA Alignment (7 pts max)</li>
          <li>• Tightness (2 pts max)</li>
          <li>• Volume Surge (2 pts max)</li>
        </ul>
      </div>
    </div>
  );
}