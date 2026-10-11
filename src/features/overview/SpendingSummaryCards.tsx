import { useCallback } from 'react';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import CreditCardOutlined from '@mui/icons-material/CreditCardOutlined';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import { Box, Skeleton } from '@mui/material';
import { componentStyles } from '../../components/componentStyles';
import { RequestContent } from '../../components/RequestContent';
import { StatCard } from '../../components/StatCard';
import { useApiRequest } from '../../hooks/useApiRequest';
import {
  DASHBOARD_CURRENCY,
  DASHBOARD_CUSTOMER_ID,
  getSpendingSummary,
} from '../../services/spendingInsightsService';
import type { SpendingSummaryCardsProps } from '../../types/components';
import { formatCurrency } from '../../utils/formatters';
import { overviewStyles } from './overviewStyles';

const SUMMARY_CARD_COUNT = 4;
const SUMMARY_CARD_HEIGHT = 148;

const summarySkeleton = (
  <Box sx={overviewStyles.summaryGrid} aria-busy="true">
    {Array.from({ length: SUMMARY_CARD_COUNT }, (_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        height={SUMMARY_CARD_HEIGHT}
        sx={componentStyles.skeleton}
      />
    ))}
  </Box>
);

export function SpendingSummaryCards({ period }: SpendingSummaryCardsProps) {
  const requestSummary = useCallback(
    (signal: AbortSignal) =>
      getSpendingSummary(DASHBOARD_CUSTOMER_ID, { period }, signal),
    [period],
  );
  const result = useApiRequest(requestSummary);

  return (
    <RequestContent
      result={result}
      errorMessage="Your spending summary could not be loaded."
      loadingFallback={summarySkeleton}
    >
      {(summary) => (
        <Box sx={overviewStyles.summaryGrid}>
          <StatCard
            icon={AccountBalanceWalletOutlined}
            label="Total spent"
            value={formatCurrency(summary.totalSpent, DASHBOARD_CURRENCY)}
            change={summary.comparedToPrevious.spentChange}
          />
          <StatCard
            icon={SwapHoriz}
            label="Transactions"
            value={String(summary.transactionCount)}
            change={summary.comparedToPrevious.transactionChange}
          />
          <StatCard
            icon={CreditCardOutlined}
            label="Average transaction"
            value={formatCurrency(
              summary.averageTransaction,
              DASHBOARD_CURRENCY,
            )}
          />
          <StatCard
            icon={CategoryOutlined}
            label="Top category"
            value={summary.topCategory || 'None'}
          />
        </Box>
      )}
    </RequestContent>
  );
}
