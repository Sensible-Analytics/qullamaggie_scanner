import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InfoTooltip } from './InfoTooltip';

describe('InfoTooltip', () => {
  it('renders the info icon button', () => {
    render(<InfoTooltip term="Score">Tooltip content</InfoTooltip>);
    const btn = screen.getByRole('button', { name: /learn more about score/i });
    expect(btn).toBeInTheDocument();
  });

  it('shows tooltip on click', () => {
    render(<InfoTooltip term="Score">Tooltip content</InfoTooltip>);
    const btn = screen.getByRole('button', { name: /learn more about score/i });
    fireEvent.click(btn);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on second click', () => {
    render(<InfoTooltip term="Score">Tooltip content</InfoTooltip>);
    const btn = screen.getByRole('button', { name: /learn more about score/i });
    fireEvent.click(btn);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('shows tooltip on mouse enter and hides on mouse leave', () => {
    render(<InfoTooltip term="Score">Tooltip content</InfoTooltip>);
    const btn = screen.getByRole('button', { name: /learn more about score/i });
    fireEvent.mouseEnter(btn);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    fireEvent.mouseLeave(btn);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('hides tooltip on Escape key after click', () => {
    render(<InfoTooltip term="Score">Tooltip content</InfoTooltip>);
    const btn = screen.getByRole('button', { name: /learn more about score/i });
    fireEvent.click(btn);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    fireEvent.keyDown(btn, { key: 'Escape' });
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('renders with aria-label matching the term', () => {
    render(<InfoTooltip term="ADR%">ADR explanation</InfoTooltip>);
    expect(screen.getByLabelText('Learn more about ADR%')).toBeInTheDocument();
  });
});
