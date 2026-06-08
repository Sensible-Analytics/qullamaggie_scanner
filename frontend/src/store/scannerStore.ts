import { create } from 'zustand';
import type { StockMetrics, ScanConfig } from '../utils/calculations';
import { STOCK_UNIVERSES, getAllUniverses, type StockUniverse } from '../services/stockApi';

interface FilteredStock {
  symbol: string;
  reason: string;
}

interface ScannerState {
  // Data
  universe: string[];
  results: StockMetrics[];
  filteredStocks: FilteredStock[];
  selectedSymbol: string | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  progress: { current: number; total: number; symbol: string } | null;
  filters: ScanConfig;
  selectedUniverse: string;
  availableUniverses: StockUniverse[];
  
  // Actions
  setUniverse: (universe: string[]) => void;
  setResults: (results: StockMetrics[]) => void;
  setFilteredStocks: (filteredStocks: FilteredStock[]) => void;
  setSelectedSymbol: (symbol: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setProgress: (progress: { current: number; total: number; symbol: string } | null) => void;
  updateFilters: (filters: Partial<ScanConfig>) => void;
  setSelectedUniverse: (universeName: string) => void;
  loadUniverses: () => Promise<void>;
  resetScan: () => void;
}

const DEFAULT_FILTERS: ScanConfig = {
  minPrice: 5.0,
  minVolumeDollars: 20000000,
  minADR: 5.0,
  minScore: 5,
  lookbackDays: 100,
};

export const useScannerStore = create<ScannerState>((set) => ({
  // Initial state
  universe: STOCK_UNIVERSES[2].symbols,
  results: [],
  filteredStocks: [],
  selectedSymbol: null,
  isLoading: false,
  error: null,
  progress: null,
  filters: DEFAULT_FILTERS,
  selectedUniverse: 'Tech Giants',
  availableUniverses: STOCK_UNIVERSES,
  
  // Actions
  setUniverse: (universe) => set({ universe }),
  
  setResults: (results) => set({ results, error: null }),
  
  setFilteredStocks: (filteredStocks) => set({ filteredStocks }),
  
  setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error, isLoading: false }),
  
  setProgress: (progress) => set({ progress }),
  
  updateFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),
  
  setSelectedUniverse: (universeName) => {
    const universe = STOCK_UNIVERSES.find(u => u.name === universeName);
    if (universe) {
      set({ 
        selectedUniverse: universeName,
        universe: universe.symbols,
        results: [],
        selectedSymbol: null,
        error: null,
      });
    }
  },
  
  loadUniverses: async () => {
    const universes = await getAllUniverses();
    set({ availableUniverses: universes });
  },
  
  resetScan: () => set({
    results: [],
    filteredStocks: [],
    selectedSymbol: null,
    progress: null,
    isLoading: false,
    error: null,
  }),
}));