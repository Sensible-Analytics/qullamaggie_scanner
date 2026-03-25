import { useScannerStore } from '../store/scannerStore';
import { exportToCSV, exportToWatchlist, exportToJson } from '../utils/export';

export default function ResultsTable() {
  const { results, selectedSymbol, setSelectedSymbol, progress, isLoading } = useScannerStore();

  const getScoreColor = (score: number) => {
    if (score >= 15) return 'bg-green-900/50 text-green-400';
    if (score >= 10) return 'bg-yellow-900/50 text-yellow-400';
    return 'bg-red-900/50 text-red-400';
  };

  if (isLoading && progress) {
    return (
      <div className="rounded-lg border p-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="animate-pulse" style={{ color: 'var(--accent-amber)' }}>●</span>
          <span className="font-mono">Scanning markets...</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-mono">
            <span style={{ color: 'var(--text-secondary)' }}>
              {progress.symbol}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{progress.current}/{progress.total}</span>
          </div>
          <div className="w-full rounded-full h-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div
              className="h-1 rounded-full transition-all"
              style={{ width: `${(progress.current / progress.total) * 100}%`, backgroundColor: 'var(--accent-green)' }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="rounded-lg border p-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="text-center py-8">
          <div className="font-mono text-4xl mb-4 opacity-20">[]</div>
          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            Select a universe and run scan to find momentum stocks
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="px-4 py-3 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
        <h2 className="font-mono text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
          Scan Results ({results.length} stocks)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => exportToCSV(results)}
            className="px-3 py-1 text-xs font-mono rounded transition-colors hover:opacity-80"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
          >
            CSV
          </button>
          <button
            onClick={() => exportToWatchlist(results)}
            className="px-3 py-1 text-xs font-mono rounded transition-colors hover:opacity-80"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
          >
            Watchlist
          </button>
          <button
            onClick={() => exportToJson(results)}
            className="px-3 py-1 text-xs font-mono rounded transition-colors hover:opacity-80"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
          >
            JSON
          </button>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <tr className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              <th className="px-4 py-2 text-left font-medium">Symbol</th>
              <th className="px-4 py-2 text-right font-medium">Price</th>
              <th className="px-4 py-2 text-center font-medium">Score</th>
              <th className="px-4 py-2 text-right font-medium">ADR%</th>
              <th className="px-4 py-2 text-right font-medium">RS%</th>
              <th className="px-4 py-2 text-left font-medium">Signals</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {results.map((stock) => (
              <tr
                key={stock.symbol}
                onClick={() => setSelectedSymbol(stock.symbol)}
                className="cursor-pointer transition-colors hover:bg-black/20"
                style={selectedSymbol === stock.symbol ? { backgroundColor: 'rgba(34, 197, 94, 0.1)' } : undefined}
              >
                <td className="px-4 py-2 font-mono font-medium" style={{ color: 'var(--accent-green)' }}>
                  {stock.symbol}
                </td>
                <td className="px-4 py-2 text-right font-mono">
                  ${stock.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${getScoreColor(stock.score)}`}>
                    {stock.score}
                  </span>
                </td>
                <td className="px-4 py-2 text-right font-mono text-sm">
                  {stock.adr.toFixed(1)}%
                </td>
                <td className="px-4 py-2 text-right font-mono text-sm">
                  {stock.rs_pct.toFixed(0)}%
                </td>
                <td className="px-4 py-2 text-xs font-mono truncate max-w-[200px]" style={{ color: 'var(--text-muted)' }}>
                  {stock.signals.join(' · ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
