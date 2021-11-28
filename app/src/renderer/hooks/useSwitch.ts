import React from 'react';

export const useSwitch = (defaultValue = false): [boolean, () => void] => {
  const [value, setValue] = React.useState(defaultValue);

  const toggle = () => setValue(!value);

  return [value, toggle];
};
