import type { SelectOption } from '../../types/components';
import { TransactionSortOrder } from '../../types/enums';

export const SORT_OPTIONS: SelectOption<TransactionSortOrder>[] = [
  { value: TransactionSortOrder.DateDesc, label: 'Newest first' },
  { value: TransactionSortOrder.DateAsc, label: 'Oldest first' },
  { value: TransactionSortOrder.AmountDesc, label: 'Highest amount' },
  { value: TransactionSortOrder.AmountAsc, label: 'Lowest amount' },
];
