import { useMemo } from 'react';
import useAsync from './useAsync';

/**
 * Performs a fetch call if the input is non-null and returns
 * an object with the state of the promise returned by the
 * fetch call.
 *
 * @param input
 * @param init
 */
export default function useFetch(
  input: RequestInfo,
  init?: RequestInit | undefined
) {
  const doFetch = useMemo(() => {
    if (!input) return null;

    return async () => {
      const response = await fetch(input, init);
      const contentType = response.headers.get('content-type') || '';
      const data =
        contentType == 'application/json' ||
        contentType.startsWith('application/json;')
          ? response.json()
          : response.text();

      return data;
    };
  }, [input, init]);

  const { pending, value, error } = useAsync(doFetch);

  return { loading: pending, data: value, error: error };
}
