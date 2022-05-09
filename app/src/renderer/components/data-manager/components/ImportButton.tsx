import React from 'react';

import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { importCSV } from '@renderer/state/actions/data-manager/actions';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@renderer/state/store';

const mapState = (state: RootState) => ({
  page: state.dataManager.page,
  pageSize: state.dataManager.pageSize,
});

const mapDispatch = {
  importCSV,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ImportButton: React.FC<PropsFromRedux> = props => {
  const importData = () => {
    props.importCSV(props.page, props.pageSize);
  };

  return (
    <Button onClick={importData} startIcon={<FileUploadIcon />} size='medium'>
      Import
    </Button>
  );
};

export default connector(ImportButton);
