import { Box, Typography } from '@mui/material';
import type { PageHeaderProps } from '../../types/components';
import { layoutStyles } from './layoutStyles';

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <Box sx={layoutStyles.pageHeader}>
      <Box>
        <Typography component="h1" variant="h1">
          {title}
        </Typography>
        <Typography color="text.secondary" sx={layoutStyles.pageDescription}>
          {description}
        </Typography>
      </Box>
      {action}
    </Box>
  );
}
