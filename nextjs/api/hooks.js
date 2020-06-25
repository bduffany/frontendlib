"use strict";
exports.__esModule = true;
exports.useApiRequest = void 0;
var tslib_1 = require("tslib");
var client_1 = require("./client");
var react_1 = require("react");
var useAsync_1 = tslib_1.__importDefault(require("../../react/hooks/useAsync"));
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
function useApiRequest(route, _a) {
    var _b = _a === void 0 ? {} : _a, query = _b.query, _c = _b.enabled, enabled = _c === void 0 ? true : _c;
    var _d = react_1.useState(null), cacheBuster = _d[0], setCacheBuster = _d[1];
    var effectiveQuery = react_1.useMemo(function () { return (tslib_1.__assign(tslib_1.__assign({}, (query || {})), (cacheBuster ? { cacheBuster: cacheBuster } : {}))); }, [query, cacheBuster]);
    var request = react_1.useMemo(function () {
        return !enabled || !route
            ? null
            : function () {
                return client_1.api.request(route, {
                    query: effectiveQuery
                });
            };
    }, [route, query, enabled]);
    var _e = useAsync_1["default"](request), pending = _e.pending, value = _e.value, error = _e.error;
    react_1.useEffect(function () {
        if (error) {
            throw error;
        }
    }, [error]);
    var refresh = react_1.useMemo(function () { return function () { return setCacheBuster(new Date().getTime()); }; }, [
        setCacheBuster,
    ]);
    return { loading: pending, data: value === null || value === void 0 ? void 0 : value.data, refresh: refresh };
}
exports.useApiRequest = useApiRequest;
//# sourceMappingURL=hooks.js.map