import { memo } from 'react';
import TrendingDown from '@mui/icons-material/TrendingDown';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { Box, Typography } from '@mui/material';
import type { ChangeIndicatorProps } from '../types/components';
import { formatPercentageChange } from '../utils/formatters';
import { componentStyles } from './componentStyles';

export const ChangeIndicator = memo(function ChangeIndicator({
  value,
  label,
}: ChangeIndicatorProps) {
  const isIncrease = value > 0;
  const Icon = isIncrease ? TrendingUp : TrendingDown;

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={componentStyles.changeIndicator}
    >
      <Box
        component="span"
        sx={[
          componentStyles.changeValue,
          isIncrease
            ? componentStyles.changeIncrease
            : componentStyles.changeDecrease,
        ]}
      >
        {value !== 0 && <Icon fontSize="inherit" aria-hidden="true" />}
        {formatPercentageChange(value)}
      </Box>
      {label}
    </Typography>
  );
});
