import React from 'react';

// eslint-disable-next-line import/named
import { SxProps } from '@mui/system';
import { Button } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

interface Props {
  sx?: SxProps;
  onClick: () => void;
  size?: 'large' | 'medium' | 'small';
}

const icon = <BoltIcon />;

export const RunButton: React.FC<Props> = ({ sx, onClick, size, children }) => {
  return (
    <Button sx={sx} startIcon={icon} onClick={onClick} size={size}>
      {children}
    </Button>
  );
};
