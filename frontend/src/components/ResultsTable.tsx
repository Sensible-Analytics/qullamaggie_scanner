import { useScannerStore } from '../store/scannerStore';
import { ScanProgressSkeleton } from './ScanProgressSkeleton';
import { EmptyState } from './EmptyState';
import { ExportToolbar } from './ExportToolbar';

export default function ResultsTable() {
  const { results, selectedSymbol, setSelectedSymbol, progress, isLoading } = useScannerStore();

  const getScoreColor = (score: number) => {
    if (score >= 15) return 'bg-green-900/50 text-green-400';
    if (score >= 10) return 'bg-yellow-900/50 text-yellow-400';
    return 'bg-red-900/50 text-red-400';
  };

  if (isLoading && progress) {
    return <ScanProgressSkeleton progress={progress} />;
  }

  if (!results.length) {
    return <EmptyState />;
  }

  return (
    <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="px-4 py-3 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
        <h2 className="font-mono text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
          Scan Results ({results.length} stocks)
        </h2>
        <ExportToolbar results={results} />
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
