import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TransactionsView } from '../../../features/transactions/TransactionsView';
import { createHandlers } from '../../../mocks/handlers';
import { renderWithTheme } from '../../renderWithTheme';
import { recordRequests } from '../../requestRecorder';
import { selectOption } from '../../selectOption';
import { server } from '../../server';

describe('TransactionsView', () => {
  let recorder: ReturnType<typeof recordRequests>;

  beforeEach(() => {
    server.use(...createHandlers('2024-09-16'));
    recorder = recordRequests();
  });

  afterEach(() => {
    recorder.stop();
  });

  it('shows a page of transactions and moves to the next page', async () => {
    renderWithTheme(
      <TransactionsView title="Transactions" description="All of them" />,
    );

    const card = await screen.findByRole('region', {
      name: 'All transactions',
    });
    expect(within(card).getAllByRole('row')).toHaveLength(21);
    expect(within(card).getByText('1–20 of 108')).toBeInTheDocument();

    fireEvent.click(within(card).getByRole('button', { name: /next page/i }));

    await waitFor(() =>
      expect(within(card).getByText('21–40 of 108')).toBeInTheDocument(),
    );
  });

  it('sorts transactions by the selected order', async () => {
    renderWithTheme(
      <TransactionsView title="Transactions" description="All of them" />,
    );

    await selectOption('Sort by', 'Highest amount');

    await waitFor(() =>
      expect(
        recorder.urls.some((url) => url.includes('sortBy=amount_desc')),
      ).toBe(true),
    );
  });

  it('filters transactions by category', async () => {
    renderWithTheme(
      <TransactionsView title="Transactions" description="All of them" />,
    );

    await selectOption('Category', 'Groceries');

    await waitFor(() =>
      expect(
        recorder.urls.some((url) => url.includes('category=Groceries')),
      ).toBe(true),
    );
  });

  it('explains a reversed date range instead of sending it', async () => {
    renderWithTheme(
      <TransactionsView title="Transactions" description="All of them" />,
    );

    fireEvent.change(await screen.findByLabelText('From'), {
      target: { value: '2024-09-10' },
    });
    fireEvent.change(screen.getByLabelText('To'), {
      target: { value: '2024-09-01' },
    });

    expect(
      screen.getByText('Choose a start date on or before the end date.'),
    ).toBeInTheDocument();
    expect(
      recorder.urls.some((url) => url.includes('endDate=2024-09-01')),
    ).toBe(false);
  });
});
