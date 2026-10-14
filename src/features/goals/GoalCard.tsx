import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { CategoryIcon } from '../../components/CategoryIcon';
import { ProgressBar } from '../../components/ProgressBar';
import { SectionCard } from '../../components/SectionCard';
import { useCustomer } from '../../hooks/useCustomer';
import type { GoalCardProps } from '../../types/components';
import {
  formatCount,
  formatCurrency,
  formatPercentage,
} from '../../utils/formatters';
import { GoalStatusLabel } from './GoalStatusLabel';
import { goalsStyles } from './goalsStyles';

export const GoalCard = memo(function GoalCard({
  goal,
  category,
}: GoalCardProps) {
  const { currency: DASHBOARD_CURRENCY } = useCustomer();
  return (
    <SectionCard
      title={goal.category}
      subtitle={`${formatCount(goal.daysRemaining, 'day')} remaining`}
      action={<GoalStatusLabel status={goal.status} />}
    >
      <Box sx={goalsStyles.amounts}>
        {category && (
          <CategoryIcon icon={category.icon} color={category.color} />
        )}
        <Typography sx={goalsStyles.spent}>
          {formatCurrency(goal.currentSpent, DASHBOARD_CURRENCY)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          of {formatCurrency(goal.monthlyBudget, DASHBOARD_CURRENCY)}
        </Typography>
      </Box>
      <Box>
        <ProgressBar value={goal.percentageUsed} color={category?.color} />
        <Typography variant="caption" color="text.secondary">
          {formatPercentage(goal.percentageUsed)} used
        </Typography>
      </Box>
    </SectionCard>
  );
});
