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
      height: 400,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#cccccc',
      },
      timeScale: {
        borderColor: '#cccccc',
        timeVisible: false,
      },
    });

    // Add candlestick series
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderUpColor: '#26a69a',
      borderDownColor: '#ef5350',
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Format data for lightweight charts
    const candleData = stock.raw_data.dates.map((date, i) => ({
      time: date,
      open: stock.raw_data.open[i],
      high: stock.raw_data.high[i],
      low: stock.raw_data.low[i],
      close: stock.raw_data.close[i],
    }));

    candleSeries.setData(candleData);

    // Add EMA lines
    const ema10Series = chart.addSeries(LineSeries, {
      color: 'blue',
      lineWidth: 1,
      title: 'EMA 10',
    });
    const ema20Series = chart.addSeries(LineSeries, {
      color: 'orange',
      lineWidth: 1,
      title: 'EMA 20',
    });
    const ema50Series = chart.addSeries(LineSeries, {
      color: 'red',
      lineWidth: 1,
      title: 'EMA 50',
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

    // Add volume series
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#26a69a',
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
        ? 'rgba(38, 166, 154, 0.5)' 
        : 'rgba(239, 83, 80, 0.5)',
    }));

    volumeSeries.setData(volumeData);

    chart.timeScale().fitContent();

    // Handle resize
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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">{stock.symbol}</h2>
          <p className="text-gray-600">{stock.date}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">${stock.price.toFixed(2)}</p>
          <p className="text-lg">
            Score: <span className="font-bold">{stock.score}/20</span>
          </p>
        </div>
      </div>

      {/* Chart */}
      <div ref={chartContainerRef} className="w-full h-96 mb-6"></div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">ADR%</p>
          <p className="text-xl font-semibold">{stock.adr.toFixed(2)}%</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">RS Momentum</p>
          <p className="text-xl font-semibold">{stock.rs_pct.toFixed(0)}%</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Suggested Stop</p>
          <p className="text-xl font-semibold">${stock.suggested_stop.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">R:R Ratio</p>
          <p className="text-xl font-semibold">{stock.rr_ratio.toFixed(2)}</p>
        </div>
      </div>

      {/* Lineage Details */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Scoring Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {Object.entries(stock.lineage).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{key}:</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Signals */}
      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2">Signals</h3>
        <div className="flex flex-wrap gap-2">
          {stock.signals.map((signal, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
