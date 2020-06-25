"use strict";
var _a;
exports.__esModule = true;
exports.getOAuthFlow = void 0;
var tslib_1 = require("tslib");
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var oauth_1_0a_1 = tslib_1.__importDefault(require("oauth-1.0a"));
var HASH_FUNCTIONS = (_a = {},
    _a['HMAC-SHA1'] = function (base_string, key) {
        return crypto_1["default"].createHmac('sha1', key).update(base_string).digest('base64');
    },
    _a);
function getOAuthFlow(_a) {
    var consumerKey = _a.consumerKey, consumerSecret = _a.consumerSecret, requestTokenUrl = _a.requestTokenUrl, accessTokenUrl = _a.accessTokenUrl, authorizationUrl = _a.authorizationUrl, refreshTokenUrl = _a.refreshTokenUrl, _b = _a.signatureMethod, signatureMethod = _b === void 0 ? 'HMAC-SHA1' : _b;
    var oauth = new oauth_1_0a_1["default"]({
        consumer: {
            key: consumerKey,
            secret: consumerSecret
        },
        signature_method: signatureMethod,
        hash_function: HASH_FUNCTIONS[signatureMethod]
    });
    return {
        requestToken: function (_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.method, method = _c === void 0 ? 'GET' : _c, _d = _b.callback, callback = _d === void 0 ? 'oob' : _d;
            var authorization = oauth.authorize({
                url: requestTokenUrl,
                method: method,
                data: {
                    oauth_callback: callback
                }
            });
            var url = requestTokenUrl;
            var headers = {
                Authorization: oauth.toHeader(authorization).Authorization
            };
            return fetch(url, { headers: headers, method: method });
        },
        accessToken: function (_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.method, method = _c === void 0 ? 'GET' : _c, oauthToken = _b.oauthToken, oauthTokenSecret = _b.oauthTokenSecret, oauthVerifier = _b.oauthVerifier;
            var authorization = oauth.authorize({
                url: accessTokenUrl,
                method: method,
                data: {
                    oauth_token: oauthToken,
                    oauth_verifier: oauthVerifier
                }
            }, {
                key: oauthToken,
                secret: oauthTokenSecret
            });
            var headers = {
                Authorization: oauth.toHeader(authorization).Authorization
            };
            var url = accessTokenUrl;
            return fetch(url, { headers: headers, method: method });
        },
        refreshToken: function (_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.method, method = _c === void 0 ? 'GET' : _c, oauthAccessToken = _b.oauthAccessToken, oauthAccessTokenSecret = _b.oauthAccessTokenSecret;
            var authorization = oauth.authorize({
                url: refreshTokenUrl,
                method: method
            }, {
                key: oauthAccessToken,
                secret: oauthAccessTokenSecret
            });
            return fetch(refreshTokenUrl, tslib_1.__assign({ method: method }, oauth.toHeader(authorization)));
        },
        getAuthorizationUrl: function (_a) {
            var _b = _a.params, params = _b === void 0 ? {} : _b;
            return authorizationUrl + "?" + new URLSearchParams(params);
        }
    };
}
exports.getOAuthFlow = getOAuthFlow;
//# sourceMappingURL=index.js.map