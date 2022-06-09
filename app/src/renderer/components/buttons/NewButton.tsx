import React from 'react';

import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { IButton } from './IButtonProps';
import { Tooltip } from '../Tooltip';

const icon = <AddBoxIcon />;

export const NewButton: React.FC<IButton> = props => {
  return (
    <Tooltip title={props.children}>
      <IconButton color='info' {...props}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
