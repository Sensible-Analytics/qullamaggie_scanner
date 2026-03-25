import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useScannerStore } from './store/scannerStore';
import ScannerControls from './components/ScannerControls';
import ResultsTable from './components/ResultsTable';
import DetailPanel from './components/DetailPanel';
import { ErrorBoundary } from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      retry: 2,
    },
  },
});

function AppContent() {
  const { selectedSymbol, results } = useScannerStore();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Qullamaggie Momentum Scanner
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Professional-grade stock analysis based on Kristjan Qullamaggie methodology
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {results.length} stocks found
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 xl:col-span-3">
            <ScannerControls />
          </div>
          
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <ResultsTable />
            {selectedSymbol && <DetailPanel />}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p>
              Built by <span className="font-medium text-gray-700">Sensible Analytics</span>
            </p>
            <p className="mt-2 sm:mt-0">
              Data for educational purposes only • Not financial advice
            </p>
          </div>
        </div>
      </footer>
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
