"use strict";
exports.__esModule = true;
var react_1 = require("react");
/**
 * Hook that attaches an event listener to a given object and cleans
 * it up automatically.
 *
 * If the object or event name is null, the hook does nothing.
 */
function useEventListener(object, eventName, listener) {
    react_1.useEffect(function () {
        if (!object || !eventName)
            return;
        object.addEventListener(eventName, listener);
        return function () { return object.removeEventListener(eventName, listener); };
    }, [object, eventName, listener]);
}
exports["default"] = useEventListener;
//# sourceMappingURL=useEventListener.js.map