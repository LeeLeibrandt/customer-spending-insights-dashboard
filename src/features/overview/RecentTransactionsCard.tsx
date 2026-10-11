import {
  Box,
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { RequestError } from '../../components/RequestError';
import { SectionCard } from '../../components/SectionCard';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CUSTOMER_ID,
  getTransactions,
} from '../../services/spendingInsightsService';
import type { RecentTransactionsCardProps } from '../../types/components';
import { overviewStyles } from './overviewStyles';
import { TransactionRow } from './TransactionRow';

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
  const { data, error, retry } = useApiRequest(requestRecentTransactions);

  if (error) {
    return (
      <Box sx={overviewStyles.recentTransactions}>
        <RequestError
          message="Your recent transactions could not be loaded."
          onRetry={retry}
        />
      </Box>
    );
  }

  if (!data) {
    return (
      <Skeleton
        variant="rectangular"
        sx={[overviewStyles.cardSkeleton, overviewStyles.recentTransactions]}
        aria-busy="true"
      />
    );
  }

  return (
    <Box sx={overviewStyles.recentTransactions}>
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
          <Box sx={overviewStyles.tableContainer}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={overviewStyles.tableHeadCell}>Date</TableCell>
                  <TableCell sx={overviewStyles.tableHeadCell}>
                    Merchant
                  </TableCell>
                  <TableCell sx={overviewStyles.tableHeadCell}>
                    Category
                  </TableCell>
                  <TableCell sx={overviewStyles.tableHeadCell}>
                    Payment method
                  </TableCell>
                  <TableCell align="right" sx={overviewStyles.tableHeadCell}>
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.transactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </SectionCard>
    </Box>
  );
}
