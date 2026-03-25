import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useScannerStore } from './store/scannerStore';
import ScannerControls from './components/ScannerControls';
import ResultsTable from './components/ResultsTable';
import DetailPanel from './components/DetailPanel';
import { ErrorBoundary } from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      gcTime: 7 * 24 * 60 * 60 * 1000,
      retry: 2,
    },
  },
});

function AppContent() {
  const { selectedSymbol, results, isLoading } = useScannerStore();
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <header className="border-b" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="font-mono text-lg font-bold" style={{ color: 'var(--accent-green)' }}>
                <span className="opacity-50">$</span> qullamaggie
              </div>
              <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: 'var(--accent-green)', color: 'var(--bg-primary)' }}>
                SCANNER
              </span>
            </div>
            <div className="flex items-center gap-4">
              {isLoading ? (
                <span className="flex items-center gap-2 text-sm font-mono" style={{ color: 'var(--accent-amber)' }}>
                  <span className="animate-pulse">●</span> scanning...
                </span>
              ) : results.length > 0 ? (
                <span className="text-sm font-mono" style={{ color: 'var(--accent-green)' }}>
                  {results.length} signals found
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <ScannerControls />
          </div>
          
          <div className="lg:col-span-9 space-y-6">
            {selectedSymbol ? <DetailPanel /> : <HeroSection />}
            <ResultsTable />
          </div>
        </div>
      </main>

      <footer className="border-t mt-auto" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-mono">
              <span style={{ color: 'var(--text-muted)' }}>Built by</span>
              <a href="https://sensibleanalytics.co" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{ color: 'var(--accent-green)' }}>
                Sensible Analytics
              </a>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              <span>Data Sources:</span>
              <span className="flex items-center gap-1">
                <span style={{ color: 'var(--accent-green)' }}>●</span>
                Yahoo Finance
              </span>
              <span className="flex items-center gap-1">
                <span className="opacity-50">○</span>
                EODHD
              </span>
              <span className="flex items-center gap-1">
                <span className="opacity-50">○</span>
                Twelve Data
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="rounded-lg border p-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-sm" style={{ color: 'var(--accent-green)' }}>
              const scanner = new Qullamaggie()
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            Professional-grade momentum stock scanner based on Kristjan Qullamaggie's proven swing trading methodology. 
            Scans US equities in real-time using a 20-point scoring system to identify explosive breakout setups.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
              20-point scoring
            </span>
            <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
              EMA alignment
            </span>
            <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
              RS momentum
            </span>
            <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
              volume surge
            </span>
          </div>
        </div>
        <div className="hidden lg:block w-48 h-32 rounded flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <div className="text-center">
            <div className="font-mono text-2xl font-bold" style={{ color: 'var(--accent-green)' }}>20</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>point system</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
