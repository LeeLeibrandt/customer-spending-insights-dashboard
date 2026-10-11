import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { OverviewView } from '../../../features/overview/OverviewView';
import { createHandlers } from '../../../mocks/handlers';
import { renderWithTheme } from '../../renderWithTheme';
import { server } from '../../server';

const requestedUrls: string[] = [];
const onViewTransactions = vi.fn();

function recordRequest({ request }: { request: Request }) {
  requestedUrls.push(request.url);
}

describe('OverviewView', () => {
  beforeEach(() => {
    requestedUrls.length = 0;
    server.use(...createHandlers('2024-09-16'));
    server.events.on('request:start', recordRequest);
  });

  afterEach(() => {
    server.events.removeListener('request:start', recordRequest);
  });

  it('shows spending by category', async () => {
    renderWithTheme(
      <OverviewView
        title="Spending insights"
        description="Overview"
        onViewTransactions={onViewTransactions}
      />,
    );

    const card = await screen.findByRole('region', {
      name: 'Spending by category',
    });
    expect(within(card).getByText('Groceries')).toBeInTheDocument();
  });

  it('shows monthly spending with a table alternative', async () => {
    renderWithTheme(
      <OverviewView
        title="Spending insights"
        description="Overview"
        onViewTransactions={onViewTransactions}
      />,
    );

    expect(
      await screen.findByRole('table', { name: 'Monthly spending' }),
    ).toBeInTheDocument();
  });

  it('shows recent transactions and links to all transactions', async () => {
    renderWithTheme(
      <OverviewView
        title="Spending insights"
        description="Overview"
        onViewTransactions={onViewTransactions}
      />,
    );

    const card = await screen.findByRole('region', {
      name: 'Recent transactions',
    });
    expect(within(card).getAllByRole('row')).toHaveLength(6);

    fireEvent.click(within(card).getByRole('button', { name: 'View all' }));
    expect(onViewTransactions).toHaveBeenCalledOnce();
  });

  it('loads the summary for the selected period', async () => {
    renderWithTheme(
      <OverviewView
        title="Spending insights"
        description="Overview"
        onViewTransactions={onViewTransactions}
      />,
    );

    fireEvent.mouseDown(
      await screen.findByRole('combobox', { name: 'Period' }),
    );
    fireEvent.click(
      within(screen.getByRole('listbox')).getByRole('option', {
        name: 'Last 90 days',
      }),
    );

    await waitFor(() =>
      expect(
        requestedUrls.some((url) => url.includes('summary?period=90d')),
      ).toBe(true),
    );
  });
});
