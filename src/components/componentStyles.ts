import type { SxProps, Theme } from '@mui/material/styles';
import { colors } from '../styles/colors';

export const componentStyles = {
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    p: 2.5,
    border: `1px solid ${colors.border}`,
    borderRadius: 3,
  },
  statCardHeading: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },
  statCardIcon: {
    display: 'grid',
    placeItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 2,
    bgcolor: colors.iconSurface,
    color: 'text.secondary',
  },
  statCardLabel: {
    fontWeight: 500,
  },
  statCardValue: {
    fontSize: '1.75rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    fontVariantNumeric: 'tabular-nums',
  },
  changeIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.5,
  },
  changeValue: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.25,
    fontWeight: 600,
  },
  changeIncrease: {
    color: 'primary.main',
  },
  changeDecrease: {
    color: colors.success,
  },
  selectField: {
    minWidth: 200,
    width: { xs: '100%', sm: 'auto' },
  },
  filterBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 2,
  },
  dateRangeFields: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    width: { xs: '100%', sm: 'auto' },
  },
  clearDatesButton: {
    height: 40,
    whiteSpace: 'nowrap',
  },
  dateField: {
    minWidth: 170,
    width: { xs: '100%', sm: 'auto' },
  },
  selectFieldIcon: {
    color: 'text.secondary',
  },
  sectionCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: { xs: 2, sm: 2.5 },
    border: `1px solid ${colors.border}`,
    borderRadius: 3,
  },
  sectionCardHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
  },
  sectionCardTitle: {
    fontSize: '1.05rem',
    fontWeight: 600,
  },
  categoryIcon: {
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: 2,
    bgcolor: colors.iconSurface,
  },
  selectOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },
  progressTrack: {
    height: 6,
    my: 0.75,
    borderRadius: 3,
    bgcolor: 'action.hover',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  skeleton: {
    borderRadius: 3,
  },
  visuallyHidden: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    p: 0,
    m: -1,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    whiteSpace: 'nowrap',
    border: 0,
  },
  tableContainer: {
    overflowX: 'auto',
    '&:focus-visible': {
      outline: `2px solid ${colors.brand.redStrong}`,
      outlineOffset: 2,
    },
  },
  pagination: {
    '& .MuiTablePagination-toolbar': {
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 1,
      px: { xs: 0, sm: 2 },
    },
    '& .MuiTablePagination-spacer': {
      display: { xs: 'none', sm: 'block' },
    },
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
      m: 0,
    },
  },
  tableHeadCell: {
    color: 'text.secondary',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  merchantCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    minWidth: 180,
  },
  merchantName: {
    fontWeight: 500,
  },
  amountCell: {
    fontWeight: 600,
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
} satisfies Record<string, SxProps<Theme>>;
