import type { SxProps, Theme } from '@mui/material/styles';

export const spendingStyles = {
  categoryTotal: {
    fontWeight: 700,
    fontSize: '1.25rem',
    fontVariantNumeric: 'tabular-nums',
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    m: 0,
    p: 0,
    listStyle: 'none',
  },
  categoryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },
  categoryDetails: {
    flexGrow: 1,
    minWidth: 0,
  },
  categoryHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 1,
  },
  categoryName: {
    fontWeight: 500,
  },
  categoryAmount: {
    fontWeight: 600,
    fontVariantNumeric: 'tabular-nums',
  },
  categoryBarTrack: {
    height: 6,
    my: 0.75,
    borderRadius: 3,
    bgcolor: 'action.hover',
    overflow: 'hidden',
  },
  categoryBar: {
    height: '100%',
    borderRadius: 3,
  },
  categoryMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 1,
  },
} satisfies Record<string, SxProps<Theme>>;
