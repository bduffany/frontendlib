import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: string = ''
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState(
    () => window.localStorage.getItem(key) || initialValue
  );

  const setItem: Dispatch<SetStateAction<string>> = useCallback(
    (valueOrFn) => {
      setValue((current: string) => {
        let newValue: string;
        if (typeof valueOrFn === 'string') {
          newValue = valueOrFn;
        } else {
          newValue = valueOrFn(current);
        }
        window.localStorage.setItem(key, newValue);
        return newValue;
      });
    },
    [setValue]
  );

  useEffect(() => {
    const newValue = window.localStorage.getItem(key);
    if (value !== newValue) {
      setValue(newValue || initialValue);
    }
  });

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue !== value) {
        setValue(event.newValue || initialValue);
      }
    },
    [value]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [value, setItem];
}
