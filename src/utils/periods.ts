import type { DateRange } from '../types/common';
import { Period } from '../types/enums';
import { addDays, countDaysInclusive, isIsoDate } from './dates';

export const DEFAULT_PERIOD = Period.ThirtyDays;

const PERIOD_LENGTH_IN_DAYS: Record<Period, number> = {
  [Period.SevenDays]: 7,
  [Period.ThirtyDays]: 30,
  [Period.NinetyDays]: 90,
  [Period.OneYear]: 365,
};

export function isPeriod(value: unknown): value is Period {
  return Object.values(Period).includes(value as Period);
}

export function getPeriodDateRange(period: Period, today: string): DateRange {
  return {
    startDate: addDays(today, -(PERIOD_LENGTH_IN_DAYS[period] - 1)),
    endDate: today,
  };
}

export function getPreviousDateRange(range: DateRange): DateRange {
  const length = countDaysInclusive(range.startDate, range.endDate);
  const endDate = addDays(range.startDate, -1);

  return {
    startDate: addDays(endDate, -(length - 1)),
    endDate,
  };
}

export function isValidDateRange(range: DateRange): boolean {
  return (
    isIsoDate(range.startDate) &&
    isIsoDate(range.endDate) &&
    range.startDate <= range.endDate
  );
}

export function isDateRangeReversed(range: DateRange): boolean {
  return (
    range.startDate !== '' &&
    range.endDate !== '' &&
    range.startDate > range.endDate
  );
}
