import { useState } from 'react';
import { Box } from '@mui/material';
import { PageHeader } from '../../components/layout/PageHeader';
import { PeriodSelect } from '../../components/PeriodSelect';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CUSTOMER_ID,
  getFilters,
} from '../../services/spendingInsightsService';
import type { ViewProps } from '../../types/components';
import { DEFAULT_PERIOD } from '../../utils/periods';
import { CategorySpendingCard } from './CategorySpendingCard';
import { MonthlySpendingCard } from './MonthlySpendingCard';
import { overviewStyles } from './overviewStyles';
import { SpendingSummaryCards } from './SpendingSummaryCards';

const requestFilters = (signal: AbortSignal) =>
  getFilters(DASHBOARD_CUSTOMER_ID, signal);

export function OverviewView({ title, description }: ViewProps) {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const { data: filters } = useApiRequest(requestFilters);

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        action={
          filters && (
            <PeriodSelect
              value={period}
              presets={filters.dateRangePresets}
              onChange={setPeriod}
            />
          )
        }
      />
      <SpendingSummaryCards period={period} />
      <Box sx={overviewStyles.contentGrid}>
        <MonthlySpendingCard />
        <CategorySpendingCard period={period} />
      </Box>
    </>
  );
}
