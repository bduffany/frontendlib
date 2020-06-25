/**
 * Hook that attaches an event listener to a given object and cleans
 * it up automatically.
 *
 * If the object or event name is null, the hook does nothing.
 */
export default function useEventListener(object: any, eventName: string, listener: EventListener): void;
