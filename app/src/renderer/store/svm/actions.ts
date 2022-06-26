import { Dispatch, ActionType, KernelSVM } from './types';

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

export const fetchPossibleFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const res = await axios.get('/svm/possible-features');

    dispatch({ type: ActionType.FetchedPossibleTargetsAndFeatures, payload: res.data });
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

export const changeKernel = (value: KernelSVM) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeKernel, payload: value });
};

export const setServerTargetFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  try {
    const { target, features, testSize, randomState } = store.getState().svm;

    await axios.post('/som/set-target-and-features', {
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

export const runModel = () => async (dispatch: Dispatch) => {
  const { target, features, testSize, randomState, kernel } = store.getState().svm;

  try {
    // >> set args
    dispatch({ type: ActionType.Loading });

    await axios.post('/svm/set-target-and-features', {
      target,
      features,
      randomState,
      testSize: testSize / 100,
    });

    dispatch({ type: ActionType.SetServerFeaturesTargetSuccess });

    // >> run
    dispatch({ type: ActionType.Loading });

    const res = await axios.post('/svm/run-model', { kernel });

    dispatch({ type: ActionType.ModelFinished, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const predict = (values: number[]) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.post('/svm/predict', { values });

  dispatch({ type: ActionType.PredictionFinished, payload: res.data.prediction });
};

export const changeValuesToPredict = (values: number[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeValuesToPredict, payload: values });
};
