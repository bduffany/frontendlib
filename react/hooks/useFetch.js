"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = require("react");
var useAsync_1 = tslib_1.__importDefault(require("./useAsync"));
/**
 * Performs a fetch call if the input is non-null and returns
 * an object with the state of the promise returned by the
 * fetch call.
 *
 * @param input
 * @param init
 */
function useFetch(input, init) {
    var _this = this;
    var doFetch = react_1.useMemo(function () {
        if (!input)
            return null;
        return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var response, contentType, data;
            return tslib_1.__generator(this, function (_a) {
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
    var _a = useAsync_1["default"](doFetch), pending = _a.pending, value = _a.value, error = _a.error;
    return { loading: pending, data: value, error: error };
}
exports["default"] = useFetch;
//# sourceMappingURL=useFetch.js.map