import { lazy, Suspense, useCallback } from 'react';
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { componentStyles } from '../../components/componentStyles';
import { RequestContent } from '../../components/RequestContent';
import { SectionCard } from '../../components/SectionCard';
import { useApiRequest } from '../../hooks/useApiRequest';
import { useCustomer } from '../../hooks/useCustomer';
import {
  DASHBOARD_CUSTOMER_ID,
  getSpendingByCategory,
  getTransactions,
} from '../../services/spendingInsightsService';
import { Period } from '../../types/enums';
import type { Transaction } from '../../types/transactions';
import { formatCurrency, formatMonth } from '../../utils/formatters';
import { getPeriodSpendingBuckets } from './periodSpending';

const PAGE_SIZE = 100;
const CHART_HEIGHT = 280;
const MonthlySpendingChart = lazy(() =>
  import('./MonthlySpendingChart').then((module) => ({
    default: module.MonthlySpendingChart,
  })),
);

const formatDay = (date: string) =>
  new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));

const PERIOD_LABELS: Record<Period, string> = {
  [Period.SevenDays]: 'Last 7 days · daily',
  [Period.ThirtyDays]: 'Last 30 days · weekly',
  [Period.NinetyDays]: 'Last 90 days · weekly',
  [Period.OneYear]: 'Last year · monthly',
};

export function PeriodSpendingCard({ period }: { period: Period }) {
  const { currency: DASHBOARD_CURRENCY } = useCustomer();
  const requestSpending = useCallback(
    async (signal: AbortSignal) => {
      const { dateRange } = await getSpendingByCategory(
        DASHBOARD_CUSTOMER_ID,
        { period },
        signal,
      );
      const transactions: Transaction[] = [];
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const page = await getTransactions(
          DASHBOARD_CUSTOMER_ID,
          { ...dateRange, limit: PAGE_SIZE, offset },
          signal,
        );
        transactions.push(...page.transactions);
        hasMore = page.pagination.hasMore;
        offset += page.transactions.length;
      }

      return getPeriodSpendingBuckets(period, dateRange, transactions);
    },
    [period],
  );
  const result = useApiRequest(requestSpending);
  const formatLabel = period === Period.OneYear ? formatMonth : formatDay;

  return (
    <RequestContent
      result={result.isLoading ? { ...result, data: null } : result}
      errorMessage="Your spending trend could not be loaded."
    >
      {(buckets) => (
        <SectionCard
          title="Spending over time"
          subtitle={PERIOD_LABELS[period]}
        >
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                height={CHART_HEIGHT}
                sx={componentStyles.skeleton}
              />
            }
          >
            <MonthlySpendingChart trends={buckets} formatLabel={formatLabel} />
          </Suspense>
          <Box sx={componentStyles.visuallyHidden}>
            <Table size="small" aria-label="Spending over time">
              <TableHead>
                <TableRow>
                  <TableCell>Period starting</TableCell>
                  <TableCell>Total spent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {buckets.map((bucket) => (
                  <TableRow key={bucket.month}>
                    <TableCell>{formatLabel(bucket.month)}</TableCell>
                    <TableCell>
                      {formatCurrency(bucket.totalSpent, DASHBOARD_CURRENCY)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </SectionCard>
      )}
    </RequestContent>
  );
}
