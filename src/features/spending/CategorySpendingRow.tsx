import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { CategoryIcon } from '../../components/indicators/CategoryIcon';
import { ProgressBar } from '../../components/indicators/ProgressBar';
import { useCustomer } from '../../hooks/useCustomer';
import type { CategorySpendingRowProps } from '../../types/components';
import {
  formatCount,
  formatCurrency,
  formatPercentage,
} from '../../utils/formatters';
import { spendingStyles } from '../../styles/spendingStyles';

export const CategorySpendingRow = memo(function CategorySpendingRow({
  category,
}: CategorySpendingRowProps) {
  const { currency: DASHBOARD_CURRENCY } = useCustomer();
  return (
    <Box component="li" sx={spendingStyles.categoryRow}>
      <CategoryIcon icon={category.icon} color={category.color} />
      <Box sx={spendingStyles.categoryDetails}>
        <Box sx={spendingStyles.categoryHeading}>
          <Typography variant="body2" sx={spendingStyles.categoryName}>
            {category.name}
          </Typography>
          <Typography variant="body2" sx={spendingStyles.categoryAmount}>
            {formatCurrency(category.amount, DASHBOARD_CURRENCY)}
          </Typography>
        </Box>
        <ProgressBar value={category.percentage} color={category.color} />
        <Box sx={spendingStyles.categoryMeta}>
          <Typography variant="caption" color="text.secondary">
            {formatCount(category.transactionCount, 'transaction')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatPercentage(category.percentage)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});
