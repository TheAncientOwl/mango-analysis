import { Button } from '@mui/material';
import { axios } from '@renderer/config';
import React from 'react';
import { DataManagerContext } from './DataManagerContext';
import { ActionType } from './dataManagerReducer';

import FileUploadIcon from '@mui/icons-material/FileUpload';

export const ImportButton: React.FC = () => {
  const { dispatch, fetchData } = React.useContext(DataManagerContext);

  const importData = async () => {
    dispatch({ type: ActionType.Loading });

    const filePath = await window.electron.getImportCsvPath();

    if (filePath === null) {
      dispatch({ type: ActionType.EndLoading });
      return;
    }

    await axios.get(`/data/import/csv/${filePath}`);

    fetchData();

    dispatch({ type: ActionType.DataImported });
  };

  return (
    <Button onClick={importData} startIcon={<FileUploadIcon />} variant='contained' size='medium' disableElevation>
      Import
    </Button>
  );
};
