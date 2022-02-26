import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface Action {
  title: string;
  execute: () => void;
}

interface Props {
  open: boolean;
  onAccept: Action;
  onReject: Action;
}

export const DoubleCheck: React.FC<Props> = ({ open, onAccept, onReject, children }) => {
  return (
    <Dialog open={open} aria-labelledby='doublecheck-dialog-title' aria-describedby='doublecheck-dialog-description'>
      <DialogTitle id='doublecheck-dialog-title'>Double Check</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAccept.execute} variant='outlined' color={'error'}>
          {onAccept.title}
        </Button>
        <Button onClick={onReject.execute} variant='outlined' color='info'>
          {onReject.title}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
