import { Box, Container, Typography } from '@mui/material';

export function App() {
  return (
    <Box component="main" className="app-shell">
      <Container maxWidth="lg">
        <Typography component="h1" variant="h4" gutterBottom>
          Customer Spending Insights
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The dashboard foundation is ready. Customer spending views will be
          added next.
        </Typography>
      </Container>
    </Box>
  );
}
