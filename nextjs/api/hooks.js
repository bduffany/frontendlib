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
export function useApiRequest(route, _a) {
    var query = (_a === void 0 ? {} : _a).query;
    var request = useMemo(function () { return function () { return api.request(route, { query: query }); }; }, [
        route,
        query,
    ]);
    var _b = useAsync(request), pending = _b.pending, value = _b.value, error = _b.error;
    useEffect(function () {
        if (error) {
            throw error;
        }
    }, [error]);
    return { loading: pending, data: value === null || value === void 0 ? void 0 : value.data };
}
//# sourceMappingURL=hooks.js.map