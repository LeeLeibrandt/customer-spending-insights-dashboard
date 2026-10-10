import { ApiError } from './apiError';

const API_BASE_URL = '/api';

function buildUrl(path: string, query: object): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const search = params.toString();
  return `${API_BASE_URL}${path}${search ? `?${search}` : ''}`;
}

export async function getJson<T>(
  path: string,
  query: object = {},
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(buildUrl(path, query), { signal });

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  return (await response.json()) as T;
}
