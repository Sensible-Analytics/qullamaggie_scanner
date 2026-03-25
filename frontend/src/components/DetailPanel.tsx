import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, LineSeries, HistogramSeries } from 'lightweight-charts';
import { useScannerStore } from '../store/scannerStore';

export default function DetailPanel() {
  const { results, selectedSymbol } = useScannerStore();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  const stock = results.find(r => r.symbol === selectedSymbol);

  useEffect(() => {
    if (!chartContainerRef.current || !stock) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 350,
      layout: {
        background: { color: '#111111' },
        textColor: '#a1a1aa',
      },
      grid: {
        vertLines: { color: '#1a1a1a' },
        horzLines: { color: '#1a1a1a' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#2a2a2a',
      },
      timeScale: {
        borderColor: '#2a2a2a',
        timeVisible: false,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    const candleData = stock.raw_data.dates.map((date, i) => ({
      time: date,
      open: stock.raw_data.open[i],
      high: stock.raw_data.high[i],
      low: stock.raw_data.low[i],
      close: stock.raw_data.close[i],
    }));

    candleSeries.setData(candleData);

    const ema10Series = chart.addSeries(LineSeries, {
      color: '#3b82f6',
      lineWidth: 1,
    });
    const ema20Series = chart.addSeries(LineSeries, {
      color: '#f59e0b',
      lineWidth: 1,
    });
    const ema50Series = chart.addSeries(LineSeries, {
      color: '#a855f7',
      lineWidth: 1,
    });

    const ema10Data = stock.raw_data.dates.map((date, i) => ({
      time: date,
      value: stock.raw_data.ema10[i],
    }));
    const ema20Data = stock.raw_data.dates.map((date, i) => ({
      time: date,
      value: stock.raw_data.ema20[i],
    }));
    const ema50Data = stock.raw_data.dates.map((date, i) => ({
      time: date,
      value: stock.raw_data.ema50[i],
    }));

    ema10Series.setData(ema10Data);
    ema20Series.setData(ema20Data);
    ema50Series.setData(ema50Data);

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#22c55e',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });
    
    chart.priceScale('').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const volumeData = stock.raw_data.dates.map((date, i) => ({
      time: date,
      value: stock.raw_data.volume[i],
      color: stock.raw_data.close[i] >= (stock.raw_data.close[i - 1] || stock.raw_data.close[i]) 
        ? 'rgba(34, 197, 94, 0.5)' 
        : 'rgba(239, 68, 68, 0.5)',
    }));

    volumeSeries.setData(volumeData);

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [stock]);

  if (!stock) return null;

  return (
    <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xl font-bold" style={{ color: 'var(--accent-green)' }}>
            {stock.symbol}
          </span>
          <span className="font-mono text-2xl font-bold">
            ${stock.price.toFixed(2)}
          </span>
          <span className={`font-mono px-2 py-0.5 rounded text-sm ${stock.score >= 15 ? 'bg-green-900/50 text-green-400' : stock.score >= 10 ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'}`}>
            {stock.score}/20
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          <span>EMA 10 <span style={{ color: '#3b82f6' }}>━</span></span>
          <span>EMA 20 <span style={{ color: '#f59e0b' }}>━</span></span>
          <span>EMA 50 <span style={{ color: '#a855f7' }}>━</span></span>
        </div>
      </div>

      <div ref={chartContainerRef} className="w-full h-[350px]"></div>

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>ADR%</p>
          <p className="font-mono font-semibold">{stock.adr.toFixed(2)}%</p>
        </div>
        <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>RS Momentum</p>
          <p className="font-mono font-semibold">{stock.rs_pct.toFixed(0)}%</p>
        </div>
        <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Stop Loss</p>
          <p className="font-mono font-semibold">${stock.suggested_stop.toFixed(2)}</p>
        </div>
        <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>R:R Ratio</p>
          <p className="font-mono font-semibold">{stock.rr_ratio.toFixed(2)}</p>
        </div>
      </div>

      {stock.signals.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {stock.signals.map((signal, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded text-xs font-mono"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--accent-green)' }}
              >
                {signal}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
