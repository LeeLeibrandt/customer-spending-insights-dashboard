import type { ReactElement } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { theme } from '../styles/theme';

export function renderWithTheme(ui: ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>,
  );
}
