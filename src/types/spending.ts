import type { DateRange } from './common';
import type { CategoryIcon, Period } from './enums';

export interface SpendingSummaryQuery {
  period?: Period;
}

export interface SpendingSummary {
  period: Period;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  topCategory: string;
  comparedToPrevious: {
    spentChange: number;
    transactionChange: number;
  };
}

export interface CategorySpendingQuery {
  period?: Period;
  startDate?: string;
  endDate?: string;
}

export interface CategorySpending {
  name: string;
  amount: number;
  percentage: number;
  transactionCount: number;
  color: string;
  icon: CategoryIcon;
}

export interface CategorySpendingResponse {
  dateRange: DateRange;
  totalAmount: number;
  categories: CategorySpending[];
}

export interface SpendingTrendsQuery {
  months?: number;
}

export interface MonthlySpendingTrend {
  month: string;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
}

export interface SpendingTrendsResponse {
  trends: MonthlySpendingTrend[];
}

export interface SpendingTotals {
  amount: number;
  transactionCount: number;
}
