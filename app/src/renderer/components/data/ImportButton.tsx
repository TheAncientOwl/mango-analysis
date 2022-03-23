import React from 'react';

import { axios } from '@renderer/config';

import { DataDispatcher, DataActionType } from './Data.reducer';
import { Button } from '@mui/material';

interface State {
  dispatch: DataDispatcher;
}

export const ImportButtton: React.FC<State> = ({ dispatch }) => {
  const importData = async () => {
    const filePath = await window.electron.getImportCsvPath();

    if (filePath === null) return;

    dispatch({ type: DataActionType.ImportData });

    axios.get(`/data/import/csv/${filePath}`).then(() => dispatch({ type: DataActionType.ImportDataSuccess }));
  };

  return (
    <>
      <Button onClick={importData} variant='contained' size='medium' disableElevation>
        Import
      </Button>
    </>
  );
};
