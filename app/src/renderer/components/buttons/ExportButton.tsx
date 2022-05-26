import React from 'react';

import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { IButtonProps } from './IButtonProps';

const icon = <FileDownloadIcon />;

export const ExportButton: React.FC<IButtonProps> = props => {
  return (
    <Button {...props} startIcon={icon}>
      {props.children}
    </Button>
  );
};
