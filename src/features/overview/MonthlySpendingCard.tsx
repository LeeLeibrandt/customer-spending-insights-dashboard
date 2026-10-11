import { lazy, Suspense } from 'react';
import { Skeleton } from '@mui/material';
import { RequestError } from '../../components/RequestError';
import { SectionCard } from '../../components/SectionCard';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CUSTOMER_ID,
  getSpendingTrends,
} from '../../services/spendingInsightsService';
import { MonthlySpendingTable } from './MonthlySpendingTable';
import { overviewStyles } from './overviewStyles';

const MonthlySpendingChart = lazy(() =>
  import('./MonthlySpendingChart').then((module) => ({
    default: module.MonthlySpendingChart,
  })),
);

const requestTrends = (signal: AbortSignal) =>
  getSpendingTrends(DASHBOARD_CUSTOMER_ID, {}, signal);

export function MonthlySpendingCard() {
  const { data, error, retry } = useApiRequest(requestTrends);

  if (error) {
    return (
      <RequestError
        message="Your monthly spending could not be loaded."
        onRetry={retry}
      />
    );
  }

  if (!data) {
    return (
      <Skeleton
        variant="rectangular"
        sx={overviewStyles.cardSkeleton}
        aria-busy="true"
      />
    );
  }

  return (
    <SectionCard title="Monthly spending" subtitle="Last 12 months">
      <Suspense
        fallback={
          <Skeleton variant="rectangular" sx={overviewStyles.chartSkeleton} />
        }
      >
        <MonthlySpendingChart trends={data.trends} />
      </Suspense>
      <MonthlySpendingTable trends={data.trends} />
    </SectionCard>
  );
}
