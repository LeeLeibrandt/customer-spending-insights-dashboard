import { memo } from 'react';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { CategoryIcon } from '../../components/CategoryIcon';
import { DASHBOARD_CURRENCY } from '../../services/spendingInsightsService';
import type { TransactionRowProps } from '../../types/components';
import { toIsoDateFromTimestamp } from '../../utils/dates';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { overviewStyles } from './overviewStyles';

export const TransactionRow = memo(function TransactionRow({
  transaction,
}: TransactionRowProps) {
  return (
    <TableRow>
      <TableCell sx={overviewStyles.noWrap}>
        {formatDate(toIsoDateFromTimestamp(transaction.date))}
      </TableCell>
      <TableCell>
        <Box sx={overviewStyles.merchantCell}>
          <CategoryIcon
            icon={transaction.icon}
            color={transaction.categoryColor}
          />
          <Box>
            <Typography variant="body2" sx={overviewStyles.merchantName}>
              {transaction.merchant}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {transaction.description}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={overviewStyles.noWrap}>{transaction.category}</TableCell>
      <TableCell sx={overviewStyles.noWrap}>
        {transaction.paymentMethod}
      </TableCell>
      <TableCell align="right" sx={overviewStyles.amountCell}>
        {formatCurrency(transaction.amount, DASHBOARD_CURRENCY)}
      </TableCell>
    </TableRow>
  );
});
