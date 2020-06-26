"use strict";
exports.__esModule = true;
exports.UnhandledRejectionContextProvider = exports.UnhandledRejectionContext = exports.ErrorContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var useEventListener_1 = tslib_1.__importDefault(require("../hooks/useEventListener"));
exports.ErrorContext = react_1.createContext(null);
/**
 * Error boundary that catches synchronously thrown exceptions as well as unhandled promise
 * rejections.
 */
var ErrorContextProvider = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorContextProvider, _super);
    function ErrorContextProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { caughtException: null };
        return _this;
    }
    ErrorContextProvider.prototype.onComponentDidCatch = function (e) {
        this.setState({ caughtException: e });
    };
    ErrorContextProvider.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(exports.UnhandledRejectionContext.Consumer, null, function (unhandledRejection) { return (react_1["default"].createElement(ErrorContextProviderInner, { rejection: unhandledRejection, exception: _this.state.caughtException }, _this.props.children)); }));
    };
    return ErrorContextProvider;
}(react_1.Component));
exports["default"] = ErrorContextProvider;
function ErrorContextProviderInner(_a) {
    var exception = _a.exception, rejection = _a.rejection, children = _a.children;
    var _b = react_1.useState(null), error = _b[0], setError = _b[1];
    react_1.useEffect(function () {
        setError(exception);
    }, [exception]);
    react_1.useEffect(function () {
        setError(rejection);
    }, [rejection]);
    return (react_1["default"].createElement(exports.ErrorContext.Provider, { value: { error: error, clearError: function () { return setError(null); } } }, children));
}
exports.UnhandledRejectionContext = react_1.createContext(null);
/**
 * Allows accessing the last unhandled promise rejection via
 * UnhandledRejectionContext.
 *
 * This enables the capability of providing generic error handlers at the
 * top level of the app.
 */
function UnhandledRejectionContextProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState(null), unhandledRejection = _b[0], setUnhandledRejection = _b[1];
    var onUnhandledRejection = react_1.useCallback(function (e) { return setUnhandledRejection(e); }, []);
    useEventListener_1["default"](window, 'unhandledrejection', onUnhandledRejection);
    return (react_1["default"].createElement(exports.UnhandledRejectionContext.Provider, { value: unhandledRejection }, children));
}
exports.UnhandledRejectionContextProvider = UnhandledRejectionContextProvider;
//# sourceMappingURL=error.js.map