import React from 'react';

import { Box, Typography } from '@mui/material';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { changePage, changePageSize, checkLabel, checkRow } from '@store/data-manager/actions';

import { RenderIf } from '@components/RenderIf';

import { DataFrame } from './DataFrame';
import { Pagination } from './Pagination';
import { noDataLoadedMessageStyles, dataFrameWrapperStyles } from './styles';

const DataFrameViewer: React.FC<PropsFromRedux> = props => {
  return (
    <>
      {props.dataFrame.totalRows === 0 && <Typography sx={noDataLoadedMessageStyles}>No data loaded...</Typography>}
      <RenderIf condition={props.dataFrame.totalRows > 0}>
        <Box sx={dataFrameWrapperStyles}>
          <DataFrame
            dataFrame={props.dataFrame}
            decimalsPrecision={props.decimalsPrecision}
            checkedLabels={props.checkedLabels}
            checkedRows={props.checkedRows}
            onLabelCheck={props.checkLabel}
            onRowCheck={props.checkRow}
          />

          <Pagination
            totalRows={props.dataFrame.totalRows}
            pageSize={props.pageSize}
            page={props.page}
            onPageChange={props.changePage}
            onPageSizeChange={props.changePageSize}
          />
        </Box>
      </RenderIf>
    </>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  dataFrame: state.dataManager.dataFrame,
  decimalsPrecision: state.dataManager.decimalsPrecision,
  checkedLabels: state.dataManager.checkedLabels,
  checkedRows: state.dataManager.checkedRows,
  page: state.dataManager.page,
  pageSize: state.dataManager.pageSize,
});

const mapDispatch = {
  changePage,
  changePageSize,
  checkLabel,
  checkRow,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DataFrameViewer);
// </redux>
