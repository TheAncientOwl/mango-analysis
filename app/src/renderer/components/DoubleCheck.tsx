import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface Action {
  title: string;
  execute: () => void;
  buttonColor: 'error' | 'warning' | 'info' | 'success' | 'inherit' | 'primary' | 'secondary';
}

interface Props {
  open: boolean;
  title?: string;
  text?: React.ReactNode;
  onAccept: Action;
  onReject: Action;
}

export const DoubleCheck: React.FC<Props> = ({ open, title, text, onAccept, onReject }) => {
  return (
    <Dialog open={open} aria-labelledby='doublecheck-dialog-title' aria-describedby='doublecheck-dialog-description'>
      <DialogTitle id='doublecheck-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAccept.execute} variant='outlined' color={onAccept.buttonColor}>
          {onAccept.title}
        </Button>
        <Button onClick={onReject.execute} variant='outlined' color={onReject.buttonColor}>
          {onReject.title}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
