import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.brand.redStrong,
      contrastText: colors.text.onRed,
    },
    secondary: {
      main: colors.brand.blue,
    },
    background: {
      default: colors.background.surface,
      paper: colors.background.surface,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Instrument Sans", Arial, Helvetica, sans-serif',
    h1: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
  },
});
