import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import {
  getCustomerProfile,
  getFilters,
  getSpendingByCategory,
  getSpendingGoals,
  getSpendingSummary,
  getSpendingTrends,
  getTransactions,
} from '../../services/spendingInsightsService';
import { Period, TransactionSortOrder } from '../../types/enums';
import { server } from '../server';

const CUSTOMER_ID = '12345';
const RESPONSE_BODY = { ok: true };

function respondTo(path: string): () => URLSearchParams {
  let searchParams = new URLSearchParams();

  server.use(
    http.get(`/api/customers/${CUSTOMER_ID}${path}`, ({ request }) => {
      searchParams = new URL(request.url).searchParams;
      return HttpResponse.json(RESPONSE_BODY);
    }),
  );

  return () => searchParams;
}

describe('spendingInsightsService', () => {
  it('gets the customer profile', async () => {
    respondTo('/profile');

    await expect(getCustomerProfile(CUSTOMER_ID)).resolves.toEqual(
      RESPONSE_BODY,
    );
  });

  it('gets the spending summary for a period', async () => {
    const getParams = respondTo('/spending/summary');

    await expect(
      getSpendingSummary(CUSTOMER_ID, { period: Period.NinetyDays }),
    ).resolves.toEqual(RESPONSE_BODY);
    expect(getParams().get('period')).toBe('90d');
  });

  it('gets spending by category for a custom date range', async () => {
    const getParams = respondTo('/spending/categories');

    await getSpendingByCategory(CUSTOMER_ID, {
      startDate: '2024-08-01',
      endDate: '2024-08-31',
    });

    expect(getParams().get('startDate')).toBe('2024-08-01');
    expect(getParams().get('endDate')).toBe('2024-08-31');
    expect(getParams().has('period')).toBe(false);
  });

  it('gets spending trends for a number of months', async () => {
    const getParams = respondTo('/spending/trends');

    await getSpendingTrends(CUSTOMER_ID, { months: 6 });

    expect(getParams().get('months')).toBe('6');
  });

  it('gets transactions with filters, sorting, and pagination', async () => {
    const getParams = respondTo('/transactions');

    await getTransactions(CUSTOMER_ID, {
      limit: 20,
      offset: 40,
      category: 'Groceries',
      sortBy: TransactionSortOrder.AmountDesc,
    });

    expect(Object.fromEntries(getParams())).toEqual({
      limit: '20',
      offset: '40',
      category: 'Groceries',
      sortBy: 'amount_desc',
    });
  });

  it('gets the spending goals', async () => {
    respondTo('/goals');

    await expect(getSpendingGoals(CUSTOMER_ID)).resolves.toEqual(RESPONSE_BODY);
  });

  it('gets the available filters', async () => {
    respondTo('/filters');

    await expect(getFilters(CUSTOMER_ID)).resolves.toEqual(RESPONSE_BODY);
  });
});
