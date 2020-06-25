import { __awaiter, __generator } from "tslib";
import { useState, useEffect } from 'react';
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
export default function useAsync(asyncFunction) {
    var _this = this;
    var _a = useState(false), pending = _a[0], setPending = _a[1];
    var _b = useState(null), value = _b[0], setValue = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    useEffect(function () {
        setValue(null);
        setError(null);
        if (!asyncFunction) {
            setPending(false);
            return;
        }
        setPending(true);
        var cancelled = false;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var value_1, error_1;
            return __generator(this, function (_a) {
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
//# sourceMappingURL=useAsync.js.map