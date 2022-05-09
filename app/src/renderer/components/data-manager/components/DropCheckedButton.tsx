import React from 'react';

import { useSwitch } from '@renderer/hooks';

import { Box, Button } from '@mui/material';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import { DoubleCheck } from '@renderer/components/DoubleCheck';

import { dropRowsAndColumns } from '@renderer/state/actions/DataManagerActions';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@renderer/state/store';

const mapState = (state: RootState) => ({
  loading: state.dataManager.loading,
  checkedLabels: state.dataManager.checkedLabels,
  checkedRows: state.dataManager.checkedRows,

  page: state.dataManager.page,
  pageSize: state.dataManager.pageSize,
});

const mapDispatch = {
  dropRowsAndColumns,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const DropCheckedButton: React.FC<PropsFromRedux> = props => {
  const doubleCheckSwitch = useSwitch();

  const dropChecked = async () => {
    doubleCheckSwitch.off();

    props.dropRowsAndColumns(props.checkedRows, props.checkedLabels, props.page, props.pageSize);
  };

  return (
    <>
      <Button
        startIcon={<PlaylistRemoveIcon />}
        disabled={props.loading || (props.checkedLabels.length === 0 && props.checkedRows.length === 0)}
        onClick={doubleCheckSwitch.on}
        size='medium'>
        Drop
      </Button>

      <DoubleCheck
        open={doubleCheckSwitch.value}
        onAccept={{
          title: 'Drop',
          execute: dropChecked,
        }}
        onReject={{
          title: 'Cancel',
          execute: doubleCheckSwitch.off,
        }}>
        This action will
        <Box component='span' sx={{ color: 'error.main' }}>
          {' drop all checked '}
        </Box>
        rows and columns
        <br />
        Are you sure?
      </DoubleCheck>
    </>
  );
};

export default connector(DropCheckedButton);
