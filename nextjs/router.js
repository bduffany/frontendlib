"use strict";
exports.__esModule = true;
exports.usePatchedRouter = void 0;
var tslib_1 = require("tslib");
var router_1 = require("next/router");
/**
 * @see https://github.com/vercel/next.js/pull/9370
 */
exports.usePatchedRouter = function () {
    var router = router_1.useRouter();
    var queryReady = Object.keys(router.query)
        // Server uses amp prop for some reason.
        .filter(function (k) { return k != 'amp'; }).length > 0;
    return tslib_1.__assign(tslib_1.__assign({}, router), { ready: queryReady });
};
//# sourceMappingURL=router.js.map