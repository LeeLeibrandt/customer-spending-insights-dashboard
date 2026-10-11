import { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { RequestContent } from '../../components/RequestContent';
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
  const result = useApiRequest(requestCategories);

  return (
    <RequestContent
      result={result}
      errorMessage="Your spending by category could not be loaded."
    >
      {(data) => (
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
      )}
    </RequestContent>
  );
}
