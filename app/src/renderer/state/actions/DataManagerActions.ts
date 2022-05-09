// eslint-disable-next-line import/named
import {
  LOADING,
  FETCH_DATA_SUCCESS,
  CLOSE_FEEDBACK_MESSAGE,
  Dispatch,
  CHANGE_PAGE,
  CHANGE_PAGE_SIZE,
  CHECK_LABEL,
  CHECK_ROW,
  CHANGE_DECIMALS_PRECISION,
  COLUMNS_ROWS_DROPPED,
  DATA_FRAME_DROPPED,
  CSV_IMPORT_CANCELED,
  ScalingMethodType,
  CHANGE_SCALING_METHOD,
  SCALED_DATA,
} from './DataManagerActionTypes';

import { axios } from '@renderer/config';
import { DecimalsPrecision } from '@renderer/components/data-manager/data-frame-viewer/types';

const fetchDataFrame = async (dispatch: Dispatch, page: number, pageSize: number, feedbackMessage = '') => {
  dispatch({
    type: LOADING,
  });

  const res = await axios.get(`/data/page/${page}/page-size/${pageSize}`);

  dispatch({
    type: FETCH_DATA_SUCCESS,
    payload: { dataframe: res.data.dataframe, feedbackMessage: feedbackMessage },
  });
};

export const loadDataFrame = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
  await fetchDataFrame(dispatch, page, pageSize);
};

export const closeFeedbackMessage = () => (dispatch: Dispatch) => {
  dispatch({ type: CLOSE_FEEDBACK_MESSAGE });
};

export const changePage = (page: number) => (dispatch: Dispatch) => {
  dispatch({ type: CHANGE_PAGE, payload: page });
};

export const changePageSize = (pageSize: number) => (dispatch: Dispatch) => {
  dispatch({ type: CHANGE_PAGE_SIZE, payload: pageSize });
};

export const checkLabel = (label: string) => (dispatch: Dispatch) => {
  dispatch({ type: CHECK_LABEL, payload: label });
};

export const checkRow = (row: number) => (dispatch: Dispatch) => {
  dispatch({ type: CHECK_ROW, payload: row });
};

export const changeDecimalsPrecision = (precision: DecimalsPrecision) => (dispatch: Dispatch) => {
  dispatch({ type: CHANGE_DECIMALS_PRECISION, payload: precision });
};

export const dropRowsAndColumns =
  (rows: number[], columns: string[], page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch({ type: LOADING });

    await axios.post('/data/drop/rows+cols', {
      labels: columns,
      mangoIDs: rows,
    });

    dispatch({ type: COLUMNS_ROWS_DROPPED });

    await fetchDataFrame(dispatch, page, pageSize, 'Rows and Columns dropped!');
  };

export const dropDataFrame = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING });

  await axios.post('/data/drop-all');

  dispatch({ type: DATA_FRAME_DROPPED });
};

export const importCSV = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING });

  const filePath = await window.electron.getImportCsvPath();

  if (filePath === null) {
    dispatch({ type: CSV_IMPORT_CANCELED });
    return;
  }

  await axios.get(`/data/import/csv/${filePath}`);

  await fetchDataFrame(dispatch, page, pageSize, 'CSV Imported');
};

export const changeScalingMethod = (method: ScalingMethodType) => (dispatch: Dispatch) => {
  dispatch({ type: CHANGE_SCALING_METHOD, payload: method });
};

export const scaleData = (method: ScalingMethodType, page: number, pageSize: number) => async (dispatch: Dispatch) => {
  dispatch({ type: LOADING });

  await axios.post('/data/scale', {
    method: method,
  });

  dispatch({ type: SCALED_DATA });

  await fetchDataFrame(dispatch, page, pageSize, 'Data scaled!');
};
