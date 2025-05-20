import { useState, useEffect, Dispatch, SetStateAction } from "react";

// Define a generic type for the value stored in localStorage
type Value<T> = T | (() => T);

const getLocalValue = <T>(key: string, initValue: Value<T>): T => {
  // SSR or Next.JS
  if (typeof window === "undefined") {
    // If initValue is a function, call it to get the initial value
    return initValue instanceof Function ? initValue() : initValue;
  }
  // if a value is already in localStorage
  const localValueString = localStorage.getItem(key);
  if (localValueString !== null) {
    try {
      return JSON.parse(localValueString) as T;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      // Fallback to initValue if parsing fails
      return initValue instanceof Function ? initValue() : initValue;
    }
  }
  // if a value is not in localStorage
  if (initValue instanceof Function) {
    return initValue();
  }
  return initValue;
};

const useLocalStorage = <T>(
  key: string,
  initValue: Value<T>
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    return getLocalValue<T>(key, initValue);
  });

  useEffect(() => {
    // SSR Guard
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
