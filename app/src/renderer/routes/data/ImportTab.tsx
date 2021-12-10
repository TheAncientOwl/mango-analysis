import React from 'react';

import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCache } from '@renderer/hooks/useCache';
import { useSnackbar } from '@renderer/hooks/useSnackbar';
import { useSwitch } from '@renderer/hooks/useSwitch';
import { useRequest, RequestState } from '@renderer/hooks/useRequest';

import { DoubleCheck } from '@renderer/components/DoubleCheck';
import { CircularPendingRequest } from '@renderer/components/CircularPendingRequest';

export const ImportTab: React.FC = () => {
  const [importPath, setImportPath] = useCache<string | null>('import-path', null);
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
    dataRequest.execute({ method: 'get', url: '/data/delete' }, () => {
      setImportPath(null);

      snackbar.setMessage('Data deleted!');
      snackbar.open();
    });
    toggleDoubleCheck();
  };

  return (
    <React.Fragment>
      <DoubleCheck
        open={doubleCheckSwitch}
        title='Double check'
        text={
          <React.Fragment>
            This action will{' '}
            <Box component='span' sx={{ color: 'error.main' }}>
              delete
            </Box>{' '}
            the data imported from <Box component='span' sx={{ color: 'info.main' }}>{`"${importPath}"`}</Box>
            <br />
            Are you sure?
          </React.Fragment>
        }
        onAccept={{
          title: 'Delete',
          execute: deleteData,
          buttonColor: 'error',
        }}
        onReject={{
          title: 'Cancel',
          execute: cancelDeleteData,
          buttonColor: 'info',
        }}
      />

      <Box sx={{ display: 'flex' }}>
        <Button
          onClick={importData}
          sx={{ mb: 2, mr: 2, display: 'block' }}
          variant='contained'
          size='medium'
          disableElevation>
          Search
        </Button>
        {dataRequest.state === RequestState.Pending && <CircularPendingRequest />}
      </Box>

      {importPath !== null && (
        <Stack direction='row' alignItems='center' spacing={1}>
          <IconButton sx={{ color: 'error.main' }} onClick={toggleDoubleCheck}>
            <DeleteIcon />
          </IconButton>
          <Typography variant='body2'>{importPath}</Typography>
        </Stack>
      )}

      {snackbar.element}
    </React.Fragment>
  );
};
