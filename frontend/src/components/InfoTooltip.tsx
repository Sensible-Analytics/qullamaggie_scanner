import { useState, useRef, useEffect } from 'react';

interface InfoTooltipProps {
  term: string;
  children: React.ReactNode;
  width?: number;
}

export function InfoTooltip({ term, children, width = 260 }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open]);

  return (
    <span className="info-tooltip-wrapper" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label={`Learn more about ${term}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: '1px solid var(--text-muted)',
          background: 'transparent',
          color: 'var(--text-muted)',
          fontSize: 10,
          lineHeight: 1,
          cursor: 'pointer',
          marginLeft: 4,
          flexShrink: 0,
          fontFamily: 'serif',
          fontStyle: 'italic',
          fontWeight: 600,
          padding: 0,
        }}
      >
        i
      </button>
      {open && (
        <div
          ref={tooltipRef}
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width,
            padding: '10px 12px',
            borderRadius: 6,
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: 12,
            lineHeight: 1.5,
            fontFamily: 'monospace',
            zIndex: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            pointerEvents: 'auto',
          }}
        >
          <strong style={{ color: 'var(--accent-green)', display: 'block', marginBottom: 4, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {term}
          </strong>
          {children}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              border: '6px solid transparent',
              borderTopColor: 'var(--border-color)',
            }}
          />
        </div>
      )}
    </span>
  );
}
