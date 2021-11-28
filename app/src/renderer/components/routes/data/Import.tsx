import React, { useContext, useState } from 'react';
import { axios } from '@renderer/config';

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
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { DataContext } from '.';
import { RequestState } from '@renderer/misc';

export const Import: React.FC = () => {
  const data = useContext(DataContext);
  const [dataLoaded, setDataLoaded] = useState<RequestState>(RequestState.None);
  const [doubleCheckOpen, setDoubleCheckOpen] = useState(false);

  const importData = async () => {
    const filePath = await window.electronAPI.showOpenCsvDialog();

    if (filePath === null) return;

    data.importPath = filePath;
    setDataLoaded(RequestState.Pending);

    axios.get(`/data/import/csv/${filePath}`).then(() => {
      setTimeout(() => {
        setDataLoaded(RequestState.Solved);
      }, 4000);
    });
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

      <Box sx={{ display: 'flex' }}>
        <Button onClick={importData} sx={{ mb: 2, display: 'block' }} variant='contained' size='small' disableElevation>
          Search
        </Button>
        {dataLoaded === RequestState.Pending && (
          <CircularProgress sx={{ ml: 2 }} size={30} thickness={4} color='info' />
        )}
      </Box>

      {dataLoaded === RequestState.Solved && (
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
