import React from 'react';

import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { axios } from '@renderer/config';
import { PCA } from '@renderer/components/pca/config';

import { ActionType } from '../state';
import { DataManagerContext } from '../context';

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

    PCA.clearCache();

    dispatch({ type: ActionType.DataImported });
  };

  return (
    <Button onClick={importData} startIcon={<FileUploadIcon />} size='medium'>
      Import
    </Button>
  );
};
