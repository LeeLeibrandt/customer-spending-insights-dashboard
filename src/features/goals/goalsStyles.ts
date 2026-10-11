import type { SxProps, Theme } from '@mui/material/styles';

export const goalsStyles = {
  grid: {
    display: 'grid',
    gap: 2,
    gridTemplateColumns: {
      xs: 'minmax(0, 1fr)',
      md: 'repeat(2, minmax(0, 1fr))',
    },
  },
  amounts: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  spent: {
    fontSize: '1.25rem',
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums',
  },
  statusLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.5,
    px: 1,
    py: 0.25,
    borderRadius: 2,
    fontSize: '0.8125rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
} satisfies Record<string, SxProps<Theme>>;
