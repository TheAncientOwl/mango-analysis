import React from 'react';

import { Button } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { IButtonProps } from './IButtonProps';

const icon = <SkipNextIcon />;

export const SkipButton: React.FC<IButtonProps> = ({ sx, onClick, children, size = 'medium' }) => {
  return (
    <Button sx={sx} startIcon={icon} size={size} onClick={onClick} color='warning'>
      {children}
    </Button>
  );
};
