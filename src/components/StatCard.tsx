import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import type { StatCardProps } from '../types/components';
import { ChangeIndicator } from './ChangeIndicator';
import { componentStyles } from './componentStyles';

const CHANGE_LABEL = 'vs previous period';

export const StatCard = memo(function StatCard({
  icon: Icon,
  label,
  value,
  change,
}: StatCardProps) {
  return (
    <Box sx={componentStyles.statCard}>
      <Box sx={componentStyles.statCardHeading}>
        <Box sx={componentStyles.statCardIcon}>
          <Icon fontSize="small" />
        </Box>
        <Typography variant="body2" sx={componentStyles.statCardLabel}>
          {label}
        </Typography>
      </Box>
      <Typography sx={componentStyles.statCardValue}>{value}</Typography>
      {change !== undefined && (
        <ChangeIndicator value={change} label={CHANGE_LABEL} />
      )}
    </Box>
  );
});
