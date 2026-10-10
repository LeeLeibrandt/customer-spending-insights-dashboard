import { PaymentMethod } from '../types/enums';
import type { MockTransactionRecord, Transaction } from '../types/transactions';
import { addDays } from '../utils/dates';
import { roundTo } from '../utils/money';
import { MOCK_CATEGORIES } from './categories';

const MOCK_HISTORY_MONTHS = 12;
const DAYS_PER_MONTH = 30;
const MONTHLY_AMOUNT_FACTORS = [1, 1.08, 0.93, 1.15, 0.97, 1.04];

const MONTHLY_TRANSACTIONS: MockTransactionRecord[] = [
  {
    daysAgo: 1,
    merchant: 'Pick n Pay',
    category: 'Groceries',
    amount: 245.8,
    description: 'Weekly groceries',
    paymentMethod: PaymentMethod.CreditCard,
  },
  {
    daysAgo: 4,
    merchant: 'Vodacom',
    category: 'Utilities',
    amount: 399,
    description: 'Mobile contract',
    paymentMethod: PaymentMethod.DebitOrder,
  },
  {
    daysAgo: 8,
    merchant: 'Engen',
    category: 'Transportation',
    amount: 612.4,
    description: 'Fuel',
    paymentMethod: PaymentMethod.DebitCard,
  },
  {
    daysAgo: 12,
    merchant: 'Netflix',
    category: 'Entertainment',
    amount: 199,
    description: 'Monthly subscription',
    paymentMethod: PaymentMethod.DebitOrder,
  },
  {
    daysAgo: 15,
    merchant: "Nando's",
    category: 'Dining',
    amount: 168.5,
    description: 'Lunch',
    paymentMethod: PaymentMethod.CreditCard,
  },
  {
    daysAgo: 18,
    merchant: 'Takealot',
    category: 'Shopping',
    amount: 489,
    description: 'Online order',
    paymentMethod: PaymentMethod.CreditCard,
  },
  {
    daysAgo: 22,
    merchant: 'Woolworths Food',
    category: 'Groceries',
    amount: 312.45,
    description: 'Fresh produce',
    paymentMethod: PaymentMethod.DebitCard,
  },
  {
    daysAgo: 25,
    merchant: 'Uber',
    category: 'Transportation',
    amount: 86.2,
    description: 'Ride',
    paymentMethod: PaymentMethod.CreditCard,
  },
  {
    daysAgo: 27,
    merchant: 'Mugg & Bean',
    category: 'Dining',
    amount: 124.9,
    description: 'Coffee and breakfast',
    paymentMethod: PaymentMethod.CreditCard,
  },
];

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
