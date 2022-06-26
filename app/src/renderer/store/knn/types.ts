// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = 'KNN__LOADING',
  Reset = 'KNN__RESET',

  NextStep = 'KNN__NEXT_STEP',
  PrevStep = 'KNN__PREV_STEP',
  UnlockNextStep = 'KNN__UNLOCK_NEXT_STEP',
  LockNextStep = 'KNN__LOCK_NEXT_STEP',
  JumpToStep = 'KNN__JUMP_TO_STEP',

  FetchedModel = 'KNN__FETCHED_MODEL',
  FetchedPossibleFeatures = 'KNN__FETCHED_POSSIBLE_FEATURES',
  ChangeTarget = 'KNN__CHANGE_TARGET',
  ChangeFeatures = 'KNN__CHANGE_FEATURES',
  ChangeTestSize = 'KNN__CHANGE_TEST_SIZE',
  ChangeRandomState = 'KNN__CHANGE_RANDOM_STATE',
  ChangeNeighborsN = 'KNN__CHANGE_N_NEIGHBORS',
  ChangedPredictionModelSuccess = 'KNN__CHANGED_PREDICTION_MODEL_SUCCESS',
  ChangeValuesToPredict = 'KNN__CHANGE_VALUES_TO_PREDICT',
  FetchedPrediction = 'KNN_FETCHED_PREDICTION',
}

interface Loading {
  type: ActionType.Loading;
}

interface Reset {
  type: ActionType.Reset;
}

interface NextStep {
  type: ActionType.NextStep;
}

interface PrevStep {
  type: ActionType.PrevStep;
}

interface UnlockNextStep {
  type: ActionType.UnlockNextStep;
  payload: number;
}

interface LockNextStep {
  type: ActionType.LockNextStep;
  payload: number;
}

interface JumpToStep {
  type: ActionType.JumpToStep;
  payload: number;
}

export interface IModelKNN {
  name: string;
  trainError: number;
  testError: number;
}
interface FetchedModel {
  type: ActionType.FetchedModel;
  payload: IModelKNN;
}

interface FetchedPossibleFeatures {
  type: ActionType.FetchedPossibleFeatures;
  payload: string[];
}

interface ChangeTarget {
  type: ActionType.ChangeTarget;
  payload: string;
}

interface ChangeFeatures {
  type: ActionType.ChangeFeatures;
  payload: string[];
}

interface ChangeTestSize {
  type: ActionType.ChangeTestSize;
  payload: number;
}

interface ChangeRandomState {
  type: ActionType.ChangeRandomState;
  payload: number;
}

interface ChangeNeighborsN {
  type: ActionType.ChangeNeighborsN;
  payload: number;
}

interface ChangedPredictionModelSuccess {
  type: ActionType.ChangedPredictionModelSuccess;
}

interface ChangeValuesToPredict {
  type: ActionType.ChangeValuesToPredict;
  payload: number[];
}

interface FetchedPrediction {
  type: ActionType.FetchedPrediction;
  payload: number;
}

export type DispatchTypes =
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | JumpToStep
  | FetchedModel
  | FetchedPossibleFeatures
  | FetchedPrediction
  | ChangeFeatures
  | ChangeNeighborsN
  | ChangeRandomState
  | ChangeTarget
  | ChangeTestSize
  | ChangeValuesToPredict
  | ChangedPredictionModelSuccess;

export type Dispatch = ReduxDispatch<DispatchTypes>;
