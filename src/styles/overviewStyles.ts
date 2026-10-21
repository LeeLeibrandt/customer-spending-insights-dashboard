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
  contentGrid: {
    display: 'grid',
    gap: 2,
    mt: 2,
    gridTemplateColumns: {
      xs: 'minmax(0, 1fr)',
      lg: 'minmax(0, 2fr) minmax(0, 1fr)',
    },
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
} satisfies Record<string, SxProps<Theme>>;
