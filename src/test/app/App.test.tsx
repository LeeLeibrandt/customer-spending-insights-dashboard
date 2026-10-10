import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithTheme } from '../renderWithTheme';
import { App } from '../../app/App';

describe('App', () => {
  it('renders the dashboard heading inside the main landmark', () => {
    renderWithTheme(<App />);

    const main = screen.getByRole('main');
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Customer Spending Insights',
    });

    expect(main).toContainElement(heading);
  });
});
