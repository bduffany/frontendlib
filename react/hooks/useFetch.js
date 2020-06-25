import { __awaiter, __generator } from "tslib";
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
export default function useFetch(input, init) {
    var _this = this;
    var doFetch = useMemo(function () {
        if (!input)
            return null;
        return function () { return __awaiter(_this, void 0, void 0, function () {
            var response, contentType, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(input, init)];
                    case 1:
                        response = _a.sent();
                        contentType = response.headers.get('content-type') || '';
                        data = contentType == 'application/json' ||
                            contentType.startsWith('application/json;')
                            ? response.json()
                            : response.text();
                        return [2 /*return*/, data];
                }
            });
        }); };
    }, [input, init]);
    var _a = useAsync(doFetch), pending = _a.pending, value = _a.value, error = _a.error;
    return { loading: pending, data: value, error: error };
}
//# sourceMappingURL=useFetch.js.map