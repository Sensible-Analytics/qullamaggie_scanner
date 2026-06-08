import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SelectionRationale } from './SelectionRationale';

describe('SelectionRationale', () => {
  const sampleLineage: Record<string, string> = {
    'ADR (%)': '5.5% (Score: 4/5)',
    'RS Momentum': '70% (Score: 3/4)',
    'EMA Alignment': 'Bullish (Score: 6/7)',
    'Tightness (5d)': 'Compact (Score: 2/2)',
    'Volume Surge': '120% (Score: 1/2)',
  };

  it('renders the Score Breakdown header', () => {
    render(<SelectionRationale lineage={sampleLineage} />);
    expect(screen.getByText('Score Breakdown')).toBeInTheDocument();
  });

  it('renders all 5 score categories', () => {
    render(<SelectionRationale lineage={sampleLineage} />);
    expect(screen.getByText('ADR (%)')).toBeInTheDocument();
    expect(screen.getByText('RS Momentum')).toBeInTheDocument();
    expect(screen.getByText('EMA Alignment')).toBeInTheDocument();
    expect(screen.getByText('Tightness (5d)')).toBeInTheDocument();
    expect(screen.getByText('Volume Surge')).toBeInTheDocument();
  });

  it('renders progress bars for each score', () => {
    render(<SelectionRationale lineage={sampleLineage} />);
    const bars = document.querySelectorAll('[style*="width"]');
    expect(bars.length).toBeGreaterThanOrEqual(5);
  });

  it('handles missing score data gracefully', () => {
    render(<SelectionRationale lineage={{ 'ADR (%)': '5.5%' }} />);
    expect(screen.getByText('ADR (%)')).toBeInTheDocument();
  });

  it('renders all 5 categories even with empty lineage', () => {
    const { container } = render(<SelectionRationale lineage={{}} />);
    expect(screen.getByText('Score Breakdown')).toBeInTheDocument();
    expect(screen.getByText('ADR (%)')).toBeInTheDocument();
    expect(container.textContent).toContain('0/5');
  });

  it('ignores unknown lineage keys (only predefined categories rendered)', () => {
    const { container } = render(<SelectionRationale lineage={{ 'Custom Key': 'some text' }} />);
    expect(screen.getByText('Score Breakdown')).toBeInTheDocument();
    expect(container.textContent).not.toContain('Custom Key');
  });
});
