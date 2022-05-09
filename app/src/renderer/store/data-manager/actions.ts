import { axios } from '@renderer/config';
import { DecimalsPrecision } from '@renderer/modules/data-manager/data-frame-viewer/types';
import { DataManagerDispatch, DataManagerActionTypes, ScalingMethodType } from './types';

const fetchDataFrame = async (dispatch: DataManagerDispatch, page: number, pageSize: number, feedbackMessage = '') => {
  dispatch({
    type: DataManagerActionTypes.Loading,
  });

  const res = await axios.get(`/data/page/${page}/page-size/${pageSize}`);

  dispatch({
    type: DataManagerActionTypes.FetchDataSuccess,
    payload: { dataframe: res.data.dataframe, feedbackMessage: feedbackMessage },
  });
};

export const loadDataFrame = (page: number, pageSize: number) => async (dispatch: DataManagerDispatch) => {
  await fetchDataFrame(dispatch, page, pageSize);
};

export const closeFeedbackMessage = () => (dispatch: DataManagerDispatch) => {
  dispatch({ type: DataManagerActionTypes.CloseFeedbackMessage });
};

export const changePage = (page: number) => (dispatch: DataManagerDispatch) => {
  dispatch({ type: DataManagerActionTypes.ChangePage, payload: page });
};

export const changePageSize = (pageSize: number) => (dispatch: DataManagerDispatch) => {
  dispatch({ type: DataManagerActionTypes.ChangePageSize, payload: pageSize });
};

export const checkLabel = (label: string) => (dispatch: DataManagerDispatch) => {
  dispatch({ type: DataManagerActionTypes.CheckLabel, payload: label });
};

export const checkRow = (row: number) => (dispatch: DataManagerDispatch) => {
  dispatch({ type: DataManagerActionTypes.CheckRow, payload: row });
};

export const changeDecimalsPrecision = (precision: DecimalsPrecision) => (dispatch: DataManagerDispatch) => {
  dispatch({ type: DataManagerActionTypes.ChangeDecimalsPrecision, payload: precision });
};

export const dropRowsAndColumns =
  (rows: number[], columns: string[], page: number, pageSize: number) => async (dispatch: DataManagerDispatch) => {
    dispatch({ type: DataManagerActionTypes.Loading });

    await axios.post('/data/drop/rows+cols', {
      labels: columns,
      mangoIDs: rows,
    });

    dispatch({ type: DataManagerActionTypes.ColumnsRowsDropped });

    await fetchDataFrame(dispatch, page, pageSize, 'Rows and Columns dropped!');
  };

export const dropDataFrame = () => async (dispatch: DataManagerDispatch) => {
  dispatch({ type: DataManagerActionTypes.Loading });

  await axios.post('/data/drop-all');

  dispatch({ type: DataManagerActionTypes.DataFrameDropped });
};

export const importCSV = (page: number, pageSize: number) => async (dispatch: DataManagerDispatch) => {
  dispatch({ type: DataManagerActionTypes.Loading });

  const filePath = await window.electron.getImportCsvPath();

  if (filePath === null) {
    dispatch({ type: DataManagerActionTypes.CSVImportCanceled });
    return;
  }

  await axios.get(`/data/import/csv/${filePath}`);

  await fetchDataFrame(dispatch, page, pageSize, 'CSV Imported');
};

export const changeScalingMethod = (method: ScalingMethodType) => (dispatch: DataManagerDispatch) => {
  dispatch({ type: DataManagerActionTypes.ChangeScalingMethod, payload: method });
};

export const scaleData =
  (method: ScalingMethodType, page: number, pageSize: number) => async (dispatch: DataManagerDispatch) => {
    dispatch({ type: DataManagerActionTypes.Loading });

    await axios.post('/data/scale', {
      method: method,
    });

    dispatch({ type: DataManagerActionTypes.ScaledData });

    await fetchDataFrame(dispatch, page, pageSize, 'Data scaled!');
  };
