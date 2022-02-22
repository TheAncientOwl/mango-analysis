import { Data } from '@renderer/components/DataFrame';
import { CacheSystem } from '@src/renderer/api/CacheSystem';

export const DataPageIndexKey = 'data-page-index';
export const DataPageSizeKey = 'data-page-size';

export enum ActionType {
  ChangePageSize = 'CHANGE_PAGE_SIZE',
  ChangePageIndex = 'CHANGE_PAGE_INDEX',
  RequestDataSuccess = 'REQUEST_DATA_SUCCESS',
  SelectColumn = 'SELECT_COLUMN',
  SelectRow = 'SELECT_ROW',
  RequestDropData = 'REQUEST_DROP_DATA',
  DropDataSuccess = 'DROP_DATA_SUCCESS',
}

interface State {
  pageIndex: number;
  pageSize: number;
  data: Data;
  loadingData: boolean;
  selectedLabels: Set<string>;
  selectedRows: Set<number>;
}

interface Action {
  type: ActionType;
  payload?: string | number | Data;
}

export const viewTabReducer = (state: State, action: Action): State => {
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
        loadingData: true,
      };
    }

    case ActionType.DropDataSuccess: {
      return {
        ...state,
        loadingData: false,
        pageIndex: 0,
        selectedLabels: new Set<string>(),
        selectedRows: new Set<number>(),
      };
    }
  }
};