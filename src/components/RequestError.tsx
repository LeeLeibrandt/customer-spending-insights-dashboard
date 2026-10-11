import { Alert, Button } from '@mui/material';
import type { RequestErrorProps } from '../types/components';

export function RequestError({ message, onRetry }: RequestErrorProps) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={onRetry}>
          Try again
        </Button>
      }
    >
      {message}
    </Alert>
  );
}
