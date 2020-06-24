import { useEffect } from 'react';

/**
 * Hook that attaches an event listener to a given object and cleans
 * it up automatically.
 *
 * If the object or event name is null, the hook does nothing.
 */
export default function useEventListener(
  object: any,
  eventName: string,
  listener: EventListener
) {
  useEffect(() => {
    if (!object || !eventName) return;

    object.addEventListener(eventName, listener);
    return () => object.removeEventListener(eventName, listener);
  }, [object, eventName, listener]);
}
