import type { SxProps, Theme } from '@mui/material/styles';

export const transactionsStyles = {
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 2,
  },
} satisfies Record<string, SxProps<Theme>>;
