import type { OHLCV } from '../utils/calculations';
import { stockCache } from './database';

// API Configuration
// For production: Set VITE_TWELVE_DATA_API_KEY in .env file
// Get free API key at: https://twelvedata.com/pricing
const TWELVE_DATA_API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY || 'demo';
const BASE_URL = 'https://api.twelvedata.com';
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

// Check if running in demo mode
export const isDemoMode = TWELVE_DATA_API_KEY === 'demo';

export interface StockUniverse {
  name: string;
  symbols: string[];
}

interface TwelveDataResponse {
  status: string;
  message?: string;
  values?: Array<{
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }>;
}

async function fetchWithRetry(url: string, retries: number = MAX_RETRIES): Promise<Response | null> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      
      if (response.status === 429) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
        console.log(`[API] Rate limited, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error as Error;
      if (attempt < retries - 1) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
        console.log(`[API] Fetch failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error(`[API] Failed after ${retries} retries:`, lastError);
  return null;
}

export const STOCK_UNIVERSES: StockUniverse[] = [
  {
    name: 'S&P 500 Leaders',
    symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'BRK.B', 'UNH', 'XOM', 'JPM', 'V', 'PG', 'MA', 'HD', 'CVX', 'MRK', 'ABBV', 'LLY', 'PEP'],
  },
  {
    name: 'NASDAQ 100 Growth',
    symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'GOOG', 'PYPL', 'NFLX', 'AMD', 'INTC', 'CSCO', 'ADBE', 'CMCSA', 'AVGO', 'TXN', 'QCOM', 'COST', 'TMUS'],
  },
  {
    name: 'High Momentum Stocks',
    symbols: ['NVDA', 'TSLA', 'AMD', 'PLTR', 'SMCI', 'MARA', 'COIN', 'SOFI', 'RIVN', 'LCID', 'SNOW', 'CRWD', 'PANW', 'NET', 'DDOG', 'MDB', 'ZS', 'OKTA', 'CRWD', 'FTNT'],
  },
  {
    name: 'Tech & Semiconductors',
    symbols: ['NVDA', 'AMD', 'INTC', 'TSM', 'AVGO', 'QCOM', 'TXN', 'MU', 'AMAT', 'LRCX', 'KLAC', 'MRVL', 'ON', 'ARM', 'SNPS', 'CDNS', 'ADI', 'MCHP', 'TER', 'entegris'],
  },
  {
    name: 'Full Demo (50 stocks)',
    symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'AMD', 'NFLX', 'CRM', 'AVGO', 'ORCL', 'ADBE', 'INTC', 'CSCO', 'PYPL', 'CMCSA', 'PEP', 'COST', 'TMUS', 'QCOM', 'TXN', 'MU', 'AMAT', 'LRCX', 'SNOW', 'CRWD', 'PANW', 'NET', 'DDOG', 'MDB', 'ZS', 'OKTA', 'PLTR', 'SMCI', 'MARA', 'COIN', 'SOFI', 'RIVN', 'LCID', 'SQ', 'SHOP', 'UBER', 'ABNB', 'DASH', 'HOOD', 'DKNG', 'RBLX', 'U', 'PATH'],
  },
];

export async function fetchHistoricalData(
  symbol: string,
  interval: string = '1day',
  forceRefresh: boolean = false
): Promise<OHLCV[] | null> {
  try {
    // Check cache first (unless forcing refresh)
    if (!forceRefresh) {
      const cached = await stockCache.getCachedData(symbol);
      if (cached) {
        console.log(`[Cache] Hit for ${symbol}`);
        return cached.data as OHLCV[];
      }
    }

    // Demo mode: use mock data
    if (isDemoMode) {
      console.log(`[Demo] Generating mock data for ${symbol}`);
      const mockData = generateMockData(symbol);
      await stockCache.setCachedData(symbol, mockData);
      return mockData;
    }

    // Live mode: fetch from Twelve Data API
    console.log(`[API] Fetching ${symbol} from Twelve Data...`);
    const response = await fetchWithRetry(
      `${BASE_URL}/time_series?symbol=${symbol}&interval=${interval}&outputsize=500&apikey=${TWELVE_DATA_API_KEY}`
    );
    
    if (!response) {
      console.error(`[API] Failed to fetch ${symbol} after retries, using mock data`);
      // Fallback to mock data if API fails
      const mockData = generateMockData(symbol);
      await stockCache.setCachedData(symbol, mockData);
      return mockData;
    }
    
    const data: TwelveDataResponse = await response.json();
    
    if (data.status === 'error') {
      console.error(`[API] Error for ${symbol}:`, data.message);
      // Fallback to mock data
      const mockData = generateMockData(symbol);
      await stockCache.setCachedData(symbol, mockData);
      return mockData;
    }
    
    if (!data.values || data.values.length === 0) {
      console.error(`[API] No data for ${symbol}`);
      return null;
    }
    
    const ohlcvData = data.values.map((item) => ({
      date: item.datetime,
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseInt(item.volume) || 0,
    })).reverse(); // Reverse to get chronological order
    
    // Cache the fetched data
    await stockCache.setCachedData(symbol, ohlcvData);
    console.log(`[API] Successfully fetched ${ohlcvData.length} bars for ${symbol}`);
    
    return ohlcvData;
    
  } catch (error) {
    console.error(`[API] Error fetching ${symbol}:`, error);
    // Fallback to mock data on any error
    const mockData = generateMockData(symbol);
    await stockCache.setCachedData(symbol, mockData);
    return mockData;
  }
}

export async function fetchBatchHistoricalData(
  symbols: string[],
  onProgress?: (current: number, total: number, symbol: string) => void
): Promise<Map<string, OHLCV[]>> {
  const results = new Map<string, OHLCV[]>();
  
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    onProgress?.(i + 1, symbols.length, symbol);
    
    const data = await fetchHistoricalData(symbol);
    if (data) {
      results.set(symbol, data);
    }
    
    // Rate limiting: wait 100ms between requests
    if (TWELVE_DATA_API_KEY !== 'demo' && i < symbols.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}

function generateMockData(symbol: string): OHLCV[] {
  const data: OHLCV[] = [];
  const today = new Date();
  
  // Different base prices and volatilities per symbol type
  const symbolProfiles: Record<string, { base: number; vol: number; trend: number }> = {
    'NVDA': { base: 800, vol: 0.04, trend: 0.002 },
    'TSLA': { base: 250, vol: 0.045, trend: 0.0015 },
    'AMD': { base: 150, vol: 0.035, trend: 0.001 },
    'SMCI': { base: 400, vol: 0.05, trend: 0.002 },
    'PLTR': { base: 25, vol: 0.04, trend: 0.001 },
    'MARA': { base: 20, vol: 0.06, trend: 0.001 },
    'COIN': { base: 180, vol: 0.045, trend: 0.001 },
    'AAPL': { base: 180, vol: 0.02, trend: 0.0005 },
    'MSFT': { base: 420, vol: 0.02, trend: 0.0005 },
  };
  
  const profile = symbolProfiles[symbol] || { base: 100 + Math.random() * 200, vol: 0.025, trend: 0.0003 };
  let basePrice = profile.base;
  const volatility = profile.vol;
  const trendFactor = profile.trend;
  
  // Generate 252 trading days of data
  for (let i = 252; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    // Add upward trend over time
    const trendBias = trendFactor * (252 - i) / 252;
    const change = (Math.random() - 0.45) * 2 * volatility + trendBias; // Slight upward bias
    
    const open = basePrice;
    const close = open * (1 + change);
    
    // Higher intraday range for better ADR (3-8% typical range)
    const intradayRangePercent = volatility * (1.5 + Math.random() * 1.5);
    const high = Math.max(open, close) * (1 + intradayRangePercent);
    const low = Math.min(open, close) * (1 - intradayRangePercent * 0.5);
    
    // Variable volume with occasional spikes
    const baseVolume = 5000000 + Math.random() * 15000000;
    const volumeSpike = Math.random() > 0.9 ? 2 + Math.random() * 2 : 1;
    const volume = Math.floor(baseVolume * volumeSpike);
    
    data.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume,
    });
    
    basePrice = close;
  }
  
  return data;
}

export function validateOHLCV(data: OHLCV[]): boolean {
  if (!data || data.length < 50) return false;
  
  for (const bar of data) {
    if (!bar.date || isNaN(bar.open) || isNaN(bar.high) || 
        isNaN(bar.low) || isNaN(bar.close) || isNaN(bar.volume)) {
      return false;
    }
    if (bar.high < bar.low || bar.close < 0 || bar.volume < 0) {
      return false;
    }
  }
  
  return true;
}

export function getDataStats(data: OHLCV[]): {
  minDate: string;
  maxDate: string;
  totalDays: number;
  avgVolume: number;
} {
  if (!data.length) {
    return { minDate: '', maxDate: '', totalDays: 0, avgVolume: 0 };
  }
  
  const volumes = data.map(d => d.volume);
  const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
  
  return {
    minDate: data[0].date,
    maxDate: data[data.length - 1].date,
    totalDays: data.length,
    avgVolume,
  };
}