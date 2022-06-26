import { axios } from '@config/.';
import { store } from '..';
import { Dispatch, ActionType } from './types';

export const resetState = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Reset });
};

export const nextStep = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.NextStep });
};

export const prevStep = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PrevStep });
};

export const unlockNextStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.UnlockNextStep, payload: step });
};

export const lockNextStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.LockNextStep, payload: step });
};

export const jumpToStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.JumpToStep, payload: step });
};

export const changeComponentsN = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeComponentsN, payload: value });
};

export const changeIterN = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeIterN, payload: value });
};

export const changeRowsName = (value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeRowsName, payload: value });
};

export const changeColumnsName = (value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeColumnsName, payload: value });
};

export const runAnalysis =
  (nComponents: number, nIter: number, rowsName: string, columnsName: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Loading });

    const res = await axios.post('/ca/run', {
      nComponents,
      nIter,
      rowsName,
      columnsName,
    });

    dispatch({ type: ActionType.AnalysisFinished, payload: res.data });
  };

export const changePlotTitle = (index: number, value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePlotTitle, payload: { index, value } });
};

export const changePlotComponentX = (index: number, value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePlotComponentX, payload: { index, value } });
};

export const changePlotComponentY = (index: number, value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePlotComponentY, payload: { index, value } });
};

export const togglePlotRowLabels = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.TogglePlotRowLabels, payload: index });
};

export const togglePlotColLabels = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.TogglePlotColLabels, payload: index });
};

export const pushDefaultPlot = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PushDefaultPlot });
};

export const fetchPlot = (index: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const { title, xComponent, yComponent, showRowLabels, showColLabels } =
    store.getState().correspondenceAnalysis.plots[index];

  try {
    const res = await axios.post('/ca/plot', { title, xComponent, yComponent, showRowLabels, showColLabels });

    dispatch({
      type: ActionType.FetchedPlotSrc,
      payload: {
        index,
        value: res.data.imgPath,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const togglePlotOpen = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.TogglePlotOpen, payload: index });
};

export const deletePlot = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.DeletePlot, payload: index });
};
