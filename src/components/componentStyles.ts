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
  periodSelect: {
    minWidth: 200,
  },
  periodSelectIcon: {
    color: 'text.secondary',
  },
  sectionCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 2.5,
    border: `1px solid ${colors.border}`,
    borderRadius: 3,
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
} satisfies Record<string, SxProps<Theme>>;
