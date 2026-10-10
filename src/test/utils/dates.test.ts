import { describe, expect, it } from 'vitest';
import {
  addDays,
  addMonths,
  countDaysInclusive,
  getDaysInMonth,
  isIsoDate,
  parseIsoDate,
  toIsoDateFromTimestamp,
} from '../../utils/dates';

describe('isIsoDate', () => {
  it('accepts real calendar dates, including leap days', () => {
    expect(isIsoDate('2024-09-16')).toBe(true);
    expect(isIsoDate('2024-02-29')).toBe(true);
  });

  it('rejects impossible dates and other formats', () => {
    expect(isIsoDate('2023-02-29')).toBe(false);
    expect(isIsoDate('2024-13-01')).toBe(false);
    expect(isIsoDate('2024-9-16')).toBe(false);
    expect(isIsoDate('16/09/2024')).toBe(false);
    expect(isIsoDate('')).toBe(false);
  });
});

describe('parseIsoDate', () => {
  it('throws for an invalid date', () => {
    expect(() => parseIsoDate('2024-02-30')).toThrow(RangeError);
  });
});

describe('addDays', () => {
  it('moves across month, year, and leap-day boundaries', () => {
    expect(addDays('2024-09-16', -29)).toBe('2024-08-18');
    expect(addDays('2023-12-31', 1)).toBe('2024-01-01');
    expect(addDays('2024-02-28', 1)).toBe('2024-02-29');
  });
});

describe('countDaysInclusive', () => {
  it('counts both the start and end dates', () => {
    expect(countDaysInclusive('2024-09-16', '2024-09-16')).toBe(1);
    expect(countDaysInclusive('2024-08-18', '2024-09-16')).toBe(30);
  });
});

describe('getDaysInMonth', () => {
  it('handles short months and leap years', () => {
    expect(getDaysInMonth('2024-09-16')).toBe(30);
    expect(getDaysInMonth('2024-02-01')).toBe(29);
    expect(getDaysInMonth('2023-02-01')).toBe(28);
  });
});

describe('addMonths', () => {
  it('moves across year boundaries', () => {
    expect(addMonths('2024-09', -11)).toBe('2023-10');
    expect(addMonths('2024-12', 1)).toBe('2025-01');
  });

  it('throws for an invalid month', () => {
    expect(() => addMonths('2024-9', 1)).toThrow(RangeError);
  });
});

describe('toIsoDateFromTimestamp', () => {
  it('returns the UTC calendar date', () => {
    expect(toIsoDateFromTimestamp('2024-09-16T23:30:00Z')).toBe('2024-09-16');
    expect(toIsoDateFromTimestamp('2024-09-17T00:30:00+02:00')).toBe(
      '2024-09-16',
    );
  });
});
