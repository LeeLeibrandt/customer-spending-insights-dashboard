import { Period } from '../../types/enums';
import type { DateRangePreset } from '../../types/filters';

export const MOCK_DATE_RANGE_PRESETS: DateRangePreset[] = [
  { label: 'Last 7 days', value: Period.SevenDays },
  { label: 'Last 30 days', value: Period.ThirtyDays },
  { label: 'Last 90 days', value: Period.NinetyDays },
  { label: 'Last year', value: Period.OneYear },
];
