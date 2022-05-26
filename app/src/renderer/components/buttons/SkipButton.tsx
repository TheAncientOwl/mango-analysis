import React from 'react';

import { Button } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { IButtonProps } from './IButtonProps';

const icon = <SkipNextIcon />;

export const SkipButton: React.FC<IButtonProps> = props => {
  return (
    <Button {...props} startIcon={icon} color='warning'>
      {props.children}
    </Button>
  );
};
