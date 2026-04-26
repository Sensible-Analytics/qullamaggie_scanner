// Tests for calculations.ts - Qullamaggie 20-point scoring system

import { describe, it, expect } from 'vitest';
import {
  calculateSMA,
  calculateEMA,
  calculateMetrics,
  filterAndSortResults,
  type OHLCV,
  type ScanConfig,
  type StockMetrics,
} from '../utils/calculations';

function generateMockOHLCV(days: number, options?: { basePrice?: number; volatility?: number; trend?: number }): OHLCV[] {
  const { basePrice = 100, volatility = 0.02, trend = 0.0005 } = options || {};
  const data: OHLCV[] = [];
  let price = basePrice;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const change = (Math.random() - 0.5) * 2 * volatility + trend;
    const open = price;
    const close = open * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * volatility);
    const low = Math.min(open, close) * (1 - Math.random() * volatility);
    const volume = 5000000 + Math.random() * 10000000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume,
    });
    
    price = close;
  }
  
  return data;
}

describe('calculateSMA', () => {
  it('should calculate simple moving average correctly', () => {
    const data = [10, 20, 30, 40, 50];
    expect(calculateSMA(data, 5)).toBe(30);
    expect(calculateSMA(data, 3)).toBe(40);
  });

  it('should return 0 for insufficient data', () => {
    expect(calculateSMA([10, 20], 5)).toBe(0);
    expect(calculateSMA([], 5)).toBe(0);
  });
});

describe('calculateEMA', () => {
  it('should calculate exponential moving average', () => {
    const data = [10, 12, 14, 16, 18];
    const ema10 = calculateEMA(data, 10);
    
    expect(ema10.length).toBe(data.length);
    expect(ema10[0]).toBe(10); // First value equals first input
  });

  it('should return array of same length as input', () => {
    const data = [100, 105, 110, 115, 120];
    const ema = calculateEMA(data, 20);
    expect(ema.length).toBe(data.length);
  });
});

describe('calculateMetrics', () => {
  const defaultConfig: ScanConfig = {
    minPrice: 5,
    minVolumeDollars: 10000000,
    minADR: 3,
    minScore: 5,
    lookbackDays: 100,
  };

  it('should return null for insufficient data', () => {
    const data = generateMockOHLCV(30);
    const result = calculateMetrics(data, 'TEST', defaultConfig);
    expect(result.metrics).toBeNull();
    expect(result.reason).toBe('insufficient_data');
  });

  it('should return null when price below minimum', () => {
    const data = generateMockOHLCV(100, { basePrice: 3 });
    const result = calculateMetrics(data, 'TEST', defaultConfig);
    expect(result.metrics).toBeNull();
    expect(result.reason).toBe('price');
  });

  it('should return null when volume below minimum', () => {
    const data = generateMockOHLCV(100, { basePrice: 50, volatility: 0.01 });
    // Override volume to be very low
    data.forEach(d => d.volume = 100000);
    const result = calculateMetrics(data, 'TEST', defaultConfig);
    expect(result.metrics).toBeNull();
  });

  it('should return null when ADR below minimum', () => {
    const data = generateMockOHLCV(100, { basePrice: 50, volatility: 0.005 });
    const result = calculateMetrics(data, 'TEST', defaultConfig);
    expect(result.metrics).toBeNull();
    expect(result.reason).toBe('adr');
  });

  it('should calculate metrics for valid data', () => {
    // Generate data with high ADR to pass filters
    const data = generateMockOHLCV(252, { basePrice: 50, volatility: 0.04 });
    const result = calculateMetrics(data, 'NVDA', defaultConfig);
    
    expect(result.metrics).not.toBeNull();
    expect(result.reason).toBeNull();
    
    if (result.metrics) {
      expect(result.metrics.symbol).toBe('NVDA');
      expect(typeof result.metrics.score).toBe('number');
      expect(result.metrics.score).toBeGreaterThanOrEqual(0);
      expect(result.metrics.score).toBeLessThanOrEqual(20);
      expect(typeof result.metrics.adr).toBe('number');
      expect(typeof result.metrics.rs_pct).toBe('number');
      expect(typeof result.metrics.vol_ma).toBe('number');
      expect(Array.isArray(result.metrics.signals)).toBe(true);
    }
  });

  it('should track all scoring signals', () => {
    const data = generateMockOHLCV(252, { basePrice: 50, volatility: 0.04, trend: 0.002 });
    const result = calculateMetrics(data, 'TEST', defaultConfig);
    
    if (result.metrics) {
      expect(result.metrics.signals.length).toBeGreaterThan(0);
      // ADR signal always present
      expect(result.metrics.signals[0]).toMatch(/^ADR/);
      // RS signal always present
      expect(result.metrics.signals.some(s => s.startsWith('RS'))).toBe(true);
      // EMA signal always present
      expect(result.metrics.signals.some(s => s.startsWith('EMA'))).toBe(true);
    }
  });
});

describe('filterAndSortResults', () => {
  it('should filter by minimum score', () => {
    const results: StockMetrics[] = [
      { symbol: 'A', score: 3, price: 100, adr: 5, rs_pct: 50, vol_ma: 1000000, rr_ratio: 2, suggested_stop: 90, signals: [], date: '2024-01-01', lineage: {}, raw_data: { dates: [], open: [], high: [], low: [], close: [], ema10: [], ema20: [], ema50: [], volume: [] } },
      { symbol: 'B', score: 7, price: 100, adr: 5, rs_pct: 50, vol_ma: 1000000, rr_ratio: 2, suggested_stop: 90, signals: [], date: '2024-01-01', lineage: {}, raw_data: { dates: [], open: [], high: [], low: [], close: [], ema10: [], ema20: [], ema50: [], volume: [] } },
      { symbol: 'C', score: 5, price: 100, adr: 5, rs_pct: 50, vol_ma: 1000000, rr_ratio: 2, suggested_stop: 90, signals: [], date: '2024-01-01', lineage: {}, raw_data: { dates: [], open: [], high: [], low: [], close: [], ema10: [], ema20: [], ema50: [], volume: [] } },
    ];
    
    const filtered = filterAndSortResults(results, 5);
    expect(filtered.length).toBe(2);
    expect(filtered.map(r => r.symbol)).toEqual(['B', 'C']);
  });

  it('should sort by score descending, then by ADR descending', () => {
    const results: StockMetrics[] = [
      { symbol: 'A', score: 5, price: 100, adr: 3, rs_pct: 50, vol_ma: 1000000, rr_ratio: 2, suggested_stop: 90, signals: [], date: '2024-01-01', lineage: {}, raw_data: { dates: [], open: [], high: [], low: [], close: [], ema10: [], ema20: [], ema50: [], volume: [] } },
      { symbol: 'B', score: 10, price: 100, adr: 5, rs_pct: 50, vol_ma: 1000000, rr_ratio: 2, suggested_stop: 90, signals: [], date: '2024-01-01', lineage: {}, raw_data: { dates: [], open: [], high: [], low: [], close: [], ema10: [], ema20: [], ema50: [], volume: [] } },
      { symbol: 'C', score: 10, price: 100, adr: 8, rs_pct: 50, vol_ma: 1000000, rr_ratio: 2, suggested_stop: 90, signals: [], date: '2024-01-01', lineage: {}, raw_data: { dates: [], open: [], high: [], low: [], close: [], ema10: [], ema20: [], ema50: [], volume: [] } },
    ];
    
    const sorted = filterAndSortResults(results, 0);
    expect(sorted.map(r => r.symbol)).toEqual(['C', 'B', 'A']);
  });
});