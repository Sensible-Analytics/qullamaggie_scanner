import type { StockMetrics } from './calculations';

export function exportToCSV(results: StockMetrics[], filename: string = 'scan_results'): void {
  if (results.length === 0) return;

  const headers = [
    'Symbol',
    'Price',
    'Score',
    'ADR%',
    'RS%',
    'Suggested Stop',
    'R:R Ratio',
    'Signals',
    'Date'
  ];

  const rows = results.map(stock => [
    stock.symbol,
    stock.price.toFixed(2),
    stock.score.toString(),
    stock.adr.toFixed(2),
    stock.rs_pct.toFixed(0),
    stock.suggested_stop.toFixed(2),
    stock.rr_ratio.toFixed(2),
    stock.signals.join(' | '),
    stock.date
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
}

export function exportToWatchlist(results: StockMetrics[], filename: string = 'qullamaggie_watchlist'): void {
  if (results.length === 0) return;

  const watchlistContent = results.map(stock => stock.symbol).join('\n');
  downloadFile(watchlistContent, `${filename}.txt`, 'text/plain');
}

export function exportToJson(results: StockMetrics[], filename: string = 'scan_results'): void {
  if (results.length === 0) return;

  const jsonContent = JSON.stringify(results, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
