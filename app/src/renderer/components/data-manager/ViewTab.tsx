import React from 'react';

import { Button, Typography, Box } from '@mui/material';

import { CacheSystem } from '@src/renderer/api/CacheSystem';

import { DataFrame, DataConfig } from '@renderer/components/DataFrame';

import { axios } from '@renderer/config';
import { ImportPathKey } from './ImportTab';

interface State {
  pageIndex: number;
  pageSize: number;
  data: DataConfig;
  loadingData: boolean;
  selectedColumns: Set<string>;
  selectedRows: Set<number>;
  dropping: boolean;
}

export const DataPageIndexKey = 'data-page-index';
export const DataPageSizeKey = 'data-page-size';

const defaultState: State = {
  pageIndex: CacheSystem.GetItemOrDefault<number>(DataPageIndexKey, 0),
  pageSize: CacheSystem.GetItemOrDefault<number>(DataPageSizeKey, 25),
  loadingData: true,
  selectedColumns: new Set<string>(),
  selectedRows: new Set<number>(),
  data: { columns: [], rows: [], totalRows: 0 },
  dropping: false,
};

enum ActionType {
  ChangePageSize = 'CHANGE_PAGE_SIZE',
  ChangePageIndex = 'CHANGE_PAGE_INDEX',
  RequestDataSuccess = 'REQUEST_DATA_SUCCESS',
  SelectColumn = 'SELECT_COLUMN',
  SelectRow = 'SELECT_ROW',
  RequestDropData = 'REQUEST_DROP_DATA',
  DropDataSuccess = 'DROP_DATA_SUCCESS',
}

interface Action {
  type: ActionType;
  payload?: string | number | DataConfig;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ChangePageIndex: {
      CacheSystem.SetItem(DataPageIndexKey, action.payload);

      return {
        ...state,
        pageIndex: action.payload as number,
        loadingData: true,
      };
    }
    case ActionType.ChangePageSize: {
      CacheSystem.SetItem(DataPageSizeKey, action.payload);

      return {
        ...state,
        pageIndex: 0,
        pageSize: action.payload as number,
        loadingData: true,
      };
    }
    case ActionType.RequestDataSuccess: {
      return {
        ...state,
        data: action.payload as DataConfig,
        loadingData: false,
      };
    }
    case ActionType.SelectColumn: {
      const newSet = new Set(state.selectedColumns);
      const selectedColumn = action.payload as string;

      if (newSet.has(selectedColumn)) newSet.delete(selectedColumn);
      else newSet.add(selectedColumn);

      return {
        ...state,
        selectedColumns: newSet,
      };
    }
    case ActionType.SelectRow: {
      const newSet = new Set(state.selectedRows);
      const selectedRow = action.payload as number;

      if (newSet.has(selectedRow)) newSet.delete(selectedRow);
      else newSet.add(selectedRow);

      return {
        ...state,
        selectedRows: newSet,
      };
    }
    case ActionType.RequestDropData: {
      return {
        ...state,
        dropping: true,
      };
    }
    case ActionType.DropDataSuccess: {
      return {
        ...state,
        dropping: false,
        pageIndex: 0,
        selectedColumns: new Set<string>(),
        selectedRows: new Set<number>(),
      };
    }
  }
};

export const ViewTab: React.FC = () => {
  const [{ pageIndex, pageSize, data, loadingData, selectedColumns, selectedRows, dropping }, dispatch] =
    React.useReducer(reducer, defaultState);

  // >> Return empty if no data is loaded.
  if (!CacheSystem.GetItem(ImportPathKey)) return <Typography>No data loaded...</Typography>;

  // >> Fetch data.
  React.useEffect(() => {
    let active = true;

    axios.get(`/data/page/${pageIndex}/page-size/${pageSize}`).then(res => {
      if (!active) return;

      if ('dataframe' in res.data) {
        const dataFrame = res.data.dataframe;
        dispatch({ type: ActionType.RequestDataSuccess, payload: dataFrame });
      }
    });

    return () => {
      active = false;
    };
  }, [pageIndex, pageSize, dropping]);

  // >> Handle drop rows & columns
  const handleDrop = () => {
    dispatch({ type: ActionType.RequestDropData });

    axios
      .post('/data/drop/rows+cols', {
        labels: new Array(...selectedColumns),
        index: new Array(...selectedRows),
      })
      .then(() => dispatch({ type: ActionType.DropDataSuccess }));
  };

  // >> Return JSX.
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button sx={{ mb: 1 }} disabled={dropping} variant='contained' size='small' onClick={handleDrop}>
          Drop selected rows and columns
        </Button>
      </Box>
      <DataFrame
        loading={loadingData || dropping}
        currentData={data}
        currentPage={pageIndex}
        rowsPerPage={pageSize}
        onPageChange={newPageIndex => dispatch({ type: ActionType.ChangePageIndex, payload: newPageIndex })}
        onPageSizeChange={newPageSize => dispatch({ type: ActionType.ChangePageSize, payload: newPageSize })}
        selectable={true}
        onColumnSelect={selectedColumn => dispatch({ type: ActionType.SelectColumn, payload: selectedColumn })}
        onRowSelect={selectedRow => dispatch({ type: ActionType.SelectRow, payload: selectedRow })}
        selectedColumns={selectedColumns}
        selectedRows={selectedRows}
      />
    </React.Fragment>
  );
};
