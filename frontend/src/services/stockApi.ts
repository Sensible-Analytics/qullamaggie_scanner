import type { OHLCV } from '../utils/calculations';
import { stockCache } from './database';

const TWELVE_DATA_API_KEY = 'demo'; // Replace with actual key
const BASE_URL = 'https://api.twelvedata.com';
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

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
    name: 'S&P 500 (Sample)',
    symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'BRK.B', 'UNH', 'XOM'],
  },
  {
    name: 'NASDAQ 100 (Sample)',
    symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'GOOG', 'PYPL', 'NFLX'],
  },
  {
    name: 'Demo Universe',
    symbols: ['AAPL', 'NVDA', 'TSLA', 'AMD', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX', 'CRM', 'AVGO', 'ORCL'],
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
        return cached.data as OHLCV[];
      }
    }

    // For demo, use mock data
    if (TWELVE_DATA_API_KEY === 'demo') {
      const mockData = generateMockData(symbol);
      await stockCache.setCachedData(symbol, mockData);
      return mockData;
    }

    const response = await fetchWithRetry(
      `${BASE_URL}/time_series?symbol=${symbol}&interval=${interval}&outputsize=500&apikey=${TWELVE_DATA_API_KEY}`
    );
    
    if (!response) {
      console.error(`Failed to fetch data for ${symbol} after retries`);
      return null;
    }
    
    const data: TwelveDataResponse = await response.json();
    
    if (data.status === 'error') {
      console.error(`API error for ${symbol}:`, data.message);
      return null;
    }
    
    if (!data.values) {
      console.error(`No data values for ${symbol}`);
      return null;
    }
    
    const ohlcvData = data.values.map((item) => ({
      date: item.datetime,
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseInt(item.volume),
    })).reverse(); // Reverse to get chronological order
    
    // Cache the fetched data
    await stockCache.setCachedData(symbol, ohlcvData);
    
    return ohlcvData;
    
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
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
  let basePrice = 100 + Math.random() * 200;
  
  // Generate 252 trading days of data
  for (let i = 252; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const volatility = 0.02 + Math.random() * 0.03;
    const change = (Math.random() - 0.5) * 2 * volatility;
    
    const open = basePrice;
    const close = open * (1 + change);
    const intradayRange = Math.abs(close - open) * (0.5 + Math.random());
    const high = Math.max(open, close) + intradayRange;
    const low = Math.min(open, close) - intradayRange * 0.5;
    const volume = Math.floor(1000000 + Math.random() * 5000000);
    
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
  
  // Add some trending behavior for certain symbols
  if (['AAPL', 'NVDA', 'TSLA'].includes(symbol)) {
    // Make it trend upward more strongly
    for (let i = 0; i < data.length; i++) {
      const trend = 0.001 * (i / data.length);
      data[i].close *= (1 + trend);
      data[i].high *= (1 + trend);
      data[i].low *= (1 + trend);
      data[i].open *= (1 + trend);
    }
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