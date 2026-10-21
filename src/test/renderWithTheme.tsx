import type { ReactElement } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { CustomerContext } from '../hooks/useCustomer';
import { MOCK_CUSTOMER } from '../mocks/data/customer';
import { theme } from '../styles/theme';

const TEST_CUSTOMER = { ...MOCK_CUSTOMER, totalSpent: 0 };

export function renderWithTheme(ui: ReactElement) {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomerContext.Provider value={TEST_CUSTOMER}>
        {ui}
      </CustomerContext.Provider>
    </ThemeProvider>,
  );
}
