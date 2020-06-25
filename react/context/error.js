import { __extends } from "tslib";
import React, { Component, useState, useCallback, createContext, useEffect, } from 'react';
import useEventListener from '../hooks/useEventListener';
export var ErrorContext = createContext(null);
/**
 * Error boundary that catches synchronously thrown exceptions as well as unhandled promise
 * rejections.
 */
var ErrorContextProvider = /** @class */ (function (_super) {
    __extends(ErrorContextProvider, _super);
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
        return (React.createElement(UnhandledRejectionContext.Consumer, null, function (unhandledRejection) { return (React.createElement(ErrorContextProviderInner, { rejection: unhandledRejection, exception: _this.state.caughtException }, _this.props.children)); }));
    };
    return ErrorContextProvider;
}(Component));
export default ErrorContextProvider;
function ErrorContextProviderInner(_a) {
    var exception = _a.exception, rejection = _a.rejection, children = _a.children;
    var _b = useState(null), error = _b[0], setError = _b[1];
    useEffect(function () {
        setError(exception);
    }, [exception]);
    useEffect(function () {
        setError(rejection);
    }, [rejection]);
    return (React.createElement(ErrorContext.Provider, { value: { error: error, clearError: function () { return setError(null); } } }, children));
}
export var UnhandledRejectionContext = createContext(null);
/**
 * Allows accessing the last unhandled promise rejection via
 * UnhandledRejectionContext.
 *
 * This enables the capability of providing generic error handlers at the
 * top level of the app.
 */
export function UnhandledRejectionContextProvider(_a) {
    var children = _a.children;
    var _b = useState(null), unhandledRejection = _b[0], setUnhandledRejection = _b[1];
    var onUnhandledRejection = useCallback(function (e) { return setUnhandledRejection(e); }, []);
    useEventListener(window, 'unhandledrejection', onUnhandledRejection);
    return (React.createElement(UnhandledRejectionContext.Provider, { value: unhandledRejection }, children));
}
//# sourceMappingURL=error.js.map