import { fireEvent, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../../app/App';
import { createHandlers } from '../../mocks/handlers';
import { renderWithTheme } from '../renderWithTheme';
import { server } from '../server';

describe('App', () => {
  beforeEach(() => {
    server.use(...createHandlers('2024-09-16'));
  });

  it('shows the customer and switches views from the navigation', async () => {
    renderWithTheme(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Spending insights' }),
    ).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(
      await screen.findByRole('region', { name: 'Spending by category' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    fireEvent.click(screen.getByRole('button', { name: 'Transactions' }));

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Transactions',
        hidden: true,
      }),
    ).toBeInTheDocument();
  });

  it('shows the customer profile from the header', async () => {
    renderWithTheme(<App />);

    fireEvent.click(await screen.findByRole('button', { name: /John Doe/ }));

    const profile = await screen.findByRole('dialog', { name: 'Your profile' });
    expect(within(profile).getByText('Premium')).toBeInTheDocument();
    expect(within(profile).getByText('Lifetime spent')).toBeInTheDocument();
  });
});
