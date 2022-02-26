import React from 'react';

interface Switch {
  value: boolean;
  on: () => void;
  off: () => void;
  toggle: () => void;
}

export const useSwitch = (defaultValue = false): Switch => {
  const [value, setValue] = React.useState(defaultValue);

  const logics = React.useMemo(
    () => ({
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue(!value),
    }),
    [setValue]
  );

  return { value, ...logics };
};
