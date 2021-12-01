import React from 'react';

export const useCache = <T>(key: string, def: T): [T, React.Dispatch<T>] => {
  const [value, setValue] = React.useState(JSON.parse(window.sessionStorage.getItem(key)) || def);
  useCache.KeysSet.add(key);

  React.useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

useCache.KeysSet = new Set<string>();

useCache.Clear = () => {
  console.info('>> Clear cache...');
  sessionStorage.clear();
};
