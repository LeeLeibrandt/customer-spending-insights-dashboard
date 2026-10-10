import type { SpendingTotals } from '../types/spending';
import type { Transaction } from '../types/transactions';
import { toIsoDateFromTimestamp, toIsoMonth } from './dates';
import { sumAmounts } from './money';

export function filterTransactionsByDate(
  transactions: readonly Transaction[],
  bounds: { startDate?: string; endDate?: string },
): Transaction[] {
  return transactions.filter((transaction) => {
    const date = toIsoDateFromTimestamp(transaction.date);
    return (
      (bounds.startDate === undefined || date >= bounds.startDate) &&
      (bounds.endDate === undefined || date <= bounds.endDate)
    );
  });
}

export function calculateTotals(
  transactions: readonly Transaction[],
): SpendingTotals {
  return {
    amount: sumAmounts(transactions.map((transaction) => transaction.amount)),
    transactionCount: transactions.length,
  };
}

function groupTotals(
  transactions: readonly Transaction[],
  getKey: (transaction: Transaction) => string,
): Map<string, SpendingTotals> {
  const groups = new Map<string, Transaction[]>();

  for (const transaction of transactions) {
    const key = getKey(transaction);
    const group = groups.get(key);

    if (group) {
      group.push(transaction);
    } else {
      groups.set(key, [transaction]);
    }
  }

  return new Map(
    [...groups].map(([key, group]) => [key, calculateTotals(group)]),
  );
}

export function calculateTotalsByCategory(
  transactions: readonly Transaction[],
): Map<string, SpendingTotals> {
  return groupTotals(transactions, (transaction) => transaction.category);
}

export function calculateTotalsByMonth(
  transactions: readonly Transaction[],
): Map<string, SpendingTotals> {
  return groupTotals(transactions, (transaction) =>
    toIsoMonth(toIsoDateFromTimestamp(transaction.date)),
  );
}

export function findTopCategory(
  transactions: readonly Transaction[],
): string | null {
  let topCategory: string | null = null;
  let topAmount = -Infinity;

  for (const [category, totals] of calculateTotalsByCategory(transactions)) {
    if (totals.amount > topAmount) {
      topCategory = category;
      topAmount = totals.amount;
    }
  }

  return topCategory;
}
