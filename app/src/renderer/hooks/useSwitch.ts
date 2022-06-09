import React from 'react';

interface ISwitch {
  value: boolean;
  on: () => void;
  off: () => void;
  toggle: () => void;
}

export const useSwitch = (defaultValue = false): ISwitch => {
  const [value, setValue] = React.useState(defaultValue);

  const on = React.useCallback(() => setValue(true), [setValue]);
  const off = React.useCallback(() => setValue(false), [setValue]);
  const toggle = () => setValue(!value);

  return { value, on, off, toggle };
};
