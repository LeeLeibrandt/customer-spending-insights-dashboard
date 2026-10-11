import { memo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { componentStyles } from '../../components/componentStyles';
import { DASHBOARD_CURRENCY } from '../../services/spendingInsightsService';
import type { MonthlySpendingTableProps } from '../../types/components';
import { formatCurrency, formatMonth } from '../../utils/formatters';

const COLUMNS = ['Total spent', 'Transactions', 'Average transaction'];

export const MonthlySpendingTable = memo(function MonthlySpendingTable({
  trends,
  isVisible = false,
}: MonthlySpendingTableProps) {
  return (
    <Box
      sx={
        isVisible
          ? componentStyles.tableContainer
          : componentStyles.visuallyHidden
      }
    >
      <Table size="small" aria-label="Monthly spending">
        <TableHead>
          <TableRow>
            <TableCell sx={componentStyles.tableHeadCell}>Month</TableCell>
            {COLUMNS.map((column) => (
              <TableCell
                key={column}
                align="right"
                sx={componentStyles.tableHeadCell}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {trends.map((trend) => (
            <TableRow key={trend.month}>
              <TableCell component="th" scope="row" sx={componentStyles.noWrap}>
                {formatMonth(trend.month)}
              </TableCell>
              <TableCell align="right" sx={componentStyles.amountCell}>
                {formatCurrency(trend.totalSpent, DASHBOARD_CURRENCY)}
              </TableCell>
              <TableCell align="right">{trend.transactionCount}</TableCell>
              <TableCell align="right" sx={componentStyles.amountCell}>
                {formatCurrency(trend.averageTransaction, DASHBOARD_CURRENCY)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
});
