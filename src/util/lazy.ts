/** Returns a lazily evaluated object. */
export default function lazy<T>(thunk: () => T) {
  let value: T | (() => T) = thunk;
  return () => (value === thunk ? (value = thunk()) : value);
}
