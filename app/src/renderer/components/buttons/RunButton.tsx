import React from 'react';

import { Button } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

import { IButtonProps } from './IButtonProps';

const icon = <BoltIcon />;

export const RunButton: React.FC<IButtonProps> = ({ sx, onClick, size = 'medium', children }) => {
  return (
    <Button sx={sx} startIcon={icon} onClick={onClick} size={size}>
      {children}
    </Button>
  );
};
