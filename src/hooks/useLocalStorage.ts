import { useEffect, useState } from "react";

const useLocalStorage = (key: string, defaultValue: unknown = null) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);

      if (saved !== null) return JSON.parse(saved);

      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const rawValue = JSON.stringify(value);

    window.localStorage.setItem(key, rawValue);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
