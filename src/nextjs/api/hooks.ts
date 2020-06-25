import { api } from './client';
import { useState, useMemo, useEffect } from 'react';
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
  { query, enabled = true }: { query?: Record<string, any>; enabled?: boolean } = {}
) {
  const [cacheBuster, setCacheBuster] = useState<number | null>(null);
  const request = useMemo(
    () => (!enabled || !route) ? null : () =>
      api.request(route, {
        query: query || {},
      }),
    [route, query, enabled]
  );
  const { pending, value, error } = useAsync(request);
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  const refresh = useMemo(() => () => setCacheBuster(new Date().getTime()), [
    setCacheBuster,
  ]);

  return { loading: pending, data: value?.data, refresh };
}
