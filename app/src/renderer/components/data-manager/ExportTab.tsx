import React from 'react';

import { Button, Stack, TextField, CircularProgress } from '@mui/material';
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
    const directoryPath = await window.electron.getExportCsvDirectoryPath();

    if (directoryPath === null) return;

    const saveFileName = fileName.endsWith('.csv') ? fileName : `${fileName}.csv`;

    saveDataRequest.execute(
      { method: 'post', url: `/data/export/csv/name/${saveFileName}/path/${directoryPath}` },
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
        {saveDataRequest.state === RequestState.Pending && <CircularProgress size={30} thickness={4} color='info' />}
      </Stack>

      {snackbar.element}
    </React.Fragment>
  );
};
