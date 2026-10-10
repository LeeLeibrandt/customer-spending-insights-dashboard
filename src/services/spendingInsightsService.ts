import type { CustomerProfile } from '../types/customer';
import type { FiltersResponse } from '../types/filters';
import type { SpendingGoalsResponse } from '../types/goals';
import type {
  CategorySpendingQuery,
  CategorySpendingResponse,
  SpendingSummary,
  SpendingSummaryQuery,
  SpendingTrendsQuery,
  SpendingTrendsResponse,
} from '../types/spending';
import type {
  TransactionsQuery,
  TransactionsResponse,
} from '../types/transactions';
import { getJson } from './httpClient';

function customerPath(customerId: string): string {
  return `/customers/${encodeURIComponent(customerId)}`;
}

export function getCustomerProfile(
  customerId: string,
  signal?: AbortSignal,
): Promise<CustomerProfile> {
  return getJson(`${customerPath(customerId)}/profile`, {}, signal);
}

export function getSpendingSummary(
  customerId: string,
  query: SpendingSummaryQuery = {},
  signal?: AbortSignal,
): Promise<SpendingSummary> {
  return getJson(`${customerPath(customerId)}/spending/summary`, query, signal);
}

export function getSpendingByCategory(
  customerId: string,
  query: CategorySpendingQuery = {},
  signal?: AbortSignal,
): Promise<CategorySpendingResponse> {
  return getJson(
    `${customerPath(customerId)}/spending/categories`,
    query,
    signal,
  );
}

export function getSpendingTrends(
  customerId: string,
  query: SpendingTrendsQuery = {},
  signal?: AbortSignal,
): Promise<SpendingTrendsResponse> {
  return getJson(`${customerPath(customerId)}/spending/trends`, query, signal);
}

export function getTransactions(
  customerId: string,
  query: TransactionsQuery = {},
  signal?: AbortSignal,
): Promise<TransactionsResponse> {
  return getJson(`${customerPath(customerId)}/transactions`, query, signal);
}

export function getSpendingGoals(
  customerId: string,
  signal?: AbortSignal,
): Promise<SpendingGoalsResponse> {
  return getJson(`${customerPath(customerId)}/goals`, {}, signal);
}

export function getFilters(
  customerId: string,
  signal?: AbortSignal,
): Promise<FiltersResponse> {
  return getJson(`${customerPath(customerId)}/filters`, {}, signal);
}
