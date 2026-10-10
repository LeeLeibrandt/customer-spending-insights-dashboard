import type { SxProps, Theme } from '@mui/material/styles';
import { colors } from '../../styles/colors';

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 64;

export const layoutStyles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  header: {
    width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
    ml: { md: `${SIDEBAR_WIDTH}px` },
    bgcolor: 'background.default',
    color: 'text.primary',
  },
  headerToolbar: {
    minHeight: HEADER_HEIGHT,
    px: { xs: 2, md: 4 },
    gap: 1,
  },
  menuButton: {
    display: { md: 'none' },
  },
  headerSpacer: {
    flexGrow: 1,
  },
  customer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },
  customerAvatar: {
    width: 36,
    height: 36,
    bgcolor: colors.brand.redTint,
    color: 'primary.main',
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  customerName: {
    fontWeight: 600,
    lineHeight: 1.2,
  },
  sidebar: {
    width: { md: SIDEBAR_WIDTH },
    flexShrink: { md: 0 },
  },
  sidebarPaper: {
    width: SIDEBAR_WIDTH,
    boxSizing: 'border-box',
    bgcolor: colors.background.page,
    borderRight: `1px solid ${colors.border}`,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.25,
    minHeight: HEADER_HEIGHT,
    px: 3,
  },
  brandMark: {
    width: 28,
    height: 28,
  },
  brandName: {
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '-0.01em',
    color: 'text.primary',
  },
  navigationList: {
    px: 1.5,
    pt: 1,
  },
  navigationItem: {
    mb: 0.5,
    borderRadius: 1,
    color: 'text.secondary',
    '& .MuiListItemIcon-root': {
      minWidth: 36,
      color: 'inherit',
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      bgcolor: colors.brand.redTint,
      color: 'primary.main',
    },
    '&.Mui-focusVisible': {
      outline: `2px solid ${colors.brand.redStrong}`,
      outlineOffset: -2,
    },
  },
  navigationLabel: {
    fontWeight: 500,
  },
  content: {
    flexGrow: 1,
    minWidth: 0,
    px: { xs: 2, md: 4 },
    pb: 4,
  },
  contentOffset: {
    minHeight: HEADER_HEIGHT,
  },
  pageHeader: {
    pt: 1,
    pb: { xs: 3, md: 4 },
  },
  pageDescription: {
    mt: 0.5,
  },
} satisfies Record<string, SxProps<Theme>>;
