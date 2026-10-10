import { beforeEach, describe, expect, it } from 'vitest';
import { createHandlers } from '../../mocks/handlers';
import { ApiError } from '../../services/apiError';
import {
  getSpendingByCategory,
  getSpendingSummary,
  getTransactions,
} from '../../services/spendingInsightsService';
import { Period } from '../../types/enums';
import { server } from '../server';

const CUSTOMER_ID = '12345';

describe('mock handlers', () => {
  beforeEach(() => {
    server.use(...createHandlers('2024-09-16'));
  });

  it('returns the same total for the summary and the categories', async () => {
    const [summary, categories] = await Promise.all([
      getSpendingSummary(CUSTOMER_ID, { period: Period.NinetyDays }),
      getSpendingByCategory(CUSTOMER_ID, { period: Period.NinetyDays }),
    ]);

    expect(summary.totalSpent).toBeGreaterThan(0);
    expect(summary.totalSpent).toBe(categories.totalAmount);
    expect(summary.topCategory).toBe(categories.categories[0]?.name);
  });

  it('filters and pages transactions', async () => {
    const { transactions, pagination } = await getTransactions(CUSTOMER_ID, {
      category: 'Groceries',
      limit: 5,
    });

    expect(transactions).toHaveLength(5);
    expect(transactions.every(({ category }) => category === 'Groceries')).toBe(
      true,
    );
    expect(pagination.hasMore).toBe(true);
  });

  it('rejects an unknown customer', async () => {
    await expect(getTransactions('99999')).rejects.toBeInstanceOf(ApiError);
  });
});
