import { describe, expect, it } from 'vitest';
import {
  calculateAverage,
  calculatePercentage,
  calculatePercentageChange,
  roundTo,
  sumAmounts,
} from '../../utils/money';

describe('sumAmounts', () => {
  it('adds amounts without floating-point drift', () => {
    expect(sumAmounts([0.1, 0.2])).toBe(0.3);
    expect(sumAmounts([1250.3, 890.2, 680.45, 520.3, 450.8, 458.7])).toBe(
      4250.75,
    );
  });

  it('returns 0 for no amounts', () => {
    expect(sumAmounts([])).toBe(0);
  });
});

describe('roundTo', () => {
  it('rounds halves up', () => {
    expect(roundTo(1.005, 2)).toBe(1.01);
    expect(roundTo(29.45, 1)).toBe(29.5);
  });
});

describe('calculateAverage', () => {
  it('rounds to cents and handles no transactions', () => {
    expect(calculateAverage(4250.75, 47)).toBe(90.44);
    expect(calculateAverage(0, 0)).toBe(0);
  });
});

describe('calculatePercentage', () => {
  it('returns a rounded share and handles a zero total', () => {
    expect(calculatePercentage(1250.3, 4250.75)).toBe(29.4);
    expect(calculatePercentage(1450.8, 1500, 2)).toBe(96.72);
    expect(calculatePercentage(10, 0)).toBe(0);
  });
});

describe('calculatePercentageChange', () => {
  it('returns increases and decreases to one decimal place', () => {
    expect(calculatePercentageChange(112.5, 100)).toBe(12.5);
    expect(calculatePercentageChange(46, 47.52)).toBe(-3.2);
  });

  it('returns 0 when there is no previous value to compare', () => {
    expect(calculatePercentageChange(100, 0)).toBe(0);
  });
});
