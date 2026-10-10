import type {
  CategoryIcon,
  PaymentMethod,
  TransactionSortOrder,
} from './enums';

export interface TransactionsQuery {
  limit?: number;
  offset?: number;
  category?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: TransactionSortOrder;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  description: string;
  paymentMethod: PaymentMethod;
  icon: CategoryIcon;
  categoryColor: string;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: Pagination;
}
