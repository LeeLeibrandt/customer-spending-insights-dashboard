import {
  DASHBOARD_CUSTOMER_ID,
  getFilters,
} from '../services/spendingInsightsService';
import { useApiRequest } from './useApiRequest';

const requestFilters = (signal: AbortSignal) =>
  getFilters(DASHBOARD_CUSTOMER_ID, signal);

export function useFilters() {
  return useApiRequest(requestFilters);
}
