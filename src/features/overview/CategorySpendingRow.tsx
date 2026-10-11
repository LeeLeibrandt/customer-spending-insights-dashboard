import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { CategoryIcon } from '../../components/CategoryIcon';
import { DASHBOARD_CURRENCY } from '../../services/spendingInsightsService';
import type { CategorySpendingRowProps } from '../../types/components';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { overviewStyles } from './overviewStyles';

export const CategorySpendingRow = memo(function CategorySpendingRow({
  category,
}: CategorySpendingRowProps) {
  return (
    <Box component="li" sx={overviewStyles.categoryRow}>
      <CategoryIcon icon={category.icon} color={category.color} />
      <Box sx={overviewStyles.categoryDetails}>
        <Box sx={overviewStyles.categoryHeading}>
          <Typography variant="body2" sx={overviewStyles.categoryName}>
            {category.name}
          </Typography>
          <Typography variant="body2" sx={overviewStyles.categoryAmount}>
            {formatCurrency(category.amount, DASHBOARD_CURRENCY)}
          </Typography>
        </Box>
        <Box sx={overviewStyles.categoryBarTrack}>
          <Box
            sx={[
              overviewStyles.categoryBar,
              {
                width: `${category.percentage}%`,
                bgcolor: category.color,
              },
            ]}
          />
        </Box>
        <Box sx={overviewStyles.categoryMeta}>
          <Typography variant="caption" color="text.secondary">
            {category.transactionCount === 1
              ? '1 transaction'
              : `${category.transactionCount} transactions`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatPercentage(category.percentage)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});
