import React from 'react';

import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@renderer/store';
import { importCSV } from '@renderer/store/data-manager/actions';

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

// <redux>
const mapState = (state: RootState) => ({
  page: state.dataManager.page,
  pageSize: state.dataManager.pageSize,
});

const mapDispatch = {
  importCSV,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ImportButton);
// </redux>
