import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { App } from './app/App';
import { theme } from './styles/theme';
import { CustomerProvider } from './components/CustomerProvider';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('The application root element could not be found.');
}

const { startMocking } = await import('./mocks/browser');
await startMocking();

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </ThemeProvider>
  </StrictMode>,
);
