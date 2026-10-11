import { Button, Typography } from '@mui/material';
import { RequestContent } from '../../components/RequestContent';
import { SectionCard } from '../../components/SectionCard';
import { TransactionsTable } from '../../components/TransactionsTable';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CUSTOMER_ID,
  getTransactions,
} from '../../services/spendingInsightsService';
import type { RecentTransactionsCardProps } from '../../types/components';

const RECENT_TRANSACTION_LIMIT = 5;

const requestRecentTransactions = (signal: AbortSignal) =>
  getTransactions(
    DASHBOARD_CUSTOMER_ID,
    { limit: RECENT_TRANSACTION_LIMIT },
    signal,
  );

export function RecentTransactionsCard({
  onViewAll,
}: RecentTransactionsCardProps) {
  const result = useApiRequest(requestRecentTransactions);

  return (
    <RequestContent
      result={result}
      errorMessage="Your recent transactions could not be loaded."
    >
      {(data) => (
        <SectionCard
          title="Recent transactions"
          action={
            <Button size="small" onClick={onViewAll}>
              View all
            </Button>
          }
        >
          {data.transactions.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No transactions yet.
            </Typography>
          ) : (
            <TransactionsTable transactions={data.transactions} />
          )}
        </SectionCard>
      )}
    </RequestContent>
  );
}
