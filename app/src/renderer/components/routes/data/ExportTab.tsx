import React from 'react';

import { Button, Stack, TextField } from '@mui/material';
import { CircularPendingRequest } from '@renderer/components/CircularPendingRequest';
import { useCache } from '@renderer/hooks/useCache';
import { RequestState, useRequest } from '@renderer/hooks/useRequest';
import { useSnackbar } from '@renderer/hooks/useSnackbar';

export const ExportTab: React.FC = () => {
  const [fileName, setFileName] = useCache('file-name-save', `Data-${Date.now()}.csv`);
  const saveDataRequest = useRequest();
  const snackbar = useSnackbar({
    title: 'Success',
    message: 'Saved data!',
    severity: 'success',
    variant: 'filled',
  });

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFileName = event.target.value;

    if (newFileName.includes('/') || newFileName.includes('\\')) return;

    setFileName(event.target.value);
  };

  const saveDataFile = async () => {
    const directoryPath = await window.electronAPI.showOpenDirectoryDialog();

    if (directoryPath === null) return;

    const saveFileName = fileName.endsWith('.csv') ? fileName : `${fileName}.csv`;

    saveDataRequest.execute(
      { method: 'get', url: `/data/export/csv/name/${saveFileName}/path/${directoryPath}` },
      () => {
        snackbar.open();
      }
    );
  };

  return (
    <React.Fragment>
      <Stack sx={{ width: '70%' }} direction='row' alignItems='center' spacing={2}>
        <TextField
          fullWidth
          id='file-name'
          label='File name'
          variant='outlined'
          size='small'
          value={fileName}
          onChange={handleFileNameChange}
        />
        <Button onClick={saveDataFile} sx={{ display: 'block' }} variant='contained' size='medium' disableElevation>
          Save
        </Button>
        {saveDataRequest.state === RequestState.Pending && <CircularPendingRequest />}
      </Stack>

      {snackbar.element}
    </React.Fragment>
  );
};
