import React, { useContext } from 'react';

import { Box, Typography } from '@mui/material';

import { ActionType } from './state';
import { DataManagerContext } from './context';

import { DataFrameViewer } from './data-frame-viewer';
import { DataFrameViewerPagination } from './data-frame-viewer/DataFrameViewerPagination';

const noDataLoadedMessageStyles = {
  height: '100%',
  p: 2,
  pt: '5%',
  display: 'flex',
  justifyContent: 'center',
} as const;

const dataFrameWrapperStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  p: 1.5,
  pt: 0,
} as const;

export const DataManagerDataFrame: React.FC = () => {
  const { state, dispatch } = useContext(DataManagerContext);

  const handle = React.useMemo(
    () => ({
      pageChange: (newPageIndex: number) => dispatch({ type: ActionType.ChangePage, payload: newPageIndex }),
      pageSizeChange: (newPageSize: number) => dispatch({ type: ActionType.ChangePageSize, payload: newPageSize }),
      labelCheck: (selectedLabel: string) => dispatch({ type: ActionType.CheckLabel, payload: selectedLabel }),
      rowCheck: (selectedRow: number) => dispatch({ type: ActionType.CheckRow, payload: selectedRow }),
    }),
    [dispatch]
  );

  return (
    <>
      {state.dataFrame.totalRows === 0 && <Typography sx={noDataLoadedMessageStyles}>No data loaded...</Typography>}
      {state.dataFrame.totalRows > 0 && (
        <Box sx={dataFrameWrapperStyles}>
          <DataFrameViewer
            dataFrame={state.dataFrame}
            decimalsPrecision={state.decimalsPrecision}
            checkedLabels={state.checkedLabels}
            checkedRows={state.checkedRows}
            onLabelCheck={handle.labelCheck}
            onRowCheck={handle.rowCheck}
          />
          <DataFrameViewerPagination
            totalRows={state.dataFrame.totalRows}
            pageSize={state.pageSize}
            page={state.page}
            onPageChange={handle.pageChange}
            onPageSizeChange={handle.pageSizeChange}
          />
        </Box>
      )}
    </>
  );
};
