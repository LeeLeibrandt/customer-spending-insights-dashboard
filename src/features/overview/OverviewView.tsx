import { useState } from 'react';
import { Box } from '@mui/material';
import { PageHeader } from '../../components/layout/PageHeader';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import { SelectField } from '../../components/SelectField';
import { useFilters } from '../../hooks/useFilters';
import type { OverviewViewProps } from '../../types/components';
import { DEFAULT_PERIOD } from '../../utils/periods';
import { CategorySpendingCard } from './CategorySpendingCard';
import { MonthlySpendingCard } from './MonthlySpendingCard';
import { overviewStyles } from './overviewStyles';
import { RecentTransactionsCard } from './RecentTransactionsCard';
import { SpendingSummaryCards } from './SpendingSummaryCards';

export function OverviewView({
  title,
  description,
  onViewTransactions,
}: OverviewViewProps) {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const { data: filters } = useFilters();

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        action={
          filters && (
            <SelectField
              label="Period"
              value={period}
              options={filters.dateRangePresets}
              onChange={setPeriod}
              icon={CalendarTodayOutlined}
            />
          )
        }
      />
      <SpendingSummaryCards period={period} />
      <Box sx={overviewStyles.contentGrid}>
        <MonthlySpendingCard />
        <CategorySpendingCard period={period} />
        <Box sx={overviewStyles.fullWidth}>
          <RecentTransactionsCard onViewAll={onViewTransactions} />
        </Box>
      </Box>
    </>
  );
}
