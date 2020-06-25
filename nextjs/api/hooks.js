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
    var query = (_a === void 0 ? {} : _a).query;
    var request = react_1.useMemo(function () { return function () { return client_1.api.request(route, { query: query }); }; }, [
        route,
        query,
    ]);
    var _b = useAsync_1["default"](request), pending = _b.pending, value = _b.value, error = _b.error;
    react_1.useEffect(function () {
        if (error) {
            throw error;
        }
    }, [error]);
    return { loading: pending, data: value === null || value === void 0 ? void 0 : value.data };
}
exports.useApiRequest = useApiRequest;
//# sourceMappingURL=hooks.js.map