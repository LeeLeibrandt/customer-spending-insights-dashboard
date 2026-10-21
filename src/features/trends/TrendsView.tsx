import { useCallback, useState } from 'react';
import DateRangeOutlined from '@mui/icons-material/DateRangeOutlined';
import { PageHeader } from '../../components/layout/PageHeader';
import { SelectField } from '../../components/inputs/SelectField';
import type { ViewProps } from '../../types/components';
import { MonthlySpendingCard } from '../spending/MonthlySpendingCard';
import { DEFAULT_TREND_MONTHS, MONTH_OPTIONS } from '../spending/monthOptions';

export function TrendsView({ title, description }: ViewProps) {
  const [months, setMonths] = useState(DEFAULT_TREND_MONTHS);

  const handleMonthsChange = useCallback(
    (value: string) => setMonths(Number(value)),
    [],
  );

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        action={
          <SelectField
            label="Months"
            value={String(months)}
            options={MONTH_OPTIONS}
            onChange={handleMonthsChange}
            icon={DateRangeOutlined}
          />
        }
      />
      <MonthlySpendingCard months={months} showTable />
    </>
  );
}
