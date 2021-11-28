import React, { useContext, useState } from 'react';

import {
  Box,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from '.';
import { useForceUpdate } from '@renderer/hooks/useForceUpdate';

export const Import: React.FC = () => {
  const data = useContext(DataContext);
  const forceUpdate = useForceUpdate();
  const [doubleCheckOpen, setDoubleCheckOpen] = useState(false);

  const importData = async () => {
    const filePath = await window.electronAPI.showOpenCsvDialog();

    if (filePath !== null) {
      data.importPath = filePath;
      forceUpdate();
    }
  };

  const triggerDoubleCheck = () => setDoubleCheckOpen(true);
  const closeDoubleCheck = () => setDoubleCheckOpen(false);

  const cancelDeleteData = () => {
    console.log('no delete');
    closeDoubleCheck();
  };

  const deleteData = () => {
    console.log('delete');
    closeDoubleCheck();
  };

  return (
    <Box>
      <Dialog
        open={doubleCheckOpen}
        aria-labelledby='doublecheck-dialog-title'
        aria-describedby='doublecheck-dialog-description'>
        <DialogTitle id='doublecheck-dialog-title'>Double check</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will{' '}
            <Box component='span' sx={{ color: 'error.main' }}>
              delete
            </Box>{' '}
            the data imported from <Box component='span' sx={{ color: 'info.main' }}>{`"${data.importPath}"`}</Box>
            <br />
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteData} variant='outlined' color='error'>
            Delete
          </Button>
          <Button onClick={cancelDeleteData} variant='outlined' color='info'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Button onClick={importData} sx={{ mb: 2, display: 'block' }} variant='contained' size='small' disableElevation>
        Search
      </Button>

      {data.importPath !== null && (
        <Box>
          <IconButton sx={{ color: 'error.main' }} onClick={triggerDoubleCheck}>
            <DeleteIcon />
          </IconButton>
          <Chip sx={{ px: 0.7, py: 1.8 }} size='small' color='info' variant='outlined' label={data.importPath} />
        </Box>
      )}
    </Box>
  );
};
