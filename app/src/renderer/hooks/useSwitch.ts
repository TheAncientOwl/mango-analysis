import React from 'react';

interface Switch {
  value: boolean;
  on: () => void;
  off: () => void;
  toggle: () => void;
}

export const useSwitch = (defaultValue = false): Switch => {
  const [value, setValue] = React.useState(defaultValue);

  const on = React.useCallback(() => setValue(true), [setValue]);
  const off = React.useCallback(() => setValue(false), [setValue]);
  const toggle = () => setValue(!value);

  return { value, on, off, toggle };
};
