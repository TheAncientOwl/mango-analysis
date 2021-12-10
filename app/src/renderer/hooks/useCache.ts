import React from 'react';

import { CacheSystem } from '../CacheSystem';

export const useCache = <T>(key: string, def: T): [T, React.Dispatch<T>] => {
  const [value, setValue] = React.useState(CacheSystem.GetItemOrDefault(key, def));

  React.useEffect(() => {
    CacheSystem.SetItem<T>(key, value);
  }, [value]);

  return [value, setValue];
};
