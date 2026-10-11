import { memo } from 'react';
import { Box } from '@mui/material';
import { DASHBOARD_CURRENCY } from '../../services/spendingInsightsService';
import type { MonthlySpendingProps } from '../../types/components';
import { formatCurrency, formatMonth } from '../../utils/formatters';
import { overviewStyles } from './overviewStyles';

export const MonthlySpendingTable = memo(function MonthlySpendingTable({
  trends,
}: MonthlySpendingProps) {
  return (
    <Box component="table" sx={overviewStyles.visuallyHidden}>
      <caption>Monthly spending</caption>
      <thead>
        <tr>
          <th scope="col">Month</th>
          <th scope="col">Total spent</th>
          <th scope="col">Transactions</th>
          <th scope="col">Average transaction</th>
        </tr>
      </thead>
      <tbody>
        {trends.map((trend) => (
          <tr key={trend.month}>
            <th scope="row">{formatMonth(trend.month)}</th>
            <td>{formatCurrency(trend.totalSpent, DASHBOARD_CURRENCY)}</td>
            <td>{trend.transactionCount}</td>
            <td>
              {formatCurrency(trend.averageTransaction, DASHBOARD_CURRENCY)}
            </td>
          </tr>
        ))}
      </tbody>
    </Box>
  );
});
