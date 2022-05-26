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

export const CheckedButton: React.FC<Props> = props => {
  return (
    <Button {...props} startIcon={props.checked ? checkedIcon : uncheckedIcon}>
      {props.children}
    </Button>
  );
};
