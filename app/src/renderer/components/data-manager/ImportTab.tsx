import React from 'react';

import { Box, Button, IconButton, Stack, Typography, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCache, RequestState, useRequest, useSnackbar, useSwitch } from '@renderer/hooks/index';

import { DoubleCheck } from '@renderer/components/DoubleCheck';

export const ImportPathKey = 'import-path';

export const ImportTab: React.FC = () => {
  const [importPath, setImportPath] = useCache<string | null>(ImportPathKey, null);
  const [doubleCheckSwitch, toggleDoubleCheck] = useSwitch(false);
  const dataRequest = useRequest();

  const snackbar = useSnackbar({
    title: 'Success',
    message: 'Data deleted!',
    severity: 'success',
    variant: 'filled',
  });

  const importData = async () => {
    const filePath = await window.electron.getImportCsvPath();

    if (filePath === null) return;

    dataRequest.execute({ method: 'get', url: `/data/import/csv/${filePath}` }, () => {
      setImportPath(filePath);

      snackbar.setMessage('Data loaded!');
      snackbar.open();
    });
  };

  const cancelDeleteData = () => {
    toggleDoubleCheck();
  };

  const deleteData = () => {
    dataRequest.execute({ method: 'post', url: '/data/drop-all' }, () => {
      setImportPath(null);

      snackbar.setMessage('Data deleted!');
      snackbar.open();
    });
    toggleDoubleCheck();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <Button
          onClick={importData}
          sx={{ mb: 2, mr: 2, display: 'block' }}
          variant='contained'
          size='medium'
          disableElevation>
          Search
        </Button>
        {dataRequest.state === RequestState.Pending && <CircularProgress size={30} thickness={4} color='info' />}
      </Box>

      {importPath !== null && (
        <Stack direction='row' alignItems='center' spacing={1}>
          <IconButton sx={{ color: 'error.main' }} onClick={toggleDoubleCheck}>
            <DeleteIcon />
          </IconButton>
          <Typography variant='body2'>{importPath}</Typography>
        </Stack>
      )}

      <DoubleCheck
        open={doubleCheckSwitch}
        onAccept={{
          title: 'Delete',
          execute: deleteData,
        }}
        onReject={{
          title: 'Cancel',
          execute: cancelDeleteData,
        }}>
        This action will
        <Box component='span' sx={{ color: 'error.main' }}>
          {' delete '}
        </Box>
        the data imported from <Box component='span' sx={{ color: 'info.main' }}>{`"${importPath}"`}</Box>
        <br />
        Are you sure?
      </DoubleCheck>

      {snackbar.element}
    </React.Fragment>
  );
};
