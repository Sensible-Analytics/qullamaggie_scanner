import { useEffect, useRef } from 'react';

interface GlossaryEntry {
  term: string;
  definition: string;
}

const GLOSSARY: GlossaryEntry[] = [
  { term: 'ADR%', definition: 'Average Daily Range — the average percentage difference between a stock\'s high and low price over the last 20 trading days. Higher ADR means more volatility and bigger potential moves.' },
  { term: 'RS Momentum', definition: 'Relative Strength Momentum — measures how far a stock has climbed from its lowest point over the lookback period. Large moves from the low indicate strong upward momentum.' },
  { term: 'EMA Alignment', definition: 'Exponential Moving Average Alignment — checks whether shorter-term EMAs (10, 20, 50) are properly stacked with price above them all. Bullish alignment means the trend is accelerating.' },
  { term: 'Tightness', definition: 'Measures how compact the last 5 days of trading are relative to the stock\'s ADR. Tight consolidation before a breakout is a classic momentum setup.' },
  { term: 'Volume Surge', definition: 'Compares recent 3-day average volume to the 20-day average. A surge above 1.5x confirms institutional interest in the move.' },
  { term: 'ATR', definition: 'Average True Range — measures market volatility by decomposing the entire range of a stock\'s price movement over 14 days. Used to set intelligent stop losses.' },
  { term: 'Stop Loss', definition: 'The price level at which you would exit a trade to limit losses. The scanner sets this 1.5× ATR below price or at the EMA10, whichever is higher.' },
  { term: 'R:R Ratio', definition: 'Risk-to-Reward Ratio — compares potential upside (to 52-week high) against potential downside (to stop loss). A ratio above 2:1 is considered favourable.' },
  { term: '52-Week High', definition: 'The highest price the stock has traded at in the last 52 weeks. Used as the target price for reward calculations.' },
  { term: 'Score', definition: 'The Qullamaggie 20-point scoring system aggregates five sub-scores: ADR (5pts), RS Momentum (4pts), EMA Alignment (7pts), Tightness (2pts), and Volume Surge (2pts). Higher is better.' },
];

function GlossaryCard({ entry }: { entry: GlossaryEntry }) {
  return (
    <div
      className="rounded p-3"
      style={{ backgroundColor: 'var(--bg-tertiary)' }}
    >
      <p className="font-mono text-sm font-semibold" style={{ color: 'var(--accent-green)' }}>
        {entry.term}
      </p>
      <p className="font-mono text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {entry.definition}
      </p>
    </div>
  );
}

interface GlossaryPanelProps {
  open: boolean;
  onClose: () => void;
}

export function GlossaryPanel({ open, onClose }: GlossaryPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Use a timeout so the click that opened it doesn't immediately close it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Glossary"
        className="rounded-lg border"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
          width: '90%',
          maxWidth: 520,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <h2 className="font-mono text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Glossary
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs px-2 py-1 rounded hover:opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            [close]
          </button>
        </div>
        <div className="p-4 space-y-3">
          {GLOSSARY.map((entry) => (
            <GlossaryCard key={entry.term} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
