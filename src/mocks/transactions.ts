import { PaymentMethod } from '../types/enums';
import type { MockTransactionRecord, Transaction } from '../types/transactions';
import { addDays } from '../utils/dates';
import { roundTo } from '../utils/money';
import { MOCK_CATEGORIES } from './data/categories';
import { MONTHLY_TRANSACTIONS } from './data/monthlyTransactions';

const MOCK_HISTORY_MONTHS = 12;
const DAYS_PER_MONTH = 30;
// Each repeated month's amounts differ
const MONTHLY_AMOUNT_FACTORS = [1, 1.08, 0.93, 1.15, 0.97, 1.04];

function getMonthlyAmount(
  record: MockTransactionRecord,
  month: number,
): number {
  if (record.paymentMethod === PaymentMethod.DebitOrder) {
    return record.amount;
  }

  const factor =
    MONTHLY_AMOUNT_FACTORS[month % MONTHLY_AMOUNT_FACTORS.length] ?? 1;
  return roundTo(record.amount * factor, 2);
}

export function createMockTransactions(today: string): Transaction[] {
  const transactions = Array.from({ length: MOCK_HISTORY_MONTHS }, (_, month) =>
    MONTHLY_TRANSACTIONS.map((record) => ({
      ...record,
      daysAgo: record.daysAgo + month * DAYS_PER_MONTH,
      amount: getMonthlyAmount(record, month),
    })),
  ).flat();

  return transactions.map(({ daysAgo, ...record }, index) => {
    const category = MOCK_CATEGORIES.find(
      ({ name }) => name === record.category,
    );

    if (!category) {
      throw new Error(`The category "${record.category}" is not defined.`);
    }

    return {
      id: `txn_${100001 + index}`,
      date: `${addDays(today, -daysAgo)}T12:00:00Z`,
      ...record,
      icon: category.icon,
      categoryColor: category.color,
    };
  });
}
