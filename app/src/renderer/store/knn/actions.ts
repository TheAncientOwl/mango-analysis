import { Dispatch, ActionType } from './types';

import { store } from '@store/.';
import { axios } from '@config/.';

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

export const runArbitrary = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const { nNeigbors } = store.getState().knn;

    const res = await axios.post('/knn/arbitrary', { nNeigbors });

    dispatch({
      type: ActionType.FetchedModel,
      payload: { name: res.data.name, testError: res.data.testError, trainError: res.data.trainError },
    });
  } catch (err) {
    console.error(err);
  }
};

export const runGridSearchCV = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.post('/knn/grid-search-cv');

    dispatch({
      type: ActionType.FetchedModel,
      payload: { name: res.data.name, testError: res.data.testError, trainError: res.data.trainError },
    });
  } catch (err) {
    console.error(err);
  }
};

export const runGridSearchCVWeights = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.post('/knn/grid-search-cv-weights');

    dispatch({
      type: ActionType.FetchedModel,
      payload: { name: res.data.name, testError: res.data.testError, trainError: res.data.trainError },
    });
  } catch (err) {
    console.error(err);
  }
};

export const runBagging = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.post('/knn/bagging');

    dispatch({
      type: ActionType.FetchedModel,
      payload: { name: res.data.name, testError: res.data.testError, trainError: res.data.trainError },
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchPossibleFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.get('/knn/possible-features');

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

export const changeTestSize = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeTestSize, payload: value });
};

export const changeRandomState = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeRandomState, payload: value });
};

export const changeNeighborsN = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeNeighborsN, payload: value });
};

export const setServerPredictionModel = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const { predictionModelName } = store.getState().knn;

    await axios.post('/knn/set-model', { modelName: predictionModelName });

    dispatch({ type: ActionType.ChangedPredictionModelSuccess });
  } catch (err) {
    console.error(err);
  }
};

export const changeValuesToPredict = (values: number[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeValuesToPredict, payload: values });
};

export const runPrediction = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const { valuesToPredict } = store.getState().knn;

    const res = await axios.post('/knn/predict', { values: valuesToPredict });

    dispatch({ type: ActionType.FetchedPrediction, payload: res.data.prediction });
  } catch (err) {
    console.error(err);
  }
};
