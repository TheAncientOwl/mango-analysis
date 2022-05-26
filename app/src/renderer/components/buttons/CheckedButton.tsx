import React from 'react';

import { Button } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { IButtonProps } from './IButtonProps';

interface Props extends IButtonProps {
  checked: boolean;
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
