import { useCallback } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { RequestError } from '../../components/RequestError';
import { SectionCard } from '../../components/SectionCard';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CURRENCY,
  DASHBOARD_CUSTOMER_ID,
  getSpendingByCategory,
} from '../../services/spendingInsightsService';
import type { CategorySpendingCardProps } from '../../types/components';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { CategorySpendingRow } from './CategorySpendingRow';
import { overviewStyles } from './overviewStyles';

export function CategorySpendingCard({ period }: CategorySpendingCardProps) {
  const requestCategories = useCallback(
    (signal: AbortSignal) =>
      getSpendingByCategory(DASHBOARD_CUSTOMER_ID, { period }, signal),
    [period],
  );
  const { data, error, retry } = useApiRequest(requestCategories);

  if (error) {
    return (
      <RequestError
        message="Your spending by category could not be loaded."
        onRetry={retry}
      />
    );
  }

  if (!data) {
    return (
      <Skeleton
        variant="rectangular"
        sx={overviewStyles.cardSkeleton}
        aria-busy="true"
      />
    );
  }

  return (
    <SectionCard
      title="Spending by category"
      subtitle={`${formatDate(data.dateRange.startDate)} to ${formatDate(data.dateRange.endDate)}`}
    >
      <Typography sx={overviewStyles.categoryTotal}>
        {formatCurrency(data.totalAmount, DASHBOARD_CURRENCY)}
      </Typography>
      {data.categories.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No spending in this period.
        </Typography>
      ) : (
        <Box component="ul" sx={overviewStyles.categoryList}>
          {data.categories.map((category) => (
            <CategorySpendingRow key={category.name} category={category} />
          ))}
        </Box>
      )}
    </SectionCard>
  );
}
