import React from 'react';

import { Snackbar, Severity, Variant } from '@components/Snackbar';

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

export const useSnackbar = ({
  title = 'Success',
  message = '',
  severity = 'success',
  variant = 'filled',
}: Props): Snack => {
  const [_open, setOpen] = React.useState(false);
  const [_message, setMessage] = React.useState<string>();

  React.useEffect(() => setMessage(message), []);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const element = (
    <Snackbar title={title} severity={severity} variant={variant} open={_open} onClose={close}>
      {_message}
    </Snackbar>
  );

  return { open, close, element, setMessage };
};
