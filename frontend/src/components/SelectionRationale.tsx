interface LineageItem {
  label: string;
  detail: string;
  score: number;
  maxScore: number;
}

function parseLineage(lineage: Record<string, string>): LineageItem[] {
  const knownMetrics: { key: string; max: number }[] = [
    { key: 'ADR (%)', max: 5 },
    { key: 'RS Momentum', max: 4 },
    { key: 'EMA Alignment', max: 7 },
    { key: 'Tightness (5d)', max: 2 },
    { key: 'Volume Surge', max: 2 },
  ];

  return knownMetrics.map(({ key, max }) => {
    const val = lineage[key] || '';
    const scoreMatch = val.match(/Score:\s*(\d+)\/(\d+)/);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
    const maxFromMatch = scoreMatch ? parseInt(scoreMatch[2], 10) : max;
    const detail = val.replace(/\(Score:\s*\d+\/\d+\)/, '').trim();
    return { label: key, detail, score, maxScore: maxFromMatch };
  });
}

interface SelectionRationaleProps {
  lineage: Record<string, string>;
  totalScore: number;
}

export function SelectionRationale({ lineage, totalScore }: SelectionRationaleProps) {
  const items = parseLineage(lineage);

  return (
    <div className="selection-rationale">
      <div className="flex items-center justify-between mb-2">
        <strong style={{ color: 'var(--accent-green)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'monospace' }}>
          Score Breakdown
        </strong>
        <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
          {totalScore}/20
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between items-center mb-0.5">
              <span className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>
                {item.label}
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                {item.score}/{item.maxScore}
              </span>
            </div>
            <div
              className="w-full rounded-full h-1.5"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <div
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: `${(item.score / item.maxScore) * 100}%`,
                  backgroundColor:
                    item.score === item.maxScore
                      ? 'var(--accent-green)'
                      : item.score > 0
                        ? 'var(--accent-amber)'
                        : 'var(--text-muted)',
                }}
              />
            </div>
            {item.detail && (
              <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>
                {item.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
