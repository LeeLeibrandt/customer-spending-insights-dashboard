import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { OverviewView } from '../../../features/overview/OverviewView';
import { createHandlers } from '../../../mocks/handlers';
import { renderWithTheme } from '../../renderWithTheme';
import { recordRequests } from '../../requestRecorder';
import { selectOption } from '../../selectOption';
import { server } from '../../server';

const onViewTransactions = vi.fn();

function renderOverview() {
  renderWithTheme(
    <OverviewView
      title="Spending insights"
      description="Overview"
      onViewTransactions={onViewTransactions}
    />,
  );
}

describe('OverviewView', () => {
  let recorder: ReturnType<typeof recordRequests>;

  beforeEach(() => {
    server.use(...createHandlers('2024-09-16'));
    recorder = recordRequests();
  });

  afterEach(() => {
    recorder.stop();
  });

  it('shows spending by category', async () => {
    renderOverview();

    const card = await screen.findByRole('region', {
      name: 'Spending by category',
    });
    expect(within(card).getByText('Groceries')).toBeInTheDocument();
  });

  it('updates the spending graph and table for the selected period', async () => {
    renderOverview();

    const table = await screen.findByRole('table', {
      name: 'Spending over time',
    });
    expect(within(table).getAllByRole('row')).toHaveLength(6);

    await selectOption('Period', 'Last 7 days');

    await waitFor(() =>
      expect(
        within(
          screen.getByRole('table', { name: 'Spending over time' }),
        ).getAllByRole('row'),
      ).toHaveLength(8),
    );
    expect(screen.getByText('Last 7 days · daily')).toBeInTheDocument();
    expect(
      recorder.urls.some((url) =>
        url.includes('transactions?startDate=2024-09-10&endDate=2024-09-16'),
      ),
    ).toBe(true);
  });

  it('shows recent transactions and links to all transactions', async () => {
    renderOverview();

    const card = await screen.findByRole('region', {
      name: 'Recent transactions',
    });
    expect(within(card).getAllByRole('row')).toHaveLength(6);

    fireEvent.click(within(card).getByRole('button', { name: 'View all' }));
    expect(onViewTransactions).toHaveBeenCalledOnce();
  });

  it('loads the summary for the selected period', async () => {
    renderOverview();

    await selectOption('Period', 'Last 90 days');

    await waitFor(() =>
      expect(
        recorder.urls.some((url) => url.includes('summary?period=90d')),
      ).toBe(true),
    );
  });

  it('shows the full year without losing the overview', async () => {
    renderOverview();

    await selectOption('Period', 'Last year');

    const table = await screen.findByRole('table', {
      name: 'Spending over time',
    });
    await waitFor(() =>
      expect(within(table).getAllByRole('row')).toHaveLength(14),
    );
    expect(
      screen.getByRole('region', { name: 'Spending by category' }),
    ).toBeInTheDocument();
  });
});
