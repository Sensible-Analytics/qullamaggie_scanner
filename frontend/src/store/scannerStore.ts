import { create } from 'zustand';
import type { StockMetrics, ScanConfig } from '../utils/calculations';
import { STOCK_UNIVERSES } from '../services/stockApi';

interface ScannerState {
  // Data
  universe: string[];
  results: StockMetrics[];
  selectedSymbol: string | null;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  progress: { current: number; total: number; symbol: string } | null;
  filters: ScanConfig;
  selectedUniverse: string;
  
  // Actions
  setUniverse: (universe: string[]) => void;
  setResults: (results: StockMetrics[]) => void;
  setSelectedSymbol: (symbol: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setProgress: (progress: { current: number; total: number; symbol: string } | null) => void;
  updateFilters: (filters: Partial<ScanConfig>) => void;
  setSelectedUniverse: (universeName: string) => void;
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
  universe: STOCK_UNIVERSES[2].symbols, // Demo universe
  results: [],
  selectedSymbol: null,
  isLoading: false,
  error: null,
  progress: null,
  filters: DEFAULT_FILTERS,
  selectedUniverse: 'Demo Universe',
  
  // Actions
  setUniverse: (universe) => set({ universe }),
  
  setResults: (results) => set({ results, error: null }),
  
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
  
  resetScan: () => set({
    results: [],
    selectedSymbol: null,
    progress: null,
    isLoading: false,
    error: null,
  }),
}));