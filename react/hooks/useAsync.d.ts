/**
 * Hook that invokes the given async function (if not already invoked) and
 * returns the state of its returned promise.
 *
 * @param asyncFunction
 * @return \{
 *   pending: whether the promise is still pending.
 *   value: the resolved value if the promise resolved, otherwise null.
 *   error: the rejected value if the promise rejected, otherwise null.
 * }
 */
export default function useAsync<T, E = any>(asyncFunction: (() => Promise<T>) | null): {
    pending: boolean;
    value: T | null;
    error: E | null;
};
