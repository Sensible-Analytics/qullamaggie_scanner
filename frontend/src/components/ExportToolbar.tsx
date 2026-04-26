import type { StockMetrics } from '../utils/calculations';
import { exportToCSV, exportToWatchlist, exportToJson } from '../utils/export';

interface ExportToolbarProps {
  results: StockMetrics[];
}

export function ExportToolbar({ results }: ExportToolbarProps) {
  return (
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
  );
}