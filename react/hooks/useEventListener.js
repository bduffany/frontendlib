import { useEffect } from 'react';
/**
 * Hook that attaches an event listener to a given object and cleans
 * it up automatically.
 *
 * If the object or event name is null, the hook does nothing.
 */
export default function useEventListener(object, eventName, listener) {
    useEffect(function () {
        if (!object || !eventName)
            return;
        object.addEventListener(eventName, listener);
        return function () { return object.removeEventListener(eventName, listener); };
    }, [object, eventName, listener]);
}
//# sourceMappingURL=useEventListener.js.map