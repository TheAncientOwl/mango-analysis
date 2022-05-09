import { DataFrameState } from '@renderer/components/data-manager/data-frame-viewer/types';

import {
  DataManagerActionTypes,
  DataManagerDispatchTypes,
  ScalingMethodType,
} from '@renderer/store/data-manager/types';

interface IDefaultState extends DataFrameState {
  loading: boolean;

  pageSize: number;
  page: number;

  feedbackMessage: string;
  feedbackMessageOpen: boolean;

  scalingMethod: ScalingMethodType;
}

const defaultState: IDefaultState = {
  loading: false,

  dataFrame: { labels: [], totalRows: 0, rows: [] },
  checkedLabels: [],
  checkedRows: [],
  decimalsPrecision: 3,

  page: 0,
  pageSize: 25,

  feedbackMessage: '',
  feedbackMessageOpen: false,

  scalingMethod: 'none',
};

export const dataManagerReducer = (
  state: IDefaultState = defaultState,
  action: DataManagerDispatchTypes
): IDefaultState => {
  switch (action.type) {
    case DataManagerActionTypes.Loading: {
      if (state.loading) return state;

      return {
        ...state,
        loading: true,
      };
    }

    case DataManagerActionTypes.FetchDataSuccess: {
      return {
        ...state,
        loading: false,
        dataFrame: action.payload.dataframe,
        feedbackMessage: action.payload.feedbackMessage,
        feedbackMessageOpen: action.payload.feedbackMessage !== '',
      };
    }

    case DataManagerActionTypes.CloseFeedbackMessage: {
      if (!state.feedbackMessageOpen) return state;

      return {
        ...state,
        feedbackMessageOpen: false,
      };
    }

    case DataManagerActionTypes.ChangePage: {
      return {
        ...state,
        page: action.payload,
      };
    }

    case DataManagerActionTypes.ChangePageSize: {
      return {
        ...state,
        pageSize: action.payload,
        page: 0,
      };
    }

    case DataManagerActionTypes.CheckLabel: {
      const checkedLabel = action.payload;

      const newSet = new Set(state.checkedLabels);

      if (newSet.has(checkedLabel)) newSet.delete(checkedLabel);
      else newSet.add(checkedLabel);

      return {
        ...state,
        checkedLabels: Array.from(newSet),
      };
    }

    case DataManagerActionTypes.CheckRow: {
      const checkedRow = action.payload;

      const newSet = new Set(state.checkedRows);

      if (newSet.has(checkedRow)) newSet.delete(checkedRow);
      else newSet.add(checkedRow);

      return {
        ...state,
        checkedRows: Array.from(newSet),
      };
    }

    case DataManagerActionTypes.ChangeDecimalsPrecision: {
      return {
        ...state,
        decimalsPrecision: action.payload,
      };
    }

    // fetch data after dropping
    case DataManagerActionTypes.ColumnsRowsDropped: {
      return {
        ...state,
        checkedLabels: [],
        checkedRows: [],
      };
    }

    case DataManagerActionTypes.DataFrameDropped: {
      return {
        ...state,
        loading: false,
        dataFrame: { labels: [], totalRows: 0, rows: [] },
        page: 0,
        pageSize: 25,
      };
    }

    case DataManagerActionTypes.CSVImportCanceled: {
      return {
        ...state,
        loading: false,
      };
    }

    case DataManagerActionTypes.ChangeScalingMethod: {
      return {
        ...state,
        scalingMethod: action.payload,
      };
    }

    // fetch data after scaling
    case DataManagerActionTypes.ScaledData: {
      return {
        ...state,
        scalingMethod: 'none',
      };
    }

    default: {
      return state;
    }
  }
};
