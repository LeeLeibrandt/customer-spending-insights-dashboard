import { lazy, Suspense, useCallback } from 'react';
import { Skeleton } from '@mui/material';
import { componentStyles } from '../../styles/componentStyles';
import { RequestContent } from '../../components/request/RequestContent';
import { SectionCard } from '../../components/cards/SectionCard';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CUSTOMER_ID,
  getSpendingTrends,
} from '../../services/spendingInsightsService';
import type { MonthlySpendingCardProps } from '../../types/components';
import { MonthlySpendingTable } from './MonthlySpendingTable';

const CHART_HEIGHT = 280;

const MonthlySpendingChart = lazy(() =>
  import('./MonthlySpendingChart').then((module) => ({
    default: module.MonthlySpendingChart,
  })),
);

export function MonthlySpendingCard({
  months,
  showTable = false,
}: MonthlySpendingCardProps) {
  const requestTrends = useCallback(
    (signal: AbortSignal) =>
      getSpendingTrends(DASHBOARD_CUSTOMER_ID, { months }, signal),
    [months],
  );
  const result = useApiRequest(requestTrends);

  return (
    <RequestContent
      result={result}
      errorMessage="Your monthly spending could not be loaded."
    >
      {(data) => (
        <SectionCard
          title="Monthly spending"
          subtitle={`Last ${months} months`}
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
            <MonthlySpendingChart trends={data.trends} />
          </Suspense>
          <MonthlySpendingTable trends={data.trends} isVisible={showTable} />
        </SectionCard>
      )}
    </RequestContent>
  );
}
