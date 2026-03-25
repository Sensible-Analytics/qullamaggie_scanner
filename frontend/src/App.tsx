import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useScannerStore } from './store/scannerStore';
import ScannerControls from './components/ScannerControls';
import ResultsTable from './components/ResultsTable';
import DetailPanel from './components/DetailPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { isDemoMode } from './services/stockApi';

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
  const { selectedSymbol, results, isLoading, error } = useScannerStore();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mode Banner */}
      <div className={`py-2 px-4 text-center text-sm ${isDemoMode ? 'bg-yellow-500 text-yellow-900' : 'bg-green-600 text-white'}`}>
        {isDemoMode ? (
          <>
            <span className="font-medium">Demo Mode:</span> Using simulated market data. 
            <a href="https://twelvedata.com/pricing" target="_blank" rel="noopener" className="underline ml-1">
              Get free API key
            </a> for live data.
          </>
        ) : (
          <>
            <span className="font-medium">Live Mode:</span> Connected to Twelve Data API for real-time market data.
          </>
        )}
      </div>
      
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
            <div className="text-right flex flex-col items-end gap-1">
              {isLoading ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <svg className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning...
                </span>
              ) : error ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Error occurred
                </span>
              ) : results.length > 0 ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {results.length} stocks found
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  Ready to scan
                </span>
              )}
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
