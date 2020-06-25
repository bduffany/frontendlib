import { api } from './client';
import { useMemo, useEffect } from 'react';
import useAsync from '../../react/hooks/useAsync';

/**
 * Hook that supports making GET requests to a Next.js API endpoint.
 *
 * @param route
 * @param options \{
 *  query: query params.
 *  throwErrors: whether to throw errors. If true, then
 *      errors will bubble up to the ErrorContext, where they can
 *      be handled by a default handler.
 *
 * @see {ErrorContext}
 * }
 */
export function useApiRequest(
  route: string,
  { query }: { query?: Record<string, any>; throwErrors?: boolean } = {}
) {
  const request = useMemo(() => () => api.request(route, { query }), [
    route,
    query,
  ]);
  const { pending, value, error } = useAsync(request);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { loading: pending, data: value?.data };
}
