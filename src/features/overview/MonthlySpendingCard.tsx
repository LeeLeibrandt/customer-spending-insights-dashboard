import { lazy, Suspense } from 'react';
import { Skeleton } from '@mui/material';
import { componentStyles } from '../../components/componentStyles';
import { RequestContent } from '../../components/RequestContent';
import { SectionCard } from '../../components/SectionCard';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CUSTOMER_ID,
  getSpendingTrends,
} from '../../services/spendingInsightsService';
import { MonthlySpendingTable } from './MonthlySpendingTable';

const CHART_HEIGHT = 280;

const MonthlySpendingChart = lazy(() =>
  import('./MonthlySpendingChart').then((module) => ({
    default: module.MonthlySpendingChart,
  })),
);

const requestTrends = (signal: AbortSignal) =>
  getSpendingTrends(DASHBOARD_CUSTOMER_ID, {}, signal);

export function MonthlySpendingCard() {
  const result = useApiRequest(requestTrends);

  return (
    <RequestContent
      result={result}
      errorMessage="Your monthly spending could not be loaded."
    >
      {(data) => (
        <SectionCard title="Monthly spending" subtitle="Last 12 months">
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                height={CHART_HEIGHT}
                sx={componentStyles.skeleton}
              />
            }
          >
            <MonthlySpendingChart trends={data.trends} />
          </Suspense>
          <MonthlySpendingTable trends={data.trends} />
        </SectionCard>
      )}
    </RequestContent>
  );
}
