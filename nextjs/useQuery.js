"use strict";
exports.__esModule = true;
var router_1 = require("next/router");
/** Returns the page query, or null if the page is not yet hydrated. */
function useQuery() {
    var router = router_1.useRouter();
    var hasQueryParams = /\[.+\]/.test(router.route) || /\?./.test(router.asPath);
    var ready = !hasQueryParams || Object.keys(router.query).length > 0;
    if (!ready)
        return null;
    return router.query;
}
exports["default"] = useQuery;
//# sourceMappingURL=useQuery.js.map