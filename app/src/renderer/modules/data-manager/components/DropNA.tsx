import React from 'react';

import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState, resetAppState } from '@store/.';
import { dropNA } from '@store/data-manager/actions';

import { DoubleCheck } from '@components/DoubleCheck';
import { useSwitch } from '@hooks/.';

const DropNA: React.FC<PropsFromRedux> = props => {
  const doubleCheckSwitch = useSwitch();

  const handleDropNA = () => {
    doubleCheckSwitch.off();

    props.dropNA();

    resetAppState();
  };

  return (
    <>
      <Button disabled={!props.missingValues} onClick={doubleCheckSwitch.on} startIcon={<DeleteIcon />} size='medium'>
        drop na
      </Button>

      <DoubleCheck
        open={doubleCheckSwitch.value}
        onAccept={{
          title: 'Delete',
          execute: handleDropNA,
        }}
        onReject={{
          title: 'Cancel',
          execute: doubleCheckSwitch.off,
        }}>
        This action will
        <Box component='span' sx={{ color: 'error.main' }}>
          {' drop the missing values'}
        </Box>
        <br />
        Are you sure?
      </DoubleCheck>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  missingValues: state.dataManager.dataFrame.missingValues,
});

const mapDispatch = {
  dropNA,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DropNA);
// </redux>
