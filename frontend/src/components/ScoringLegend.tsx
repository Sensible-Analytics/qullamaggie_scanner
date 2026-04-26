interface ScoringLegendProps {}

export function ScoringLegend({}: ScoringLegendProps) {
  return (
    <div className="pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
      <h3 className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
        20-Point System
      </h3>
      <ul className="text-xs font-mono space-y-1" style={{ color: 'var(--text-muted)' }}>
        <li className="flex justify-between">
          <span>ADR%</span>
          <span style={{ color: 'var(--text-secondary)' }}>5 max</span>
        </li>
        <li className="flex justify-between">
          <span>RS Momentum</span>
          <span style={{ color: 'var(--text-secondary)' }}>4 max</span>
        </li>
        <li className="flex justify-between">
          <span>EMA Alignment</span>
          <span style={{ color: 'var(--text-secondary)' }}>7 max</span>
        </li>
        <li className="flex justify-between">
          <span>Tightness</span>
          <span style={{ color: 'var(--text-secondary)' }}>2 max</span>
        </li>
        <li className="flex justify-between">
          <span>Volume Surge</span>
          <span style={{ color: 'var(--text-secondary)' }}>2 max</span>
        </li>
      </ul>
    </div>
  );
}