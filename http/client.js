"use strict";
/**
 * Client for JSON-based Next.js APIs.
 */
exports.__esModule = true;
exports.HttpStatusError = void 0;
var tslib_1 = require("tslib");
var isomorphic_unfetch_1 = tslib_1.__importDefault(require("isomorphic-unfetch"));
/**
 * Generic HTTP client that provides a simpler interface on top of
 * fetch.
 */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.request = function (url, _a) {
        var _b = _a === void 0 ? {} : _a, baseUrl = _b.baseUrl, method = _b.method, body = _b.body, headers = _b.headers, query = _b.query;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headers_, _i, _c, key, effectiveUrl, optionalBody, requestInfo, requestInit, response, responseContentType;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        headers_ = {};
                        for (_i = 0, _c = Object.keys(headers || {}); _i < _c.length; _i++) {
                            key = _c[_i];
                            headers_[key.toLowerCase()] = headers[key];
                        }
                        if (method === undefined && body) {
                            method = 'POST';
                        }
                        if (method === 'POST' && !(headers && !headers['content-type'])) {
                            headers_['content-type'] = 'application/json';
                        }
                        effectiveUrl = url instanceof URL ? url : new URL(url, baseUrl);
                        if (query instanceof URLSearchParams) {
                            query.forEach(function (value, key) {
                                effectiveUrl.searchParams.append(key, value);
                            });
                        }
                        optionalBody = body ? { body: JSON.stringify(body) } : {};
                        requestInfo = effectiveUrl.toString();
                        requestInit = tslib_1.__assign(tslib_1.__assign({ method: method }, optionalBody), { headers: headers_ });
                        return [4 /*yield*/, isomorphic_unfetch_1["default"](requestInfo, requestInit)];
                    case 1:
                        response = _d.sent();
                        if (response.status >= 400) {
                            throw new HttpStatusError(requestInfo, requestInit, response);
                        }
                        responseContentType = response.headers.get('content-type') || '';
                        if (responseContentType === 'application/json' ||
                            responseContentType.startsWith('application/json;')) {
                            return [2 /*return*/, response.json()];
                        }
                        return [2 /*return*/, response.text()];
                }
            });
        });
    };
    return HttpClient;
}());
exports["default"] = HttpClient;
/**
 * Encapsulates an error that occurred during an HTTP request.
 *
 * It holds the request info as well as the response to the fetch, which can
 * be used to get more details about the nature of the error.
 */
var HttpStatusError = /** @class */ (function (_super) {
    tslib_1.__extends(HttpStatusError, _super);
    function HttpStatusError(
    /** The URL string or the Request object. */
    requestInfo, requestInit, response) {
        var _this = _super.call(this, "HttpStatusError: " + response.status + " response from " + ((requestInit === null || requestInit === void 0 ? void 0 : requestInit.method) || 'GET') + " " + response.url) || this;
        _this.requestInfo = requestInfo;
        _this.requestInit = requestInit;
        _this.response = response;
        return _this;
    }
    return HttpStatusError;
}(Error));
exports.HttpStatusError = HttpStatusError;
//# sourceMappingURL=client.js.map