import { memo } from 'react';
import { Box } from '@mui/material';
import type { GoalStatusLabelProps } from '../../types/components';
import { GOAL_STATUS_DETAILS } from './goalStatusDetails';
import { goalsStyles } from '../../styles/goalsStyles';

export const GoalStatusLabel = memo(function GoalStatusLabel({
  status,
}: GoalStatusLabelProps) {
  const { label, icon: Icon, color, tint } = GOAL_STATUS_DETAILS[status];

  return (
    <Box
      component="span"
      sx={[goalsStyles.statusLabel, { color, bgcolor: tint }]}
    >
      <Icon fontSize="inherit" aria-hidden="true" />
      {label}
    </Box>
  );
});
