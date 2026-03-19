import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

describe('Card', () => {
  it('renders without description when not provided', () => {
    render(<Card icon={<span data-testid="test-icon">🔍</span>} title="Test Title" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('renders only children when icon provided without title', () => {
    render(
      <Card icon={<span data-testid="test-icon">🔍</span>}>
        <p>Only children content</p>
      </Card>
    );

    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    expect(screen.getByText('Only children content')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
