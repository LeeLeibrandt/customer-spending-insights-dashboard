import { describe, expect, it } from 'vitest';
import {
  formatCurrency,
  formatDate,
  formatInitials,
  formatMonth,
  formatPercentage,
  formatPercentageChange,
  formatTransactionCount,
} from '../../utils/formatters';
import { WHITESPACE_PATTERN } from '../../utils/patterns';

function normaliseSpaces(value: string): string {
  return value.replace(WHITESPACE_PATTERN, ' ');
}

describe('formatCurrency', () => {
  it('formats rand amounts', () => {
    expect(normaliseSpaces(formatCurrency(15420.5, 'ZAR'))).toBe('R 15 420,50');
    expect(normaliseSpaces(formatCurrency(0, 'ZAR'))).toBe('R 0,00');
  });
});

describe('formatPercentage', () => {
  it('formats a percentage with one decimal place', () => {
    expect(formatPercentage(29.4)).toBe('29,4%');
    expect(formatPercentage(96.72)).toBe('96,7%');
  });
});

describe('formatPercentageChange', () => {
  it('shows the direction of the change', () => {
    expect(formatPercentageChange(12.5)).toBe('+12,5%');
    expect(formatPercentageChange(-3.2)).toBe('-3,2%');
    expect(formatPercentageChange(0)).toBe('0,0%');
  });
});

describe('formatDate', () => {
  it('formats a calendar date', () => {
    expect(formatDate('2023-01-15')).toBe('15 Jan 2023');
  });
});

describe('formatMonth', () => {
  it('formats a calendar month', () => {
    expect(formatMonth('2024-06')).toBe('Jun 2024');
  });
});

describe('formatInitials', () => {
  it('uses the first letters of the first two names', () => {
    expect(formatInitials('John Doe')).toBe('JD');
    expect(formatInitials('nomsa  dlamini mokoena')).toBe('ND');
  });
});

describe('formatTransactionCount', () => {
  it('uses the singular for one transaction', () => {
    expect(formatTransactionCount(1)).toBe('1 transaction');
    expect(formatTransactionCount(15)).toBe('15 transactions');
  });
});
