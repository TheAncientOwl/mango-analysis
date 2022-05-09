// eslint-disable-next-line import/named
import { Dispatch } from 'redux';
import { LOADING, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, DataManagerDispatchTypes } from './DataManagerActionTypes';

import { axios } from '@renderer/config';

export const loadDataFrame =
  (page: number, pageSize: number) => async (dispatch: Dispatch<DataManagerDispatchTypes>) => {
    try {
      dispatch({
        type: LOADING,
      });

      const res = await axios.get(`/data/page/${page}/page-size/${pageSize}`);

      dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
    } catch (e) {
      dispatch({
        type: FETCH_DATA_FAIL,
      });
    }
  };
