import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { ApiError } from '../../services/apiError';
import { getJson } from '../../services/httpClient';
import { server } from '../server';

describe('getJson', () => {
  it('returns the parsed response body', async () => {
    server.use(
      http.get('/api/customers/12345/profile', () =>
        HttpResponse.json({ name: 'John Doe' }),
      ),
    );

    await expect(getJson('/customers/12345/profile')).resolves.toEqual({
      name: 'John Doe',
    });
  });

  it('sends defined query parameters only', async () => {
    let requestUrl = '';
    server.use(
      http.get('/api/customers/12345/transactions', ({ request }) => {
        requestUrl = request.url;
        return HttpResponse.json({});
      }),
    );

    await getJson('/customers/12345/transactions', {
      limit: 20,
      category: 'Groceries',
      startDate: undefined,
    });

    const params = new URL(requestUrl).searchParams;
    expect(params.get('limit')).toBe('20');
    expect(params.get('category')).toBe('Groceries');
    expect(params.has('startDate')).toBe(false);
  });

  it('throws an ApiError with the status of a failed response', async () => {
    server.use(
      http.get('/api/customers/99999/profile', () =>
        HttpResponse.json({}, { status: 404 }),
      ),
    );

    const error = await getJson('/customers/99999/profile').catch(
      (reason: unknown) => reason,
    );

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 404 });
  });

  it('rejects when the request is aborted', async () => {
    server.use(
      http.get('/api/customers/12345/goals', () => HttpResponse.json({})),
    );
    const controller = new AbortController();
    controller.abort();

    await expect(
      getJson('/customers/12345/goals', {}, controller.signal),
    ).rejects.toMatchObject({ name: 'AbortError' });
  });
});
