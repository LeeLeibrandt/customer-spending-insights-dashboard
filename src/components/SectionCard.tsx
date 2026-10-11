import { useId } from 'react';
import { Box, Typography } from '@mui/material';
import type { SectionCardProps } from '../types/components';
import { componentStyles } from './componentStyles';

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  const headingId = useId();

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      sx={componentStyles.sectionCard}
    >
      <Box>
        <Typography
          id={headingId}
          component="h2"
          sx={componentStyles.sectionCardTitle}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  );
}
