import { ISO_DATE_PATTERN, ISO_MONTH_PATTERN } from './patterns';

const MILLISECONDS_PER_DAY = 86_400_000;

function toUtcDate(isoDate: string): Date {
  const [year = NaN, month = NaN, day = NaN] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function isIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  const date = toUtcDate(value);
  return !Number.isNaN(date.getTime()) && toIsoDate(date) === value;
}

export function parseIsoDate(isoDate: string): Date {
  if (!isIsoDate(isoDate)) {
    throw new RangeError(`"${isoDate}" is not a valid YYYY-MM-DD date.`);
  }

  return toUtcDate(isoDate);
}

export function addDays(isoDate: string, days: number): string {
  const date = parseIsoDate(isoDate);
  date.setUTCDate(date.getUTCDate() + days);
  return toIsoDate(date);
}

export function countDaysInclusive(startDate: string, endDate: string): number {
  const difference =
    parseIsoDate(endDate).getTime() - parseIsoDate(startDate).getTime();
  return Math.round(difference / MILLISECONDS_PER_DAY) + 1;
}

export function getDaysInMonth(isoDate: string): number {
  const date = parseIsoDate(isoDate);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
}

export function getDayOfMonth(isoDate: string): number {
  return parseIsoDate(isoDate).getUTCDate();
}

export function toIsoMonth(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function addMonths(isoMonth: string, months: number): string {
  const match = ISO_MONTH_PATTERN.exec(isoMonth);

  if (!match) {
    throw new RangeError(`"${isoMonth}" is not a valid YYYY-MM month.`);
  }

  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
  date.setUTCMonth(date.getUTCMonth() + months);
  return toIsoDate(date).slice(0, 7);
}

export function toIsoDateFromTimestamp(timestamp: string): string {
  return toIsoDate(new Date(timestamp));
}

export function getTodayIsoDate(): string {
  return toIsoDate(new Date());
}
