import React from 'react';

export const useForceUpdate = () => {
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return forceUpdate;
};
