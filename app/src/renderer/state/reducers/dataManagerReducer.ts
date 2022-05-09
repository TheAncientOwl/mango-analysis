import { DataFrame } from '@renderer/components/data-manager/data-frame-viewer/types';

import {
  LOADING,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAIL,
  DataManagerDispatchTypes,
} from '../actions/DataManagerActionTypes';

interface IDefaultState {
  loading: boolean;
  dataFrame?: DataFrame;
}

const defaultState: IDefaultState = {
  loading: false,
};

export const dataManagerReducer = (
  state: IDefaultState = defaultState,
  action: DataManagerDispatchTypes
): IDefaultState => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case FETCH_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        dataFrame: action.payload,
      };
    }

    case FETCH_DATA_FAIL: {
      return {
        ...state,
        loading: false,
        dataFrame: undefined,
      };
    }

    default: {
      return state;
    }
  }
};
