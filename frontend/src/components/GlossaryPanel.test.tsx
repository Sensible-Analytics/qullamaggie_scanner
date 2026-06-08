import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GlossaryPanel } from './GlossaryPanel';

describe('GlossaryPanel', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<GlossaryPanel open={false} onClose={() => {}} />);
    expect(container.textContent).toBe('');
  });

  it('renders all glossary entries when open', () => {
    render(<GlossaryPanel open={true} onClose={() => {}} />);
    expect(screen.getByText('Glossary')).toBeInTheDocument();
    expect(screen.getByText('ADR%')).toBeInTheDocument();
    expect(screen.getByText('RS Momentum')).toBeInTheDocument();
    expect(screen.getByText('EMA Alignment')).toBeInTheDocument();
    expect(screen.getByText('Tightness')).toBeInTheDocument();
    expect(screen.getByText('Volume Surge')).toBeInTheDocument();
    expect(screen.getByText('ATR')).toBeInTheDocument();
    expect(screen.getByText('Stop Loss')).toBeInTheDocument();
    expect(screen.getByText('R:R Ratio')).toBeInTheDocument();
    expect(screen.getByText('52-Week High')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
  });

  it('has a close button', () => {
    render(<GlossaryPanel open={true} onClose={() => {}} />);
    expect(screen.getByText('[close]')).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    let called = false;
    render(<GlossaryPanel open={true} onClose={() => { called = true; }} />);
    fireEvent.click(screen.getByText('[close]'));
    expect(called).toBe(true);
  });

  it('calls onClose on Escape key', () => {
    let called = false;
    render(<GlossaryPanel open={true} onClose={() => { called = true; }} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(called).toBe(true);
  });

  it('sets role="dialog"', () => {
    render(<GlossaryPanel open={true} onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });
});
