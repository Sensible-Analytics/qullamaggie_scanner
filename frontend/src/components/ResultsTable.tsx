import { useScannerStore } from '../store/scannerStore';
import { exportToCSV, exportToWatchlist, exportToJson } from '../utils/export';

export default function ResultsTable() {
  const { results, selectedSymbol, setSelectedSymbol, progress, isLoading } = useScannerStore();

  const getScoreColor = (score: number) => {
    if (score >= 15) return 'bg-green-100 text-green-800';
    if (score >= 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Scanning Markets...</h2>
        <div className="space-y-4">
          {progress && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Analyzing: <span className="font-medium text-blue-600">{progress.symbol}</span>
                </span>
                <span className="text-gray-500">{progress.current} of {progress.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-2">
                <svg className="animate-spin h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Running Qullamaggie 20-point analysis...</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Scan Results</h2>
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-4 text-sm font-medium text-gray-900">Ready to analyze</h3>
          <p className="mt-2 text-sm text-gray-500">
            Click "Run Scan" to start analyzing stocks using the Qullamaggie methodology.
          </p>
        </div>
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