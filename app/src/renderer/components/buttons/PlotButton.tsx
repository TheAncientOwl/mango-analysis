import React from 'react';

import { Button } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';

import { IButtonProps } from './IButtonProps';

const icon = <BrushIcon />;

export const PlotButton: React.FC<IButtonProps> = props => {
  return (
    <Button {...props} startIcon={icon} color='info'>
      {props.children}
    </Button>
  );
};
