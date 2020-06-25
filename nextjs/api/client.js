"use strict";
exports.__esModule = true;
exports.api = void 0;
var tslib_1 = require("tslib");
var client_1 = tslib_1.__importDefault(require("../../http/client"));
/**
 * HTTP client for Next.js based APIs.
 */
var NextApiClient = /** @class */ (function (_super) {
    tslib_1.__extends(NextApiClient, _super);
    function NextApiClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Makes a request to the given Next.js API endpoint.
     *
     * The "/api" prefix is automatically prepended, so it should be
     * left out of the provided URL.
     *
     * @override
     */
    NextApiClient.prototype.request = function (url, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options_;
            return tslib_1.__generator(this, function (_a) {
                options_ = tslib_1.__assign({}, options);
                if (!options_.baseUrl) {
                    options_.baseUrl = window.location.origin + "/api";
                }
                return [2 /*return*/, _super.prototype.request.call(this, url, options_)];
            });
        });
    };
    return NextApiClient;
}(client_1["default"]));
exports["default"] = NextApiClient;
exports.api = new NextApiClient();
//# sourceMappingURL=client.js.map