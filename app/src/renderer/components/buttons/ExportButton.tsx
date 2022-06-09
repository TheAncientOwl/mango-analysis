import React from 'react';

import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { IButton } from './IButtonProps';

const icon = <FileDownloadIcon />;

export const ExportButton: React.FC<IButton> = props => {
  return (
    <Button {...props} startIcon={icon}>
      {props.children}
    </Button>
  );
};
