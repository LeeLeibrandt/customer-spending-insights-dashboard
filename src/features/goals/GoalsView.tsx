import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { PageHeader } from '../../components/layout/PageHeader';
import { RequestContent } from '../../components/request/RequestContent';
import { useApiRequest } from '../../hooks/useApiRequest';
import { useFilters } from '../../hooks/useFilters';
import {
  DASHBOARD_CUSTOMER_ID,
  getSpendingGoals,
} from '../../services/spendingInsightsService';
import type { ViewProps } from '../../types/components';
import { GoalCard } from './GoalCard';
import { goalsStyles } from '../../styles/goalsStyles';

const requestGoals = (signal: AbortSignal) =>
  getSpendingGoals(DASHBOARD_CUSTOMER_ID, signal);

export function GoalsView({ title, description }: ViewProps) {
  const result = useApiRequest(requestGoals);
  const { data: filters } = useFilters();

  const categoriesByName = useMemo(
    () =>
      new Map(
        (filters?.categories ?? []).map((category) => [
          category.name,
          category,
        ]),
      ),
    [filters],
  );

  return (
    <>
      <PageHeader title={title} description={description} />
      <RequestContent
        result={result}
        errorMessage="Your spending goals could not be loaded."
      >
        {(data) =>
          data.goals.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              You have no monthly budgets yet.
            </Typography>
          ) : (
            <Box sx={goalsStyles.grid}>
              {data.goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  category={categoriesByName.get(goal.category)}
                />
              ))}
            </Box>
          )
        }
      </RequestContent>
    </>
  );
}
