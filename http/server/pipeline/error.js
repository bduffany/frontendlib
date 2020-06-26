"use strict";
exports.__esModule = true;
exports.baseErrorHandler = exports.HttpStatusError = void 0;
var tslib_1 = require("tslib");
var scripts_1 = require("../response/scripts");
var DEFAULT_MESSAGES = {
    400: 'Invalid request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    500: 'Internal server error'
};
/**
 * An error that should result in the given HTTP status code
 * being sent back to the client.
 */
var HttpStatusError = /** @class */ (function (_super) {
    tslib_1.__extends(HttpStatusError, _super);
    function HttpStatusError(code, message, _a) {
        if (message === void 0) { message = ''; }
        var _b = (_a === void 0 ? {} : _a).responseContentType, responseContentType = _b === void 0 ? 'application/json' : _b;
        var _this = _super.call(this, "" + (message || DEFAULT_MESSAGES[code] || 'Unknown error')) || this;
        _this.code = code;
        _this.responseContentType = responseContentType;
        return _this;
    }
    return HttpStatusError;
}(Error));
exports.HttpStatusError = HttpStatusError;
/**
 * Framework-level error handler.
 */
exports.baseErrorHandler = function (_, res, e) {
    console.error(e);
    var responseContentType = (typeof e === 'object' && (e === null || e === void 0 ? void 0 : e.responseContentType)) ||
        (res.get && res.get('content-type')) ||
        null;
    if (!res.headersSent) {
        if (e instanceof HttpStatusError) {
            res.status(e.code);
        }
        else {
            res.status(500);
        }
    }
    if (responseContentType === 'application/json') {
        res.json({
            error: {
                message: (e === null || e === void 0 ? void 0 : e.message) || (e === null || e === void 0 ? void 0 : e.toString()) || 'Internal server error'
            }
        });
        return;
    }
    // Clear the existing page content to show the error instead.
    if (responseContentType === 'text/html') {
        res.write(scripts_1.CLEAR_BODY_SCRIPT);
    }
    var message = (e === null || e === void 0 ? void 0 : e.message) || (e === null || e === void 0 ? void 0 : e.toString()) || 'Internal server error';
    res.send(message);
};
//# sourceMappingURL=error.js.map