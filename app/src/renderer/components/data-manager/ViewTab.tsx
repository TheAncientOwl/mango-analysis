import React from 'react';

import { Button, Typography, Box } from '@mui/material';

import { CacheSystem } from '@src/renderer/api/CacheSystem';

import { DataFrame, Data } from '@renderer/components/DataFrame';

import { axios } from '@renderer/config';
import { ImportPathKey } from './ImportTab';

interface State {
  pageIndex: number;
  pageSize: number;
  data: Data;
  loadingData: boolean;
  selectedLabels: Set<string>;
  selectedRows: Set<number>;
  dropping: boolean;
}

export const DataPageIndexKey = 'data-page-index';
export const DataPageSizeKey = 'data-page-size';

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
  payload?: string | number | Data;
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
        data: action.payload as Data,
        loadingData: false,
      };
    }
    case ActionType.SelectColumn: {
      const newSet = new Set(state.selectedLabels);
      const selectedColumn = action.payload as string;

      if (newSet.has(selectedColumn)) newSet.delete(selectedColumn);
      else newSet.add(selectedColumn);

      return {
        ...state,
        selectedLabels: newSet,
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
        selectedLabels: new Set<string>(),
        selectedRows: new Set<number>(),
      };
    }
  }
};

export const ViewTab: React.FC = () => {
  const [{ pageIndex, pageSize, data, loadingData, selectedLabels, selectedRows, dropping }, dispatch] =
    React.useReducer(reducer, {
      pageIndex: CacheSystem.GetItemOrDefault<number>(DataPageIndexKey, 0),
      pageSize: CacheSystem.GetItemOrDefault<number>(DataPageSizeKey, 25),
      loadingData: true,
      selectedLabels: new Set<string>(),
      selectedRows: new Set<number>(),
      data: { labels: [], totalRows: 0, rows: [] },
      dropping: false,
    });

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
        labels: Array.from(selectedLabels),
        mangoIDs: Array.from(selectedRows),
      })
      .then(() => dispatch({ type: ActionType.DropDataSuccess }));
  };

  // >> Return JSX.
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button
          sx={{ mb: 1 }}
          disabled={dropping || (selectedLabels.size == 0 && selectedRows.size == 0)}
          variant='contained'
          size='small'
          onClick={handleDrop}>
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
        onLabelSelect={selectedLabel => dispatch({ type: ActionType.SelectColumn, payload: selectedLabel })}
        onRowSelect={selectedRow => dispatch({ type: ActionType.SelectRow, payload: selectedRow })}
        selectedLabels={selectedLabels}
        selectedRows={selectedRows}
      />
    </React.Fragment>
  );
};
