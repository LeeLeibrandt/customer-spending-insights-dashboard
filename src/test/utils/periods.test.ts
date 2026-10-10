import { describe, expect, it } from 'vitest';
import { Period } from '../../types/enums';
import {
  getPeriodDateRange,
  getPreviousDateRange,
  isPeriod,
  isValidDateRange,
} from '../../utils/periods';

describe('getPeriodDateRange', () => {
  it.each([
    [Period.SevenDays, '2024-09-10'],
    [Period.ThirtyDays, '2024-08-18'],
    [Period.NinetyDays, '2024-06-19'],
    [Period.OneYear, '2023-09-18'],
  ] as const)('includes today in the %s period', (period, startDate) => {
    expect(getPeriodDateRange(period, '2024-09-16')).toEqual({
      startDate,
      endDate: '2024-09-16',
    });
  });
});

describe('getPreviousDateRange', () => {
  it('returns the same number of days immediately before the range', () => {
    expect(
      getPreviousDateRange({ startDate: '2024-08-18', endDate: '2024-09-16' }),
    ).toEqual({ startDate: '2024-07-19', endDate: '2024-08-17' });
  });

  it('handles a single-day range', () => {
    expect(
      getPreviousDateRange({ startDate: '2024-03-01', endDate: '2024-03-01' }),
    ).toEqual({ startDate: '2024-02-29', endDate: '2024-02-29' });
  });
});

describe('isPeriod', () => {
  it('accepts only contract periods', () => {
    expect(isPeriod('90d')).toBe(true);
    expect(isPeriod('14d')).toBe(false);
    expect(isPeriod(undefined)).toBe(false);
  });
});

describe('isValidDateRange', () => {
  it('accepts a start on or before the end', () => {
    expect(
      isValidDateRange({ startDate: '2024-09-01', endDate: '2024-09-01' }),
    ).toBe(true);
  });

  it('rejects a reversed range or an invalid date', () => {
    expect(
      isValidDateRange({ startDate: '2024-09-02', endDate: '2024-09-01' }),
    ).toBe(false);
    expect(
      isValidDateRange({ startDate: '2024-02-30', endDate: '2024-03-01' }),
    ).toBe(false);
  });
});
