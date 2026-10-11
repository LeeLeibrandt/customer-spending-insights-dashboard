import type { SxProps, Theme } from '@mui/material/styles';

export const overviewStyles = {
  summaryGrid: {
    display: 'grid',
    gap: 2,
    gridTemplateColumns: {
      xs: 'minmax(0, 1fr)',
      sm: 'repeat(2, minmax(0, 1fr))',
      lg: 'repeat(4, minmax(0, 1fr))',
    },
  },
  summarySkeleton: {
    height: 148,
    borderRadius: 3,
  },
} satisfies Record<string, SxProps<Theme>>;
