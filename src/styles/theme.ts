import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.brand.blue,
    },
    secondary: {
      main: colors.brand.red,
      contrastText: colors.text.onRed,
    },
    background: {
      default: colors.background.page,
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
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
});
