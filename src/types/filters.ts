import type { SpendingCategory } from './categories';
import type { Period } from './enums';

export interface DateRangePreset {
  label: string;
  value: Period;
}

export interface FiltersResponse {
  categories: SpendingCategory[];
  dateRangePresets: DateRangePreset[];
}
