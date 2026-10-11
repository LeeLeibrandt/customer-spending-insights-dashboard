import { memo } from 'react';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import { Box } from '@mui/material';
import { DateRangeFields } from '../../components/DateRangeFields';
import { SelectField } from '../../components/SelectField';
import type { TransactionFiltersProps } from '../../types/components';
import { componentStyles } from '../../components/componentStyles';

export const TransactionFilters = memo(function TransactionFilters({
  categoryOptions,
  category,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
}: TransactionFiltersProps) {
  return (
    <Box sx={componentStyles.filterBar}>
      <SelectField
        label="Category"
        value={category}
        options={categoryOptions}
        onChange={onCategoryChange}
        icon={CategoryOutlined}
      />
      <DateRangeFields value={dateRange} onChange={onDateRangeChange} />
    </Box>
  );
});
