import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { CategoryIcon } from '../../components/CategoryIcon';
import { DASHBOARD_CURRENCY } from '../../services/spendingInsightsService';
import type { CategorySpendingRowProps } from '../../types/components';
import {
  formatCurrency,
  formatPercentage,
  formatTransactionCount,
} from '../../utils/formatters';
import { spendingStyles } from './spendingStyles';

export const CategorySpendingRow = memo(function CategorySpendingRow({
  category,
}: CategorySpendingRowProps) {
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
        <Box sx={spendingStyles.categoryBarTrack}>
          <Box
            sx={[
              spendingStyles.categoryBar,
              {
                width: `${category.percentage}%`,
                bgcolor: category.color,
              },
            ]}
          />
        </Box>
        <Box sx={spendingStyles.categoryMeta}>
          <Typography variant="caption" color="text.secondary">
            {formatTransactionCount(category.transactionCount)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatPercentage(category.percentage)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});
