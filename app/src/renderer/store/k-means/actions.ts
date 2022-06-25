import { Dispatch, ActionType, KMeansInit } from './types';

import { axios } from '@config/.';
import { store } from '@store/.';

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

export const changeLabel = (value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeLabel, payload: value });
};

export const changeFeatures = (value: string[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeFeatures, payload: value });
};

export const fetchPossibleLabelsFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.get('/kmeans/possible-labels-and-features');

    dispatch({
      type: ActionType.FetchedPossibleLabelsFeatures,
      payload: { labels: res.data.labels, features: res.data.features },
    });
  } catch (err) {
    console.error(err);
  }
};

export const changeInit = (value: KMeansInit) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeInit, payload: value });
};

export const changeInitN = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeNInit, payload: value });
};

export const changeMaxIter = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeMaxIter, payload: value });
};

export const changeRandomState = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeRandomState, payload: value });
};

export const changeClusterN = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeClusterN, payload: value });
};

export const setServerLabelFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const { label, features } = store.getState().kMeans;

  try {
    await axios.post('/kmeans/set-targets-and-label', { label, features });

    dispatch({ type: ActionType.SetLabelAndFeaturesSuccess });
  } catch (err) {
    console.log(err);
  }
};

export const plotElbow = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const { init, nInit, maxIter, randomState } = store.getState().kMeans;

  try {
    const res = await axios.post('/kmeans/plot/elbow', {
      init,
      nInit,
      maxIter,
      randomState,
    });

    dispatch({ type: ActionType.FetchedElbowSrc, payload: res.data.imagePath });
  } catch (err) {
    console.error(err);
  }
};

export const plotSilhouette = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const { init, nInit, maxIter, randomState } = store.getState().kMeans;

  try {
    const res = await axios.post('/kmeans/plot/silhouette', {
      init,
      nInit,
      maxIter,
      randomState,
    });

    dispatch({ type: ActionType.FetchedSilhouetteSrc, payload: res.data.imagePath });
  } catch (err) {
    console.error(err);
  }
};

export const runClusters = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const { init, nClusters, nInit, maxIter, randomState } = store.getState().kMeans;

  try {
    const res = await axios.post('/kmeans/cluster', {
      init,
      nInit,
      nClusters,
      maxIter,
      randomState,
    });

    dispatch({ type: ActionType.FetchedClusters, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
