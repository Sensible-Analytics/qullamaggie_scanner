// IndexedDB database service using Dexie.js
// Caches historical stock data with 24-hour TTL

import Dexie, { type Table } from 'dexie';

export interface CachedStockData {
  symbol: string;
  data: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
  timestamp: number;
  expiresAt: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  totalCached: number;
}

class StockCacheDB extends Dexie {
  stockData!: Table<CachedStockData, string>;
  private stats: CacheStats = { hits: 0, misses: 0, totalCached: 0 };

  constructor() {
    super('QullamaggieScannerCache');
    
    this.version(1).stores({
      stockData: 'symbol, timestamp, expiresAt'
    });
  }

  async getCachedData(symbol: string): Promise<CachedStockData | null> {
    try {
      const cached = await this.stockData.get(symbol);
      
      if (!cached) {
        this.stats.misses++;
        console.log(`[Cache] MISS: ${symbol} - No cached data`);
        return null;
      }

      const now = Date.now();
      if (now > cached.expiresAt) {
        this.stats.misses++;
        console.log(`[Cache] MISS: ${symbol} - Expired (${new Date(cached.expiresAt).toISOString()})`);
        await this.stockData.delete(symbol);
        return null;
      }

      this.stats.hits++;
      console.log(`[Cache] HIT: ${symbol} - Age: ${Math.round((now - cached.timestamp) / 1000 / 60)} min`);
      return cached;
    } catch (error) {
      console.error(`[Cache] Error reading cache for ${symbol}:`, error);
      return null;
    }
  }

  async setCachedData(symbol: string, data: CachedStockData['data']): Promise<void> {
    try {
      const now = Date.now();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      
      const cachedEntry: CachedStockData = {
        symbol,
        data,
        timestamp: now,
        expiresAt: now + oneWeek
      };

      await this.stockData.put(cachedEntry);
      this.stats.totalCached++;
      console.log(`[Cache] STORED: ${symbol} - ${data.length} bars, expires: ${new Date(cachedEntry.expiresAt).toISOString()}`);
    } catch (error) {
      console.error(`[Cache] Error storing cache for ${symbol}:`, error);
    }
  }

  async invalidateSymbol(symbol: string): Promise<void> {
    try {
      await this.stockData.delete(symbol);
      console.log(`[Cache] INVALIDATED: ${symbol}`);
    } catch (error) {
      console.error(`[Cache] Error invalidating ${symbol}:`, error);
    }
  }

  async clearExpired(): Promise<number> {
    try {
      const now = Date.now();
      const expired = await this.stockData
        .where('expiresAt')
        .below(now)
        .toArray();
      
      await this.stockData.bulkDelete(expired.map(item => item.symbol));
      console.log(`[Cache] CLEARED: ${expired.length} expired entries`);
      return expired.length;
    } catch (error) {
      console.error('[Cache] Error clearing expired:', error);
      return 0;
    }
  }

  async clearAll(): Promise<void> {
    try {
      await this.stockData.clear();
      console.log('[Cache] CLEARED: All cached data');
    } catch (error) {
      console.error('[Cache] Error clearing all:', error);
    }
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  resetStats(): void {
    this.stats = { hits: 0, misses: 0, totalCached: this.stats.totalCached };
  }
}

// Singleton instance
export const stockCache = new StockCacheDB();
