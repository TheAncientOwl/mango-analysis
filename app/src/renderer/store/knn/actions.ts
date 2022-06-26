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
    const { nNeighbors } = store.getState().knn;

    const res = await axios.post('/knn/arbitrary', { nNeighbors });

    dispatch({
      type: ActionType.FetchedArbitraryModel,
      payload: { name: res.data.name, testError: res.data.testError, trainError: res.data.trainError },
    });
  } catch (err) {
    console.error(err);
  }
};

export const runGridSearchCV = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.get('/knn/grid-search-cv');

    dispatch({
      type: ActionType.FetchedGridModel,
      payload: { name: res.data.name, testError: res.data.testError, trainError: res.data.trainError },
    });
  } catch (err) {
    console.error(err);
  }
};

export const runGridSearchCVWeights = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.get('/knn/grid-search-cv-weights');

    dispatch({
      type: ActionType.FetchedGridWeightsModel,
      payload: { name: res.data.name, testError: res.data.testError, trainError: res.data.trainError },
    });
  } catch (err) {
    console.error(err);
  }
};

export const runBagging = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.get('/knn/bagging');

    dispatch({
      type: ActionType.FetchedBaggedModel,
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

export const setServerTargetFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const { target, features, randomState, testSize } = store.getState().knn;

    await axios.post('/knn/set-target-and-features', {
      target,
      features,
      randomState,
      testSize: testSize / 100,
    });

    dispatch({ type: ActionType.SetServerFeaturesTargetSuccess });
  } catch (err) {
    console.error(err);
  }
};

export const resetModels = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ResetModels });
};
