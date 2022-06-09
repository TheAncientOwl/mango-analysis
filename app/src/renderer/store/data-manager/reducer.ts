import { IDataFrameState } from '@modules/data-manager/data-frame-viewer/types';

import { ActionType, DispatchTypes, ScalingMethodType } from './types';

interface IDefaultState extends IDataFrameState {
  loading: boolean;
  importedData: boolean;

  pageSize: number;
  page: number;

  feedbackMessage: string;
  feedbackMessageOpen: boolean;

  scalingMethod: ScalingMethodType;
}

const defaultState: IDefaultState = {
  loading: false,
  importedData: false,

  dataFrame: { labels: [], totalRows: 0, rows: [], missingValues: false },
  checkedLabels: [],
  checkedRows: [],
  decimalsPrecision: 3,

  page: 0,
  pageSize: 25,

  feedbackMessage: '',
  feedbackMessageOpen: false,

  scalingMethod: 'none',
};

export const dataManagerReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
  switch (action.type) {
    case ActionType.Loading: {
      if (state.loading) return state;

      return {
        ...state,
        loading: true,
      };
    }

    case ActionType.FetchDataSuccess: {
      return {
        ...state,
        loading: false,
        dataFrame: action.payload.dataframe,
        feedbackMessage: action.payload.feedbackMessage,
        feedbackMessageOpen: action.payload.feedbackMessage !== '',
        importedData: action.payload.dataframe.totalRows > 0,
      };
    }

    case ActionType.CloseFeedbackMessage: {
      if (!state.feedbackMessageOpen) return state;

      return {
        ...state,
        feedbackMessageOpen: false,
      };
    }

    case ActionType.ChangePage: {
      return {
        ...state,
        page: action.payload,
      };
    }

    case ActionType.ChangePageSize: {
      return {
        ...state,
        pageSize: action.payload,
        page: 0,
      };
    }

    case ActionType.CheckLabel: {
      const checkedLabel = action.payload;

      const newSet = new Set(state.checkedLabels);

      if (newSet.has(checkedLabel)) newSet.delete(checkedLabel);
      else newSet.add(checkedLabel);

      return {
        ...state,
        checkedLabels: Array.from(newSet),
      };
    }

    case ActionType.CheckRow: {
      const checkedRow = action.payload;

      const newSet = new Set(state.checkedRows);

      if (newSet.has(checkedRow)) newSet.delete(checkedRow);
      else newSet.add(checkedRow);

      return {
        ...state,
        checkedRows: Array.from(newSet),
      };
    }

    case ActionType.ChangeDecimalsPrecision: {
      return {
        ...state,
        decimalsPrecision: action.payload,
      };
    }

    // fetch data after dropping
    case ActionType.ColumnsRowsDropped: {
      return {
        ...state,
        checkedLabels: [],
        checkedRows: [],
      };
    }

    case ActionType.DataFrameDropped: {
      return {
        ...state,
        loading: false,
        dataFrame: { labels: [], totalRows: 0, rows: [], missingValues: false },
        page: 0,
        pageSize: 25,
        importedData: false,
      };
    }

    case ActionType.CSVImportCanceled: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.ChangeScalingMethod: {
      return {
        ...state,
        scalingMethod: action.payload,
      };
    }

    // fetch data after scaling
    case ActionType.ScaledData: {
      return {
        ...state,
        scalingMethod: 'none',
      };
    }

    case ActionType.CSVImported: {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};
