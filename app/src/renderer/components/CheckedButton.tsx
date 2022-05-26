import React from 'react';

// eslint-disable-next-line import/named
import { SxProps } from '@mui/system';
import { Button } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

interface Props {
  sx?: SxProps;
  checked: boolean;
  onClick: () => void;
  size?: 'large' | 'medium' | 'small';
}

const checkedIcon = <CheckBoxIcon />;
const uncheckedIcon = <CheckBoxOutlineBlankIcon />;

export const CheckedButton: React.FC<Props> = ({ sx, checked, onClick, children, size = 'medium' }) => {
  return (
    <Button sx={sx} size={size} startIcon={checked ? checkedIcon : uncheckedIcon} onClick={onClick}>
      {children}
    </Button>
  );
};
