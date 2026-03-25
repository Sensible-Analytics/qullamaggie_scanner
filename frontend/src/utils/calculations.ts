// TypeScript port of Python ScannerEngine.calculate_metrics()
// Implements Qullamaggie 20-point scoring system

export interface OHLCV {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ScanConfig {
  minPrice: number;
  minVolumeDollars: number;
  minADR: number;
  minScore: number;
  lookbackDays: number;
}

export interface StockMetrics {
  symbol: string;
  price: number;
  score: number;
  adr: number;
  rs_pct: number;
  vol_ma: number;
  rr_ratio: number;
  suggested_stop: number;
  signals: string[];
  date: string;
  lineage: Record<string, string>;
  raw_data: {
    dates: string[];
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    ema10: number[];
    ema20: number[];
    ema50: number[];
    volume: number[];
  };
}

export function calculateSMA(data: number[], period: number): number {
  if (data.length < period) return 0;
  const slice = data.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / period;
}

export function calculateEMA(data: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const emaArray: number[] = [data[0]];
  
  for (let i = 1; i < data.length; i++) {
    emaArray.push(data[i] * k + emaArray[i - 1] * (1 - k));
  }
  
  return emaArray;
}

export function calculateMetrics(
  data: OHLCV[],
  symbol: string,
  config: ScanConfig
): { metrics: StockMetrics | null; reason: string | null } {
  try {
    if (data.length < 50) {
      return { metrics: null, reason: 'insufficient_data' };
    }

    const latest = data[data.length - 1];
    const currentPrice = latest.close;

    // --- HARD FILTERS ---
    if (currentPrice < config.minPrice) {
      return { metrics: null, reason: 'price' };
    }

    // Volume MA (20 day)
    const volumes = data.map(d => d.volume);
    const avgVolume = calculateSMA(volumes, 20);
    const dollarVolume = avgVolume * currentPrice;
    
    if (dollarVolume < config.minVolumeDollars) {
      return { metrics: null, reason: 'volume' };
    }

    // ADR % (The Golden Rule)
    const highLowPct = data.map(d => ((d.high - d.low) / d.close) * 100);
    const adr = calculateSMA(highLowPct.slice(-20), 20);
    
    if (adr < config.minADR) {
      return { metrics: null, reason: 'adr' };
    }

    // --- SCORING (0-20 Points) ---
    let score = 0;
    const signals: string[] = [];

    // 1. ADR Scoring (5 pts max)
    let adrScore = 0;
    if (adr >= 10) adrScore = 5;
    else if (adr >= 8) adrScore = 4;
    else if (adr >= 6) adrScore = 3;
    else adrScore = 2;
    score += adrScore;
    signals.push(`ADR ${adr.toFixed(1)}% (+${adrScore})`);

    // 2. RS Momentum (4 pts max)
    const lookback = config.lookbackDays;
    const periodData = data.slice(-lookback);
    const lowestPrice = Math.min(...periodData.map(d => d.low));
    const rsPct = lowestPrice > 0 ? ((currentPrice / lowestPrice) - 1) * 100 : 0;
    
    let rsScore = 0;
    if (rsPct >= 100) rsScore = 4;
    else if (rsPct >= 50) rsScore = 3;
    else if (rsPct >= 25) rsScore = 2;
    else rsScore = 1;
    score += rsScore;
    signals.push(`RS ${rsPct.toFixed(0)}% (+${rsScore})`);

    // 3. EMA Alignment (7 pts max)
    const closes = data.map(d => d.close);
    const ema10 = calculateEMA(closes, 10);
    const ema20 = calculateEMA(closes, 20);
    const ema50 = calculateEMA(closes, 50);
    
    const lastEma10 = ema10[ema10.length - 1];
    const lastEma20 = ema20[ema20.length - 1];
    const lastEma50 = ema50[ema50.length - 1];
    
    let emaScore = 0;
    if (currentPrice > lastEma10 && lastEma10 > lastEma20) emaScore += 3;
    if (lastEma10 > lastEma20 && lastEma20 > lastEma50) emaScore += 2;
    
    const dist10 = Math.abs((currentPrice - lastEma10) / currentPrice * 100);
    if (dist10 < 2) emaScore += 2;
    else if (dist10 < 4) emaScore += 1;
    
    score += emaScore;
    signals.push(`EMA Align (+${emaScore})`);

    // 4. Tightness (2 pts max)
    const last5 = data.slice(-6, -1);
    const prevHigh = Math.max(...last5.map(d => d.high));
    const prevLow = Math.min(...last5.map(d => d.low));
    const tightRange = (prevHigh - prevLow) / currentPrice * 100;
    
    let tightnessScore = 0;
    if (tightRange < adr * 0.5) tightnessScore = 2;
    else if (tightRange < adr * 0.7) tightnessScore = 1;
    score += tightnessScore;
    if (tightnessScore > 0) signals.push(`Tight Group (+${tightnessScore})`);

    // 5. Volume Surge (2 pts max)
    const recentVol = calculateSMA(volumes.slice(-3), 3);
    let volScore = 0;
    if (recentVol > avgVolume * 1.5) volScore = 2;
    else if (recentVol > avgVolume) volScore = 1;
    score += volScore;
    if (volScore > 0) signals.push(`Vol Surge (+${volScore})`);

    // ATR for stops
    const trueRanges: number[] = [];
    for (let i = 1; i < data.length; i++) {
      const tr1 = data[i].high - data[i].low;
      const tr2 = Math.abs(data[i].high - data[i - 1].close);
      const tr3 = Math.abs(data[i].low - data[i - 1].close);
      trueRanges.push(Math.max(tr1, tr2, tr3));
    }
    const atr = calculateSMA(trueRanges.slice(-14), 14);
    
    const atrStop = currentPrice - (atr * 1.5);
    const suggestedStop = Math.max(atrStop, lastEma10);
    
    // 52w High
    const high52w = Math.max(...data.slice(-252).map(d => d.high));
    const rr = currentPrice > suggestedStop 
      ? (high52w - currentPrice) / (currentPrice - suggestedStop) 
      : 0;

    // Lineage
    const lineage: Record<string, string> = {
      'ADR (%)': `${adr.toFixed(2)}% (Score: ${adrScore}/5)`,
      'RS Momentum': `${rsPct.toFixed(2)}% from low (Score: ${rsScore}/4)`,
      'EMA Alignment': `Score: ${emaScore}/7 (Price: $${currentPrice.toFixed(2)}, EMA10: $${lastEma10.toFixed(2)}, EMA20: $${lastEma20.toFixed(2)})`,
      'Tightness (5d)': `${tightRange.toFixed(2)}% (Score: ${tightnessScore}/2)`,
      'Volume Surge': `${(recentVol / avgVolume).toFixed(1)}x avg (Score: ${volScore}/2)`,
      'ATR (14d)': atr.toFixed(2),
      '52w High': `$${high52w.toFixed(2)}`,
    };

    // Raw data for charts (last 60 days)
    const chartData = data.slice(-60);
    const raw_data = {
      dates: chartData.map(d => d.date),
      open: chartData.map(d => d.open),
      high: chartData.map(d => d.high),
      low: chartData.map(d => d.low),
      close: chartData.map(d => d.close),
      ema10: ema10.slice(-60),
      ema20: ema20.slice(-60),
      ema50: ema50.slice(-60),
      volume: chartData.map(d => d.volume),
    };

    return {
      metrics: {
        symbol,
        price: currentPrice,
        score,
        adr,
        rs_pct: rsPct,
        vol_ma: avgVolume,
        rr_ratio: rr,
        suggested_stop: suggestedStop,
        signals,
        date: latest.date,
        lineage,
        raw_data,
      },
      reason: null,
    };
  } catch (error) {
    console.error(`Error calculating metrics for ${symbol}:`, error);
    return { metrics: null, reason: 'error' };
  }
}

export function filterAndSortResults(
  results: StockMetrics[],
  minScore: number = 5
): StockMetrics[] {
  return results
    .filter(r => r.score >= minScore)
    .sort((a, b) => {
      // Sort by score descending, then by ADR descending
      if (b.score !== a.score) return b.score - a.score;
      return b.adr - a.adr;
    });
}