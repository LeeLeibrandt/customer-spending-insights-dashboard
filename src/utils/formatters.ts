const LOCALE = 'en-ZA';

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function formatPercentageChange(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: 'exceptZero',
  }).format(value / 100);
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function formatMonth(isoMonth: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoMonth}-01T00:00:00Z`));
}
