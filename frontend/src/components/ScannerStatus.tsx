interface ScannerStatusProps {
  isLoading: boolean;
}

export function ScannerStatus({ isLoading }: ScannerStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-green)' }}></span>
      <span className="text-xs font-mono" style={{ color: 'var(--accent-green)' }}>
        {isLoading ? 'running' : 'ready'}
      </span>
    </div>
  );
}