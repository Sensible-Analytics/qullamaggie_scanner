import { useScannerStore } from '../store/scannerStore';
import { exportToCSV, exportToWatchlist, exportToJson } from '../utils/export';

export default function ResultsTable() {
  const { results, selectedSymbol, setSelectedSymbol, progress, isLoading } = useScannerStore();

  const getScoreColor = (score: number) => {
    if (score >= 15) return 'bg-green-100 text-green-800';
    if (score >= 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (isLoading && progress) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Scan Progress</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Scanning: {progress.symbol}</span>
            <span>{progress.current} / {progress.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Scan Results</h2>
        <p className="text-gray-500 text-center py-8">
          No results yet. Run a scan to see momentum stocks.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl font-semibold">
          Scan Results ({results.length} stocks)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => exportToCSV(results)}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={() => exportToWatchlist(results)}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            Watchlist
          </button>
          <button
            onClick={() => exportToJson(results)}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            Export JSON
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ADR%
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RS%
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signals
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((stock) => (
              <tr
                key={stock.symbol}
                onClick={() => setSelectedSymbol(stock.symbol)}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedSymbol === stock.symbol ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {stock.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${stock.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(stock.score)}`}>
                    {stock.score}/20
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stock.adr.toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stock.rs_pct.toFixed(0)}%
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {stock.signals.join(' | ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}