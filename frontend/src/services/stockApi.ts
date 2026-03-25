import type { OHLCV } from '../utils/calculations';
import { stockCache } from './database';

// API Configuration
const TWELVE_DATA_API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY || 'demo';
const EODHD_API_KEY = import.meta.env.VITE_EODHD_API_KEY || 'demo';
const MAX_RETRIES = 2;
const INITIAL_RETRY_DELAY = 500;

// Data source tracking
export type DataSource = 'yahoo' | 'eodhd' | 'twelvedata' | 'mock' | 'cache';
export let lastDataSource: DataSource = 'mock';
export const isDemoMode = TWELVE_DATA_API_KEY === 'demo';

// CORS Proxies for Yahoo Finance (rotate if one fails)
const CORS_PROXIES = [
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
  'https://cors-anywhere.herokuapp.com/',
];

// Track proxy index for rotation
let proxyIndex = 0;

export interface StockUniverse {
  name: string;
  symbols: string[];
}

interface TwelveDataItem {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
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

// Yahoo Finance v8 API - via CORS proxy
async function fetchFromYahoo(symbol: string, range: string = '1y'): Promise<OHLCV[] | null> {
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=${range}`;
  
  // Try each CORS proxy
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    const proxyUrl = `${CORS_PROXIES[proxyIndex]}${encodeURIComponent(yahooUrl)}`;
    proxyIndex = (proxyIndex + 1) % CORS_PROXIES.length;
    
    try {
      console.log(`[Yahoo] Fetching ${symbol} via proxy ${i + 1}...`);
      const response = await fetchWithRetry(proxyUrl, 1);
      
      if (!response) continue;
      
      const data = await response.json();
      
      if (!data.chart?.result?.[0]) {
        console.warn(`[Yahoo] No data for ${symbol}`);
        continue;
      }
      
      const result = data.chart.result[0];
      const timestamps: number[] = result.timestamp || [];
      const quote = result.indicators?.quote?.[0] as { open: (number | null)[]; high: (number | null)[]; low: (number | null)[]; close: (number | null)[]; volume: (number | null)[] } | undefined;
      
      if (!quote || !timestamps.length) continue;
      
      const ohlcv: OHLCV[] = [];
      
      for (let j = 0; j < timestamps.length; j++) {
        const date = new Date(timestamps[j] * 1000);
        const open = quote.open?.[j];
        const high = quote.high?.[j];
        const low = quote.low?.[j];
        const close = quote.close?.[j];
        const volume = quote.volume?.[j];
        
        // Skip invalid data points
        if (open == null || high == null || low == null || close == null) continue;
        
        ohlcv.push({
          date: date.toISOString().split('T')[0],
          open,
          high,
          low,
          close,
          volume: volume ?? 0,
        });
      }
      
      if (ohlcv.length >= 50) {
        console.log(`[Yahoo] ✓ Got ${ohlcv.length} bars for ${symbol}`);
        lastDataSource = 'yahoo';
        return ohlcv;
      }
      
    } catch (error) {
      console.warn(`[Yahoo] Proxy ${i + 1} failed:`, error);
    }
  }
  
  console.warn(`[Yahoo] All proxies failed for ${symbol}`);
  return null;
}

// EODHD API - Free tier with demo key
async function fetchFromEODHD(symbol: string): Promise<OHLCV[] | null> {
  // EODHD uses format: SYMBOL.US for US stocks
  const eodSymbol = symbol.includes('.') ? symbol : `${symbol}.US`;
  const url = `https://eodhd.com/api/eod/${eodSymbol}?api_token=${EODHD_API_KEY}&fmt=json&period=d`;
  
  try {
    console.log(`[EODHD] Fetching ${symbol}...`);
    const response = await fetchWithRetry(url);
    
    if (!response) return null;
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`[EODHD] No data for ${symbol}`);
      return null;
    }
    
    interface EODHDItem {
      date: string;
      open: string;
      high: string;
      low: string;
      close: string;
      adjusted_close?: string;
      volume: string;
    }
    
    const ohlcv: OHLCV[] = (data as EODHDItem[]).slice(-252).map((item) => ({
      date: item.date,
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close || item.adjusted_close || '0'),
      volume: parseInt(item.volume) || 0,
    }));
    
    if (ohlcv.length >= 50) {
      console.log(`[EODHD] ✓ Got ${ohlcv.length} bars for ${symbol}`);
      lastDataSource = 'eodhd';
      return ohlcv;
    }
    
  } catch (error) {
    console.warn(`[EODHD] Error for ${symbol}:`, error);
  }
  
  return null;
}

// Twelve Data API
async function fetchFromTwelveData(symbol: string): Promise<OHLCV[] | null> {
  if (TWELVE_DATA_API_KEY === 'demo') return null;
  
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=252&apikey=${TWELVE_DATA_API_KEY}`;
  
  try {
    console.log(`[TwelveData] Fetching ${symbol}...`);
    const response = await fetchWithRetry(url);
    
    if (!response) return null;
    
    const data = await response.json();
    
    if (data.status === 'error' || !data.values) {
      console.warn(`[TwelveData] Error for ${symbol}:`, data.message);
      return null;
    }
    
    const values = data.values as TwelveDataItem[];
    const ohlcv: OHLCV[] = values.map((item) => ({
      date: item.datetime,
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseInt(item.volume) || 0,
    })).reverse();
    
    if (ohlcv.length >= 50) {
      console.log(`[TwelveData] ✓ Got ${ohlcv.length} bars for ${symbol}`);
      lastDataSource = 'twelvedata';
      return ohlcv;
    }
    
  } catch (error) {
    console.warn(`[TwelveData] Error for ${symbol}:`, error);
  }
  
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
  _interval?: string,
  forceRefresh: boolean = false
): Promise<OHLCV[] | null> {
  // Note: interval parameter reserved for future use (currently always daily)
  try {
    // Check cache first (unless forcing refresh)
    if (!forceRefresh) {
      const cached = await stockCache.getCachedData(symbol);
      if (cached) {
        console.log(`[Cache] Hit for ${symbol}`);
        lastDataSource = 'cache';
        return cached.data as OHLCV[];
      }
    }

    // Multi-provider fallback strategy
    // 1. Yahoo Finance (via CORS proxy) - Best free option, no API key needed
    // 2. EODHD - Free tier with demo key
    // 3. Twelve Data - If user has API key
    // 4. Mock data - Always works as last resort
    
    let data: OHLCV[] | null = null;

    // Try Yahoo Finance first (works without API key)
    console.log(`[Fetch] Trying Yahoo Finance for ${symbol}...`);
    data = await fetchFromYahoo(symbol);
    
    if (!data) {
      // Try EODHD
      console.log(`[Fetch] Yahoo failed, trying EODHD for ${symbol}...`);
      data = await fetchFromEODHD(symbol);
    }
    
    if (!data && TWELVE_DATA_API_KEY !== 'demo') {
      // Try Twelve Data only if user has real API key
      console.log(`[Fetch] EODHD failed, trying Twelve Data for ${symbol}...`);
      data = await fetchFromTwelveData(symbol);
    }

    // Final fallback: mock data
    if (!data) {
      console.log(`[Fetch] All APIs failed, using mock data for ${symbol}`);
      data = generateMockData(symbol);
      lastDataSource = 'mock';
    }
    
    // Cache the data
    await stockCache.setCachedData(symbol, data);
    console.log(`[Fetch] ✓ ${symbol}: ${data.length} bars from ${lastDataSource}`);
    
    return data;
    
  } catch (error) {
    console.error(`[Fetch] Error for ${symbol}:`, error);
    // Always return mock data on error
    const mockData = generateMockData(symbol);
    lastDataSource = 'mock';
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