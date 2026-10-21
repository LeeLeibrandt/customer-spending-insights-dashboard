import { memo } from 'react';
import { Box } from '@mui/material';
import type { ProgressBarProps } from '../../types/components';
import { componentStyles } from '../../styles/componentStyles';

const MAX_PERCENTAGE = 100;

export const ProgressBar = memo(function ProgressBar({
  value,
  color,
}: ProgressBarProps) {
  return (
    <Box sx={componentStyles.progressTrack} aria-hidden="true">
      <Box
        sx={[
          componentStyles.progressBar,
          { width: `${Math.min(value, MAX_PERCENTAGE)}%`, bgcolor: color },
        ]}
      />
    </Box>
  );
});
