"use strict";
exports.__esModule = true;
exports.redirectScript = exports.CLEAR_BODY_SCRIPT = void 0;
exports.CLEAR_BODY_SCRIPT = '<script>document.body.innerHTML=""</script>';
function redirectScript(location) {
    return "<script>window.location.href=\"" + location + "\"</script>";
}
exports.redirectScript = redirectScript;
//# sourceMappingURL=scripts.js.map