import { describe, expect, it } from 'vitest';
import { createTransaction } from '../createTransaction';
import {
  calculateTotals,
  calculateTotalsByCategory,
  calculateTotalsByMonth,
  filterTransactionsByDate,
  findTopCategory,
} from '../../utils/spendingCalculations';

const transactions = [
  createTransaction({
    date: '2024-08-31T19:59:00Z',
    category: 'Dining',
    amount: 120.1,
  }),
  createTransaction({
    date: '2024-09-01T06:00:00Z',
    category: 'Groceries',
    amount: 245.8,
  }),
  createTransaction({
    date: '2024-09-15T10:15:00Z',
    category: 'Entertainment',
    amount: 199,
  }),
  createTransaction({
    date: '2024-09-16T14:30:00Z',
    category: 'Groceries',
    amount: 54.2,
  }),
];

describe('filterTransactionsByDate', () => {
  it('includes transactions on both boundary dates', () => {
    const result = filterTransactionsByDate(transactions, {
      startDate: '2024-09-01',
      endDate: '2024-09-15',
    });

    expect(result.map(({ amount }) => amount)).toEqual([245.8, 199]);
  });

  it('treats a missing bound as open-ended', () => {
    expect(
      filterTransactionsByDate(transactions, { startDate: '2024-09-15' }),
    ).toHaveLength(2);
    expect(
      filterTransactionsByDate(transactions, { endDate: '2024-08-31' }),
    ).toHaveLength(1);
  });
});

describe('calculateTotals', () => {
  it('returns the total amount and count', () => {
    expect(calculateTotals(transactions)).toEqual({
      amount: 619.1,
      transactionCount: 4,
    });
  });
});

describe('calculateTotalsByCategory', () => {
  it('groups amounts and counts by category', () => {
    expect(calculateTotalsByCategory(transactions).get('Groceries')).toEqual({
      amount: 300,
      transactionCount: 2,
    });
  });
});

describe('calculateTotalsByMonth', () => {
  it('groups by calendar month', () => {
    const totals = calculateTotalsByMonth(transactions);

    expect([...totals.keys()]).toEqual(['2024-08', '2024-09']);
    expect(totals.get('2024-09')).toEqual({
      amount: 499,
      transactionCount: 3,
    });
  });
});

describe('findTopCategory', () => {
  it('returns the category with the highest total', () => {
    expect(findTopCategory(transactions)).toBe('Groceries');
  });

  it('returns null when there are no transactions', () => {
    expect(findTopCategory([])).toBeNull();
  });
});
