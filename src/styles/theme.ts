import { createTheme } from '@mui/material/styles';
import '@mui/x-date-pickers/themeAugmentation';
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
  components: {
    MuiTextField: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiPickersTextField: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiPickerDay: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          '&:hover': {
            backgroundColor: colors.brand.redTint,
          },
          '&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
            backgroundColor: colors.brand.redStrong,
            color: colors.text.onRed,
            fontWeight: 600,
          },
          '&.MuiPickerDay-today:not(.Mui-selected)': {
            outline: 'none',
            color: colors.brand.redStrong,
            fontWeight: 600,
          },
        },
      },
    },
  },
});
