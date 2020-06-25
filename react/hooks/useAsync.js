"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = require("react");
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
function useAsync(asyncFunction) {
    var _this = this;
    var _a = react_1.useState(false), pending = _a[0], setPending = _a[1];
    var _b = react_1.useState(null), value = _b[0], setValue = _b[1];
    var _c = react_1.useState(null), error = _c[0], setError = _c[1];
    react_1.useEffect(function () {
        setValue(null);
        setError(null);
        if (!asyncFunction) {
            setPending(false);
            return;
        }
        setPending(true);
        var cancelled = false;
        (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var value_1, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, asyncFunction()];
                    case 1:
                        value_1 = _a.sent();
                        if (!cancelled)
                            setValue(value_1);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        if (!cancelled)
                            setError(error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        if (!cancelled)
                            setPending(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
        return function () {
            cancelled = true;
        };
    }, [asyncFunction]);
    return { pending: pending, value: value, error: error };
}
exports["default"] = useAsync;
//# sourceMappingURL=useAsync.js.map