interface EmptyStateProps {}

export function EmptyState({}: EmptyStateProps) {
  return (
    <div className="rounded-lg border p-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="text-center py-8">
        <div className="font-mono text-4xl mb-4 opacity-20">[]</div>
        <p className="font-mono text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
          No signals found
        </p>
        <p className="text-xs font-mono" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
          Try lowering the min score or expanding your universe
        </p>
      </div>
    </div>
  );
}