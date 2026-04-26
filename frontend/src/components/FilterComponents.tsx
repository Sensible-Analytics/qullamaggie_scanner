import { useScannerStore } from '../store/scannerStore';
import type { StockUniverse } from '../services/stockApi';

function UniverseSelect() {
  const { selectedUniverse, availableUniverses, setSelectedUniverse } = useScannerStore();
  
  return (
    <div>
      <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>
        Universe
      </label>
      <select
        value={selectedUniverse}
        onChange={(e) => setSelectedUniverse(e.target.value)}
        className="w-full px-3 py-2 rounded text-sm font-mono border focus:outline-none focus:ring-1"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
      >
        {availableUniverses.map((universe: StockUniverse) => (
          <option key={universe.id} value={universe.name}>
            {universe.name} ({universe.symbols.length})
          </option>
        ))}
      </select>
    </div>
  );
}

function FilterInput({ label, value, onChange, min = 0, step = 0.5, max }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 rounded text-sm font-mono border focus:outline-none focus:ring-1"
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}

function FilterInputs() {
  const { filters, updateFilters } = useScannerStore();
  
  return (
    <>
      <FilterInput
        label="Min Price ($)"
        value={filters.minPrice}
        onChange={(v) => updateFilters({ minPrice: v })}
        step={0.5}
      />
      <FilterInput
        label="Min Volume ($M)"
        value={filters.minVolumeDollars / 1000000}
        onChange={(v) => updateFilters({ minVolumeDollars: v * 1000000 })}
        min={0}
        step={1}
      />
      <FilterInput
        label="Min ADR (%)"
        value={filters.minADR}
        onChange={(v) => updateFilters({ minADR: v })}
        step={0.5}
      />
      <FilterInput
        label="Min Score (0-20)"
        value={filters.minScore}
        onChange={(v) => updateFilters({ minScore: v })}
        min={0}
        max={20}
        step={1}
      />
    </>
  );
}

export { UniverseSelect, FilterInputs, FilterInput };