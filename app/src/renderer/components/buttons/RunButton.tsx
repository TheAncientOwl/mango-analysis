import React from 'react';

import { Button } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

import { IButtonProps } from './IButtonProps';

const icon = <BoltIcon />;

export const RunButton: React.FC<IButtonProps> = props => {
  return (
    <Button {...props} startIcon={icon}>
      {props.children}
    </Button>
  );
};
