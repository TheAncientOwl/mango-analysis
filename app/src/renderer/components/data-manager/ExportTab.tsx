import React from 'react';

import { Button, Stack, TextField, CircularProgress } from '@mui/material';

import { Snackbar } from '@src/renderer/components/Snackbar';
import { useCache, RequestState, useRequest, useSwitch } from '@renderer/hooks/index';

export const ExportTab: React.FC = () => {
  const [fileName, setFileName] = useCache('file-name-save', `Data-${Date.now()}.csv`);
  const saveDataRequest = useRequest();
  const [snackSwitch, toggleSnack] = useSwitch();

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
      toggleSnack
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

      <Snackbar open={snackSwitch} onClose={toggleSnack}>
        Saved data!
      </Snackbar>
    </React.Fragment>
  );
};
