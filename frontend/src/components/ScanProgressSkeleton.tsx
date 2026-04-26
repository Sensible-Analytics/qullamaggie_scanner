interface ScanProgressSkeletonProps {
  progress: { current: number; total: number; symbol: string };
}

export function ScanProgressSkeleton({ progress }: ScanProgressSkeletonProps) {
  return (
    <div className="rounded-lg border p-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="animate-pulse" style={{ color: 'var(--accent-amber)' }}>●</span>
        <span className="font-mono">Scanning markets...</span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-mono">
          <span style={{ color: 'var(--text-secondary)' }}>
            {progress.symbol}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>{progress.current}/{progress.total}</span>
        </div>
        <div className="w-full rounded-full h-1" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <div
            className="h-1 rounded-full transition-all"
            style={{ width: `${(progress.current / progress.total) * 100}%`, backgroundColor: 'var(--accent-green)' }}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 animate-pulse">
        <div className="h-8 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
        <div className="h-8 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
        <div className="h-8 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
      </div>
    </div>
  );
}