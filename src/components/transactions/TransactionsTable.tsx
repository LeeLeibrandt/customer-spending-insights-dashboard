import { memo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import type { TransactionsTableProps } from '../../types/components';
import { componentStyles } from '../../styles/componentStyles';
import { TransactionRow } from './TransactionRow';

const COLUMNS = ['Date', 'Merchant', 'Category', 'Payment method'];

export const TransactionsTable = memo(function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  return (
    <Box
      sx={componentStyles.tableContainer}
      role="region"
      aria-label="Transactions table"
      tabIndex={0}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {COLUMNS.map((column) => (
              <TableCell key={column} sx={componentStyles.tableHeadCell}>
                {column}
              </TableCell>
            ))}
            <TableCell align="right" sx={componentStyles.tableHeadCell}>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
});
