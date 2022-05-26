import React from 'react';

interface Props {
  condition: boolean;
}

export const RenderIf: React.FC<Props> = ({ condition, children }) => {
  return <>{condition && children}</>;
};
