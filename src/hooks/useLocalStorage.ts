import React from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = React.useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return JSON.parse(initialValue);
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
