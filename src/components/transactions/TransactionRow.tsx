import { memo } from 'react';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { useCustomer } from '../../hooks/useCustomer';
import type { TransactionRowProps } from '../../types/components';
import { toIsoDateFromTimestamp } from '../../utils/dates';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { CategoryIcon } from '../indicators/CategoryIcon';
import { componentStyles } from '../../styles/componentStyles';

export const TransactionRow = memo(function TransactionRow({
  transaction,
}: TransactionRowProps) {
  const { currency: DASHBOARD_CURRENCY } = useCustomer();
  return (
    <TableRow>
      <TableCell sx={componentStyles.noWrap}>
        {formatDate(toIsoDateFromTimestamp(transaction.date))}
      </TableCell>
      <TableCell>
        <Box sx={componentStyles.merchantCell}>
          <CategoryIcon
            icon={transaction.icon}
            color={transaction.categoryColor}
          />
          <Box>
            <Typography variant="body2" sx={componentStyles.merchantName}>
              {transaction.merchant}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {transaction.description}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={componentStyles.noWrap}>{transaction.category}</TableCell>
      <TableCell sx={componentStyles.noWrap}>
        {transaction.paymentMethod}
      </TableCell>
      <TableCell align="right" sx={componentStyles.amountCell}>
        {formatCurrency(transaction.amount, DASHBOARD_CURRENCY)}
      </TableCell>
    </TableRow>
  );
});
