import { axios } from '@config/.';
import { DecimalsPrecision } from '@modules/data-manager/data-frame-viewer/types';
import { Dispatch, ActionType, ScalingMethodType } from './types';

const fetchDataFrame = async (dispatch: Dispatch, page: number, pageSize: number, feedbackMessage = '') => {
  dispatch({
    type: ActionType.Loading,
  });

  const res = await axios.get(`/data/page/${page}/page-size/${pageSize}`);

  dispatch({
    type: ActionType.FetchDataSuccess,
    payload: { dataframe: res.data.dataframe, feedbackMessage: feedbackMessage },
  });
};

export const loadDataFrame = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
  await fetchDataFrame(dispatch, page, pageSize);
};

export const closeFeedbackMessage = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.CloseFeedbackMessage });
};

export const changePage = (page: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePage, payload: page });
};

export const changePageSize = (pageSize: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePageSize, payload: pageSize });
};

export const checkLabel = (label: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.CheckLabel, payload: label });
};

export const checkRow = (row: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.CheckRow, payload: row });
};

export const changeDecimalsPrecision = (precision: DecimalsPrecision) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeDecimalsPrecision, payload: precision });
};

export const dropRowsAndColumns =
  (rows: number[], columns: string[], page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Loading });

    await axios.post('/data/drop/rows+cols', {
      labels: columns,
      mangoIDs: rows,
    });

    dispatch({ type: ActionType.ColumnsRowsDropped });

    await fetchDataFrame(dispatch, page, pageSize, 'Rows and Columns dropped!');
  };

export const dropDataFrame = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('/data/drop-all');

  dispatch({ type: ActionType.DataFrameDropped });
};

export const importCSV = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const filePath = await window.electron.getImportCsvPath();

  if (filePath === null) {
    dispatch({ type: ActionType.CSVImportCanceled });
    return { canceled: true };
  }

  await axios.get(`/data/import/csv/${filePath}`);

  await fetchDataFrame(dispatch, page, pageSize, 'CSV Imported');

  dispatch({ type: ActionType.CSVImported });

  return { canceled: false };
};

export const changeScalingMethod = (method: ScalingMethodType) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeScalingMethod, payload: method });
};

export const scaleData = (method: ScalingMethodType, page: number, pageSize: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('/data/scale', {
    method: method,
  });

  dispatch({ type: ActionType.ScaledData });

  await fetchDataFrame(dispatch, page, pageSize, 'Data scaled!');
};
