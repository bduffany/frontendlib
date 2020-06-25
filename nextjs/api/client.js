import { __assign, __awaiter, __extends, __generator } from "tslib";
import HttpClient from '../../http/client';
/**
 * HTTP client for Next.js based APIs.
 */
var NextApiClient = /** @class */ (function (_super) {
    __extends(NextApiClient, _super);
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
        return __awaiter(this, void 0, void 0, function () {
            var options_;
            return __generator(this, function (_a) {
                options_ = __assign({}, options);
                if (!options_.baseUrl) {
                    options_.baseUrl = window.location.origin + "/api";
                }
                return [2 /*return*/, _super.prototype.request.call(this, url, options_)];
            });
        });
    };
    return NextApiClient;
}(HttpClient));
export default NextApiClient;
export var api = new NextApiClient();
//# sourceMappingURL=client.js.map