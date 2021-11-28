import React from 'react';

import { Snackbar, Alert, AlertTitle } from '@mui/material';

type Severity = 'error' | 'warning' | 'info' | 'success';
type Variant = 'outlined' | 'filled' | 'standard';

interface Props {
  title?: string;
  message?: string;
  severity?: Severity;
  variant?: Variant;
}

interface Snack {
  open: () => void;
  close: () => void;
  element: React.ReactNode;
  setMessage: (arg: string) => void;
}

export const useSnackbar = ({ title = '', message = '', severity = 'info', variant = 'standard' }: Props): Snack => {
  const [_open, setOpen] = React.useState(false);
  const [_message, setMessage] = React.useState<string>();

  React.useEffect(() => setMessage(message), []);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const element = (
    <Snackbar open={_open} autoHideDuration={6000} onClose={close}>
      <Alert severity={severity} variant={variant} onClose={close}>
        <AlertTitle>{title}</AlertTitle>
        {_message}
      </Alert>
    </Snackbar>
  );

  return { open, close, element, setMessage };
};
