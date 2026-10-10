import { useCallback, useEffect, useState } from 'react';
import type { ApiRequestResult, ApiRequestState } from '../types/apiRequest';

export function useApiRequest<T>(
  request: (signal: AbortSignal) => Promise<T>,
): ApiRequestResult<T> {
  const [state, setState] = useState<ApiRequestState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, error: null, isLoading: true }));

    request(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) {
          setState({ data, error: null, isLoading: false });
        }
      },
      (error: unknown) => {
        if (!controller.signal.aborted) {
          setState({
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
            isLoading: false,
          });
        }
      },
    );

    return () => {
      controller.abort();
    };
  }, [request, attempt]);

  const retry = useCallback(() => {
    setAttempt((current) => current + 1);
  }, []);

  return { ...state, retry };
}
