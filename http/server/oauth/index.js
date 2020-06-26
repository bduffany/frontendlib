"use strict";
var _a;
exports.__esModule = true;
exports.OAuthFlow = exports.oauthFlowMiddleware = void 0;
var tslib_1 = require("tslib");
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var oauth_1_0a_1 = tslib_1.__importDefault(require("oauth-1.0a"));
var validation_1 = require("../request/validation");
var error_1 = require("../pipeline/error");
var HASH_FUNCTIONS = (_a = {},
    _a['HMAC-SHA1'] = function (base_string, key) {
        return crypto_1["default"].createHmac('sha1', key).update(base_string).digest('base64');
    },
    _a);
/**
 * Returns middleware that adds oauth flow support to the request.
 * @param providerConfigs
 */
function oauthFlowMiddleware(
// TODO: type
providerConfigs) {
    var middleware = function (req, _, next) {
        if (next === void 0) { next = function () { }; }
        validation_1.requireQueryParams(['consumer_key', 'provider'], req);
        var _a = req.query, consumer_key = _a.consumer_key, provider = _a.provider;
        var config = providerConfigs[provider];
        if (!config || config.consumer_key !== consumer_key) {
            throw new error_1.HttpStatusError(401, 'Request has invalid or missing consumer_key');
        }
        req.oauth = new OAuthFlow(config);
        next();
    };
    return middleware;
}
exports.oauthFlowMiddleware = oauthFlowMiddleware;
/**
 * Utilities for dealing with OAuth.
 */
var OAuthFlow = /** @class */ (function () {
    function OAuthFlow(config) {
        this.config = config;
        var _a = this.config, consumer_key = _a.consumer_key, consumer_secret = _a.consumer_secret, _b = _a.signature_method, signature_method = _b === void 0 ? 'HMAC-SHA1' : _b;
        this.oauth = new oauth_1_0a_1["default"]({
            consumer: {
                key: consumer_key,
                secret: consumer_secret
            },
            signature_method: signature_method,
            hash_function: HASH_FUNCTIONS[signature_method]
        });
    }
    OAuthFlow.prototype.requestToken = function (_a) {
        var _b = (_a === void 0 ? {} : _a).callback, callback = _b === void 0 ? 'oob' : _b;
        return this.signedFetch(this.config.request_token_url, this.config.consumer_key, this.config.consumer_secret, { data: { oauth_callback: callback } });
    };
    OAuthFlow.prototype.accessToken = function (_a) {
        var oauthToken = _a.oauthToken, oauthTokenSecret = _a.oauthTokenSecret, oauthVerifier = _a.oauthVerifier;
        return this.signedFetch(this.config.access_token_url, oauthToken, oauthTokenSecret, { data: { oauth_token: oauthToken, oauth_verifier: oauthVerifier } });
    };
    OAuthFlow.prototype.refreshAccessToken = function (_a) {
        var oauthAccessToken = _a.oauthAccessToken, oauthAccessTokenSecret = _a.oauthAccessTokenSecret;
        return this.signedFetch(this.config.refresh_access_token_url, oauthAccessToken, oauthAccessTokenSecret);
    };
    OAuthFlow.prototype.revokeAccessToken = function (_a) {
        var oauthAccessToken = _a.oauthAccessToken, oauthAccessTokenSecret = _a.oauthAccessTokenSecret;
        return this.signedFetch(this.config.revoke_access_token_url, oauthAccessToken, oauthAccessTokenSecret);
    };
    OAuthFlow.prototype.getAuthorizationUrl = function (_a) {
        var _b = _a.params, params = _b === void 0 ? {} : _b;
        return this.config.authorize_url + "?" + new URLSearchParams(params);
    };
    OAuthFlow.prototype.signedFetch = function (url, key, secret, _a) {
        var _b = (_a === void 0 ? {} : _a).data, data = _b === void 0 ? {} : _b;
        var credentials = key === this.config.consumer_key ? undefined : { key: key, secret: secret };
        var authorization = this.oauth.authorize({ url: url, method: 'GET', data: data }, credentials);
        return fetch(url, {
            method: 'GET',
            headers: tslib_1.__assign({}, this.oauth.toHeader(authorization))
        });
    };
    return OAuthFlow;
}());
exports.OAuthFlow = OAuthFlow;
//# sourceMappingURL=index.js.map