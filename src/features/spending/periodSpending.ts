import type { DateRange } from '../../types/common';
import { Period } from '../../types/enums';
import type { SpendingBucket } from '../../types/spending';
import type { Transaction } from '../../types/transactions';
import { addDays, addMonths, toIsoMonth } from '../../utils/dates';
import { sumAmounts } from '../../utils/money';

export function getPeriodSpendingBuckets(
  period: Period,
  range: DateRange,
  transactions: readonly Transaction[],
): SpendingBucket[] {
  const bucketStarts: string[] = [];

  if (period === Period.OneYear) {
    for (
      let month = toIsoMonth(range.startDate);
      month <= toIsoMonth(range.endDate);
      month = addMonths(month, 1)
    ) {
      bucketStarts.push(month);
    }
  } else {
    const step = period === Period.SevenDays ? 1 : 7;
    for (
      let date = range.startDate;
      date <= range.endDate;
      date = addDays(date, step)
    ) {
      bucketStarts.push(date);
    }
  }

  return bucketStarts.map((month, index) => {
    const next = bucketStarts[index + 1];
    const amounts = transactions
      .filter((transaction) => {
        const date = transaction.date.slice(0, 10);
        const key = period === Period.OneYear ? toIsoMonth(date) : date;
        return key >= month && (next === undefined || key < next);
      })
      .map((transaction) => transaction.amount);

    return { month, totalSpent: sumAmounts(amounts) };
  });
}
