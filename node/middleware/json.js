/**
 * Middleware which adds developer tooling for JSON APIs.
 *
 * Specifically, it ensures that all API responses adhere to a strict schema.
 * @param req
 * @param res
 * @param next
 */
export function jsonApiSchemaValidationMiddleware(_, res, next) {
    if (process.env.NODE_ENV !== 'development') {
        next();
        return;
    }
    var originalJson = res.json;
    if (!originalJson) {
        next();
        return;
    }
    res.json = function (value) {
        return originalJson(value);
    };
    next();
}
/**
 * Validates API responses during development to ensure they adhere to a consistent
 * format.
 */
export function validateJsonApiResponse(responseText) {
    var json;
    try {
        json = JSON.parse(responseText);
    }
    catch (e) {
        throw new Error('Response is not valid JSON.');
    }
    var error = json.error, data = json.data;
    if (!error && !data) {
        throw new Error('JSON response must have either an "error" field or "data" field.');
    }
    if (error) {
        requireFields(error, {
            message: 'A descriptive error message targeted at developers to help them understand exactly why they are getting this error.',
            code: 'An unambiguous error code that a user can check in their code to see whether they are getting this exact error.'
        });
        if (!error.code.includes('/')) {
            throw new Error('Error codes should be of the format $category/[$...subcategories/]$specific-error-code, e.g. "auth/credentials-expired"');
        }
    }
}
function requireFields(object, fields) {
    var missing = [];
    for (var _i = 0, _a = Object.keys(fields); _i < _a.length; _i++) {
        var field = _a[_i];
        if (!object[field]) {
            missing.push(field);
        }
    }
    if (missing.length) {
        console.error("API responses should have the following fields:");
        throw new Error("Response is missing fields: [" + missing.join(', ') + "]");
    }
}
//# sourceMappingURL=json.js.map