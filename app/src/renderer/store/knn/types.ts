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

  FetchedArbitraryModel = 'KNN__FETCHED_MODEL_ARBITRARY',
  FetchedGridModel = 'KNN__FETCHED_MODEL_GRID',
  FetchedGridWeightsModel = 'KNN__FETCHED_MODEL_GRID_WEIGHTS',
  FetchedBaggedModel = 'KNN__FETCHED_MODEL_BAGGED',
  ResetModels = 'KNN__RESET_MODELS',

  FetchedPossibleFeatures = 'KNN__FETCHED_POSSIBLE_FEATURES',
  ChangeTarget = 'KNN__CHANGE_TARGET',
  ChangeFeatures = 'KNN__CHANGE_FEATURES',
  ChangeTestSize = 'KNN__CHANGE_TEST_SIZE',
  ChangeRandomState = 'KNN__CHANGE_RANDOM_STATE',
  ChangeNeighborsN = 'KNN__CHANGE_N_NEIGHBORS',
  ChangedPredictionModelSuccess = 'KNN__CHANGED_PREDICTION_MODEL_SUCCESS',
  ChangePredictionModelName = 'KNN__CHANGE_PREDICTION_MODEL_NAME',
  ChangeValuesToPredict = 'KNN__CHANGE_VALUES_TO_PREDICT',
  FetchedPrediction = 'KNN__FETCHED_PREDICTION',
  SetServerFeaturesTargetSuccess = 'KNN__SET_SERVER_FEATURES_TARGET_SUCCESS',
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
  trainError: number | undefined;
  testError: number | undefined;
}
interface FetchedArbitraryModel {
  type: ActionType.FetchedArbitraryModel;
  payload: IModelKNN;
}
interface FetchedGridModel {
  type: ActionType.FetchedGridModel;
  payload: IModelKNN;
}
interface FetchedGridWeightsModel {
  type: ActionType.FetchedGridWeightsModel;
  payload: IModelKNN;
}
interface FetchedBaggedModel {
  type: ActionType.FetchedBaggedModel;
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
  payload: string;
}

interface ChangeValuesToPredict {
  type: ActionType.ChangeValuesToPredict;
  payload: number[];
}

interface FetchedPrediction {
  type: ActionType.FetchedPrediction;
  payload: number;
}

interface SetServerFeaturesTargetSuccess {
  type: ActionType.SetServerFeaturesTargetSuccess;
}

interface ResetModels {
  type: ActionType.ResetModels;
}

export type DispatchTypes =
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | JumpToStep
  | FetchedPossibleFeatures
  | FetchedPrediction
  | ChangeFeatures
  | ChangeNeighborsN
  | ChangeRandomState
  | ChangeTarget
  | ChangeTestSize
  | ChangeValuesToPredict
  | ChangedPredictionModelSuccess
  | SetServerFeaturesTargetSuccess
  | FetchedArbitraryModel
  | FetchedGridModel
  | FetchedGridWeightsModel
  | FetchedBaggedModel
  | ResetModels;

export type Dispatch = ReduxDispatch<DispatchTypes>;
