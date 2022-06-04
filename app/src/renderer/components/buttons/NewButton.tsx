import React from 'react';

import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { IButtonProps } from './IButtonProps';
import { Tooltip } from '../Tooltip';

const icon = <AddBoxIcon />;

export const NewButton: React.FC<IButtonProps> = props => {
  return (
    <Tooltip title={props.children}>
      <IconButton color='info' {...props}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
