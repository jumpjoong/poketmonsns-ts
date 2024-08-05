import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
};
