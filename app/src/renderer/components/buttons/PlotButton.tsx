import React from 'react';

import { Button } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';

import { IButton } from './IButtonProps';

const icon = <BrushIcon />;

export const PlotButton: React.FC<IButton> = props => {
  return (
    <Button {...props} startIcon={icon} color='info'>
      {props.children}
    </Button>
  );
};
