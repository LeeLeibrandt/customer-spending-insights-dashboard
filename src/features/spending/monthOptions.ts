import type { SelectOption } from '../../types/components';

export const DEFAULT_TREND_MONTHS = 12;

export const MONTH_OPTIONS: SelectOption<string>[] = [6, 12, 24].map(
  (months) => ({ value: String(months), label: `Last ${months} months` }),
);
