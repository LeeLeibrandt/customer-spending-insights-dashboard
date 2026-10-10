import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useApiRequest } from '../../hooks/useApiRequest';

describe('useApiRequest', () => {
  it('is loading until the request resolves with data', async () => {
    const request = () => Promise.resolve('data');
    const { result } = renderHook(() => useApiRequest(request));

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toBe('data');
    expect(result.current.error).toBeNull();
  });

  it('exposes the error when the request fails', async () => {
    const failure = new Error('Request failed');
    const request = () => Promise.reject(failure);
    const { result } = renderHook(() => useApiRequest(request));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBe(failure);
    expect(result.current.data).toBeNull();
  });

  it('sends the request again on retry', async () => {
    const request = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('Request failed'))
      .mockResolvedValueOnce('data');
    const { result } = renderHook(() => useApiRequest(request));

    await waitFor(() => expect(result.current.error).not.toBeNull());
    result.current.retry();

    await waitFor(() => expect(result.current.data).toBe('data'));
    expect(result.current.error).toBeNull();
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('cancels the previous request and ignores its result when the request changes', async () => {
    const signals: AbortSignal[] = [];
    let resolveFirst: (value: string) => void = () => {};
    const firstRequest = (signal: AbortSignal) => {
      signals.push(signal);
      return new Promise<string>((resolve) => {
        resolveFirst = resolve;
      });
    };
    const secondRequest = () => Promise.resolve('second');

    const { result, rerender } = renderHook(
      ({ request }) => useApiRequest(request),
      { initialProps: { request: firstRequest } },
    );
    rerender({ request: secondRequest });

    await waitFor(() => expect(result.current.data).toBe('second'));
    resolveFirst('first');
    await Promise.resolve();

    expect(signals[0]?.aborted).toBe(true);
    expect(result.current.data).toBe('second');
  });

  it('cancels the request on unmount', () => {
    let requestSignal: AbortSignal | undefined;
    const request = (signal: AbortSignal) => {
      requestSignal = signal;
      return new Promise<never>(() => {});
    };
    const { unmount } = renderHook(() => useApiRequest(request));

    unmount();

    expect(requestSignal?.aborted).toBe(true);
  });
});
