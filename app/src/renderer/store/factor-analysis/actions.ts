import { axios } from '@config/.';

import { Dispatch, ActionType } from './types';

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

export const fetchPossibleFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/factor-analysis/possible-features');

  dispatch({ type: ActionType.FetchedPossibleFeatures, payload: res.data.features });
};

export const changeFeatures = (features: string[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeFeatures, payload: features });
};

export const setServerFeatures = (features: string[]) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('/factor-analysis/set-features', { features });

  dispatch({ type: ActionType.ServerSetFeaturesSuccess });
};

export const fetchBartlett = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/factor-analysis/tests/bartlett');

  dispatch({
    type: ActionType.FetchedBartlettResults,
    payload: {
      chiSquare: res.data.chiSquareValue,
      pValue: res.data.pValue,
    },
  });
};

export const fetchKMO = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/factor-analysis/tests/kmo');

  dispatch({ type: ActionType.FetchedKmoResult, payload: res.data.kmoModel });
};

export const runDefaultAnalysis = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('/factor-analysis/analyze');

  const res = await axios.get('/factor-analysis/default-hints');

  dispatch({
    type: ActionType.FetchedDefaultHints,
    payload: {
      screePlotSrc: res.data.screePlotPath,
      eigenvalues: res.data.eigenvalues,
    },
  });
};

export const runAnalysis =
  (nFactors: number, rotation = 'none') =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Loading });

    await axios.post('/factor-analysis/analyze', { nFactors, rotation });

    dispatch({ type: ActionType.AnalysisFinished });
  };

export const resetState = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Reset });
};
