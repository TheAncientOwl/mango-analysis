import { DataFrameState } from '@renderer/components/data-manager/data-frame-viewer/types';

import {
  LOADING,
  FETCH_DATA_SUCCESS,
  DataManagerDispatchTypes,
  ScalingMethodType,
  CLOSE_FEEDBACK_MESSAGE,
  CHANGE_PAGE,
  CHANGE_PAGE_SIZE,
  CHECK_LABEL,
  CHECK_ROW,
  CHANGE_DECIMALS_PRECISION,
  COLUMNS_ROWS_DROPPED,
  DATA_FRAME_DROPPED,
  CSV_IMPORT_CANCELED,
  CHANGE_SCALING_METHOD,
  SCALED_DATA,
} from '../actions/DataManagerActionTypes';

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
    case LOADING: {
      if (state.loading) return state;

      return {
        ...state,
        loading: true,
      };
    }

    case FETCH_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        dataFrame: action.payload.dataframe,
        feedbackMessage: action.payload.feedbackMessage,
        feedbackMessageOpen: action.payload.feedbackMessage !== '',
      };
    }

    case CLOSE_FEEDBACK_MESSAGE: {
      if (!state.feedbackMessageOpen) return state;

      return {
        ...state,
        feedbackMessageOpen: false,
      };
    }

    case CHANGE_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }

    case CHANGE_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.payload,
        page: 0,
      };
    }

    case CHECK_LABEL: {
      const checkedLabel = action.payload;

      const newSet = new Set(state.checkedLabels);

      if (newSet.has(checkedLabel)) newSet.delete(checkedLabel);
      else newSet.add(checkedLabel);

      return {
        ...state,
        checkedLabels: Array.from(newSet),
      };
    }

    case CHECK_ROW: {
      const checkedRow = action.payload;

      const newSet = new Set(state.checkedRows);

      if (newSet.has(checkedRow)) newSet.delete(checkedRow);
      else newSet.add(checkedRow);

      return {
        ...state,
        checkedRows: Array.from(newSet),
      };
    }

    case CHANGE_DECIMALS_PRECISION: {
      return {
        ...state,
        decimalsPrecision: action.payload,
      };
    }

    // fetch data after dropping
    case COLUMNS_ROWS_DROPPED: {
      return {
        ...state,
        checkedLabels: [],
        checkedRows: [],
      };
    }

    case DATA_FRAME_DROPPED: {
      return {
        ...state,
        loading: false,
        dataFrame: { labels: [], totalRows: 0, rows: [] },
        page: 0,
        pageSize: 25,
      };
    }

    case CSV_IMPORT_CANCELED: {
      return {
        ...state,
        loading: false,
      };
    }

    case CHANGE_SCALING_METHOD: {
      return {
        ...state,
        scalingMethod: action.payload,
      };
    }

    // fetch data after scaling
    case SCALED_DATA: {
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
