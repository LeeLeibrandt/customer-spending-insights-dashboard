export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function fromCents(cents: number): number {
  return cents / 100;
}

export function sumAmounts(amounts: Iterable<number>): number {
  let totalInCents = 0;

  for (const amount of amounts) {
    totalInCents += toCents(amount);
  }

  return fromCents(totalInCents);
}

export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function calculateAverage(total: number, count: number): number {
  return count === 0 ? 0 : roundTo(total / count, 2);
}

export function calculatePercentage(
  part: number,
  total: number,
  decimals = 1,
): number {
  return total === 0 ? 0 : roundTo((part / total) * 100, decimals);
}

export function calculatePercentageChange(
  current: number,
  previous: number,
): number {
  return previous === 0
    ? 0
    : roundTo(((current - previous) / previous) * 100, 1);
}
