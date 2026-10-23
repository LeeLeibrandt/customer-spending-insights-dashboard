import { useCallback, useMemo, useState } from 'react';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import { Box, Typography } from '@mui/material';
import { componentStyles } from '../../styles/componentStyles';
import { DateRangeFields } from '../../components/inputs/DateRangeFields';
import { PageHeader } from '../../components/layout/PageHeader';
import { SelectField } from '../../components/inputs/SelectField';
import { useDateRangeFilter } from '../../hooks/useDateRangeFilter';
import { useFilters } from '../../hooks/useFilters';
import type { SelectOption, ViewProps } from '../../types/components';
import { Period, PeriodSelection } from '../../types/enums';
import { formatDate } from '../../utils/formatters';
import { DEFAULT_PERIOD } from '../../utils/periods';
import { CategorySpendingCard } from '../spending/CategorySpendingCard';
import { categoriesStyles } from '../../styles/categoriesStyles';

type PeriodOption = Period | PeriodSelection;

export function CategoriesView({ title, description }: ViewProps) {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const { data: filters } = useFilters();
  const { dateRange, appliedDateRange, changeDateRange, clearDateRange } =
    useDateRangeFilter();
  const hasCustomRange =
    appliedDateRange.startDate !== '' && appliedDateRange.endDate !== '';

  const query = useMemo(
    () => (hasCustomRange ? appliedDateRange : { period }),
    [hasCustomRange, appliedDateRange, period],
  );

  const periodOptions = useMemo<SelectOption<PeriodOption>[]>(() => {
    const presets = filters?.dateRangePresets ?? [];

    if (!hasCustomRange) {
      return presets;
    }

    return [
      ...presets,
      {
        value: PeriodSelection.CustomRange,
        label: `${formatDate(appliedDateRange.startDate)} – ${formatDate(appliedDateRange.endDate)}`,
      },
    ];
  }, [filters, hasCustomRange, appliedDateRange]);

  const changePeriod = useCallback(
    (nextPeriod: PeriodOption) => {
      if (nextPeriod === PeriodSelection.CustomRange) {
        return;
      }

      setPeriod(nextPeriod);
      clearDateRange();
    },
    [clearDateRange],
  );

  return (
    <>
      <PageHeader title={title} description={description} />
      <Box sx={componentStyles.filterBar}>
        {filters && (
          <SelectField<PeriodOption>
            label="Period"
            value={hasCustomRange ? PeriodSelection.CustomRange : period}
            options={periodOptions}
            onChange={changePeriod}
            icon={CalendarTodayOutlined}
          />
        )}
        <DateRangeFields value={dateRange} onChange={changeDateRange} />
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={categoriesStyles.rangeNote}
      >
        {hasCustomRange
          ? 'Showing your custom date range. Choose a period or clear the dates to use a preset again.'
          : 'Choose a period, or set both dates for a custom range.'}
      </Typography>
      <CategorySpendingCard query={query} />
    </>
  );
}
