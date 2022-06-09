import React from 'react';

import { Button } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

import { IButton } from './IButtonProps';

const icon = <BoltIcon />;

export const RunButton: React.FC<IButton> = props => {
  return (
    <Button {...props} startIcon={icon}>
      {props.children}
    </Button>
  );
};
