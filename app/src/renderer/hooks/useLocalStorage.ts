import React, { useEffect } from 'react';

export const useLocalStorage = <T>(key: string, def: T): [T, React.Dispatch<T>] => {
  const [value, setValue] = React.useState(JSON.parse(window.localStorage.getItem(key)) || def);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
