"use strict";
exports.__esModule = true;
exports.requireQueryParams = void 0;
var error_1 = require("../pipeline/error");
function requireQueryParams(params, req) {
    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
        var param = params_1[_i];
        if (!req.query[param]) {
            throw new error_1.HttpStatusError(400, "Missing required query param: " + param);
        }
    }
}
exports.requireQueryParams = requireQueryParams;
//# sourceMappingURL=validation.js.map