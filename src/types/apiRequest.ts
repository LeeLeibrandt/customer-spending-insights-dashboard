export interface ApiRequestState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export interface ApiRequestResult<T> extends ApiRequestState<T> {
  retry: () => void;
}
