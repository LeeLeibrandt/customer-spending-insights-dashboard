import { CategoryIcon, PaymentMethod } from '../types/enums';
import type { Transaction } from '../types/transactions';

let nextTransactionNumber = 1;

export function createTransaction(
  overrides: Partial<Transaction> = {},
): Transaction {
  return {
    id: `txn_test_${nextTransactionNumber++}`,
    date: '2024-09-16T10:00:00Z',
    merchant: 'Pick n Pay',
    category: 'Groceries',
    amount: 100,
    description: 'Groceries',
    paymentMethod: PaymentMethod.DebitCard,
    icon: CategoryIcon.ShoppingCart,
    categoryColor: '#FF6B6B',
    ...overrides,
  };
}
