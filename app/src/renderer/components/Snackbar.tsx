import React from 'react';

import { Snackbar as MuiSnackbar, Alert, AlertTitle } from '@mui/material';

export type Severity = 'error' | 'warning' | 'info' | 'success';
export type Variant = 'outlined' | 'filled' | 'standard';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  severity?: Severity;
  variant?: Variant;
  autoHideDuration?: number;
}

export const Snackbar: React.FC<Props> = ({
  title = 'Success',
  severity = 'success',
  variant = 'filled',
  autoHideDuration = 5500,
  open,
  onClose,
  children,
}) => {
  return (
    <MuiSnackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert severity={severity} variant={variant} onClose={onClose}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </MuiSnackbar>
  );
};
