import { Dispatch, ActionType } from './types';

import { axios } from '@config/.';
import { store } from '..';

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

export const fetchPossibleFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.get('/som/possible-features');

    dispatch({ type: ActionType.FetchedPossibleFeatures, payload: res.data.features });
  } catch (err) {
    console.error(err);
  }
};

export const changeTarget = (value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeTarget, payload: value });
};

export const changeFeatures = (value: string[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeFeatures, payload: value });
};

export const runModel = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const { m, n } = store.getState().som;

    await axios.post('/som/run', { m, n });

    dispatch({ type: ActionType.ModelFinished });
  } catch (err) {
    console.log(err);
  }
};

export const setServerTargetFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const { target, features } = store.getState().som;

    await axios.post('/som/set-target-and-features', {
      target,
      features,
    });

    dispatch({ type: ActionType.SetServerFeaturesTargetSuccess });
  } catch (err) {
    console.error(err);
  }
};

export const pushDefaultPlot = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PushDefaultPlot });
};

export const changePlotAxisX = (index: number, value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePlotAxisX, payload: { index, value } });
};

export const changePlotAxisY = (index: number, value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePlotAxisY, payload: { index, value } });
};

export const fetchPlotSrc = (index: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const { title, xFeature, yFeature, plotOriginal } = store.getState().som.plots[index];

  try {
    const res = await axios.post('som/plot/predictions', {
      title,
      featureX: xFeature,
      featureY: yFeature,
    });

    dispatch({
      type: ActionType.FetchedPlotSrc,
      payload: {
        index,
        value: res.data.imagePath,
      },
    });
  } catch (err) {
    console.log(err);
  }

  if (!plotOriginal) return;

  try {
    const res = await axios.post('som/plot/original', {
      featureX: xFeature,
      featureY: yFeature,
    });

    dispatch({
      type: ActionType.FetchedPlotSrcOriginal,
      payload: {
        index,
        value: res.data.imagePath,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const togglePlotOriginal = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.TogglePlotOriginal, payload: index });
};

export const togglePlotOpen = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.TogglePlotOpen, payload: index });
};

export const deletePlot = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.DeletePlot, payload: index });
};

export const changePlotTitle = (index: number, title: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.ChangePlotTitle,
    payload: {
      index,
      value: title,
    },
  });
};

export const changeM = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeM, payload: value });
};

export const changeN = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeN, payload: value });
};
