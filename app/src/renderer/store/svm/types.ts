// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = 'SVM__LOADING',
  Reset = 'SVM__RESET',

  NextStep = 'SVM__NEXT_STEP',
  PrevStep = 'SVM__PREV_STEP',
  UnlockNextStep = 'SVM__UNLOCK_NEXT_STEP',
  LockNextStep = 'SVM__LOCK_NEXT_STEP',
  JumpToStep = 'SVM__JUMP_TO_STEP',

  FetchedPossibleTargetsAndFeatures = 'SVM__FETCHED_POSSIBLE_TARGETS_AND_FEATURES',
  ChangeTarget = 'SVM__CHANGE_TARGET',
  ChangeFeatures = 'SVM__CHANGE_FEATURES',
  SetServerFeaturesTargetSuccess = 'SVM__SET_SERVER_FEATURES_TARGET_SUCCESS',
  ChangeKernel = 'SVM__CHANGE_KERNEL',
  ChangeTestSize = 'SVM__CHANGE_TEST_SIZE',
  ChangeRandomState = 'SVM__CHANGE_RANDOM_STATE',
  ChangeValuesToPredict = 'SVM__CHANGE_VALUES_TO_PREDICT',
  PredictionFinished = 'SVM__PREDICTION_FINISHED',
  ModelFinished = 'SVM__MODEL_FINISHED',
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

interface FetchedPossibleTargetsAndFeatures {
  type: ActionType.FetchedPossibleTargetsAndFeatures;
  payload: {
    features: string[];
    targets: string[];
  };
}

interface ChangeTarget {
  type: ActionType.ChangeTarget;
  payload: string;
}

interface ChangeFeatures {
  type: ActionType.ChangeFeatures;
  payload: string[];
}

export type KernelSVM = 'linear' | 'rbf';
interface ChangeKernel {
  type: ActionType.ChangeKernel;
  payload: KernelSVM;
}

interface ChangeValuesToPredict {
  type: ActionType.ChangeValuesToPredict;
  payload: number[];
}

interface PredictionFinished {
  type: ActionType.PredictionFinished;
  payload: number;
}

export interface ISummarySVM {
  accuracy: number;
  precision: number;
  recall: number;
}
interface ModelFinished {
  type: ActionType.ModelFinished;
  payload: ISummarySVM;
}

interface SetServerFeaturesTargetSuccess {
  type: ActionType.SetServerFeaturesTargetSuccess;
}

interface ChangeTestSize {
  type: ActionType.ChangeTestSize;
  payload: number;
}

interface ChangeRandomState {
  type: ActionType.ChangeRandomState;
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
  | FetchedPossibleTargetsAndFeatures
  | ChangeTarget
  | ChangeFeatures
  | ChangeKernel
  | ChangeValuesToPredict
  | PredictionFinished
  | ModelFinished
  | SetServerFeaturesTargetSuccess
  | ChangeTestSize
  | ChangeRandomState;

export type Dispatch = ReduxDispatch<DispatchTypes>;
