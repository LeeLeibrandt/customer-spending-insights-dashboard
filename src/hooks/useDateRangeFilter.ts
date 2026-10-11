import { useCallback, useState } from 'react';
import type { DateRange } from '../types/common';
import { isDateRangeReversed } from '../utils/periods';

const EMPTY_DATE_RANGE: DateRange = { startDate: '', endDate: '' };

export function useDateRangeFilter(onApply?: () => void) {
  const [dateRange, setDateRange] = useState(EMPTY_DATE_RANGE);
  const [appliedDateRange, setAppliedDateRange] = useState(EMPTY_DATE_RANGE);

  const changeDateRange = useCallback(
    (nextDateRange: DateRange) => {
      setDateRange(nextDateRange);

      if (!isDateRangeReversed(nextDateRange)) {
        setAppliedDateRange(nextDateRange);
        onApply?.();
      }
    },
    [onApply],
  );

  return { dateRange, appliedDateRange, changeDateRange };
}
