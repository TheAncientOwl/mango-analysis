import React from 'react';

import { Stack, Typography } from '@mui/material';

import { CacheSystem } from '@renderer/api/CacheSystem';

import { DataFrame } from '@renderer/components/DataFrame';

import { axios } from '@renderer/config';

import { viewTabReducer, DataPageIndexKey, DataPageSizeKey, ActionType } from './viewTabStateReducer';
import { ScalingHandler } from './ScalingHandler';
import { DropHandler } from './DropHandler';

export type DataFetcher = () => void;

export const ViewTab: React.FC = () => {
  const [state, dispatch] = React.useReducer(viewTabReducer, {
    pageIndex: CacheSystem.GetItemOrDefault<number>(DataPageIndexKey, 0),
    pageSize: CacheSystem.GetItemOrDefault<number>(DataPageSizeKey, 25),
    loadingData: true,
    selectedLabels: new Set<string>(),
    selectedRows: new Set<number>(),
    data: { labels: [], totalRows: 0, rows: [] },
    scalingMethod: 'none',
  });
  const { pageIndex, pageSize, data, loadingData, selectedLabels, selectedRows, scalingMethod } = state;

  // >> Fetch data.
  const fetchData: DataFetcher = () => {
    dispatch({ type: ActionType.FetchData });

    let active = true;

    axios.get(`/data/page/${pageIndex}/page-size/${pageSize}`).then(res => {
      if (!active) return;

      if ('dataframe' in res.data) dispatch({ type: ActionType.FetchDataSuccess, payload: res.data.dataframe });
    });

    return () => {
      dispatch({ type: ActionType.FetchDataCancel });
      active = false;
    };
  };
  React.useEffect(fetchData, [pageIndex, pageSize]);

  if (data.totalRows === 0 && !loadingData) return <Typography>No data loaded...</Typography>;

  // >> Return JSX.
  return (
    <React.Fragment>
      <Stack sx={{ p: 1.4, pt: 0 }} direction='row' spacing={2}>
        <ScalingHandler scalingMethod={scalingMethod} dispatch={dispatch} fetchData={fetchData} />
        <DropHandler
          loadingData={loadingData}
          dispatch={dispatch}
          fetchData={fetchData}
          labels={Array.from(selectedLabels)}
          mangoIDs={Array.from(selectedRows)}
        />
      </Stack>

      <DataFrame
        loading={loadingData}
        currentData={data}
        currentPage={pageIndex}
        rowsPerPage={pageSize}
        decimals={4}
        onPageChange={newPageIndex => dispatch({ type: ActionType.ChangePageIndex, payload: newPageIndex })}
        onPageSizeChange={newPageSize => dispatch({ type: ActionType.ChangePageSize, payload: newPageSize })}
        selectable={true}
        onLabelSelect={selectedLabel => dispatch({ type: ActionType.SelectColumn, payload: selectedLabel })}
        onRowSelect={selectedRow => dispatch({ type: ActionType.SelectRow, payload: selectedRow })}
        selectedLabels={selectedLabels}
        selectedRows={selectedRows}
      />
    </React.Fragment>
  );
};
