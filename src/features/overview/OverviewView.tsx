import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { PageHeader } from '../../components/layout/PageHeader';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import { SelectField } from '../../components/SelectField';
import { useFilters } from '../../hooks/useFilters';
import type { OverviewViewProps } from '../../types/components';
import { DEFAULT_PERIOD } from '../../utils/periods';
import { CategorySpendingCard } from '../spending/CategorySpendingCard';
import { MonthlySpendingCard } from '../spending/MonthlySpendingCard';
import { DEFAULT_TREND_MONTHS } from '../spending/monthOptions';
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
  const categoryQuery = useMemo(() => ({ period }), [period]);

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
        <MonthlySpendingCard months={DEFAULT_TREND_MONTHS} />
        <CategorySpendingCard query={categoryQuery} />
        <Box sx={overviewStyles.fullWidth}>
          <RecentTransactionsCard onViewAll={onViewTransactions} />
        </Box>
      </Box>
    </>
  );
}
