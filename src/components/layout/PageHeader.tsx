import { Box, Typography } from '@mui/material';
import type { PageHeaderProps } from '../../types/components';
import { layoutStyles } from './layoutStyles';

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <Box sx={layoutStyles.pageHeader}>
      <Typography component="h1" variant="h1">
        {title}
      </Typography>
      <Typography color="text.secondary" sx={layoutStyles.pageDescription}>
        {description}
      </Typography>
    </Box>
  );
}
