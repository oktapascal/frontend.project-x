import { useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  defaultValue = null
): [T, (value: T) => void, (key: string) => void] => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);

      if (saved !== null) return JSON.parse(saved);

      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const rawValue = JSON.stringify(value);

    localStorage.setItem(key, rawValue);
  }, [key, value]);

  const removeLocalStorage = () => {
    localStorage.removeItem(key);
  };

  return [value, setValue, removeLocalStorage];
};

export default useLocalStorage;
