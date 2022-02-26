import React from 'react';

import { Snackbar, Alert, AlertTitle } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SuccessSnack: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <Snackbar open={open} autoHideDuration={5500} onClose={onClose}>
      <Alert severity='success' variant='filled' onClose={onClose}>
        <AlertTitle>Success</AlertTitle>
        {children}
      </Alert>
    </Snackbar>
  );
};
