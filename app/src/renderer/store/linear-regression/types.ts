// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = 'LINEAR_REGRESSION__LOADING',
  Reset = 'LINEAR_REGRESSION__RESET',

  NextStep = 'LINEAR_REGRESSION__NEXT_STEP',
  PrevStep = 'LINEAR_REGRESSION__PREV_STEP',
  UnlockNextStep = 'LINEAR_REGRESSION__UNLOCK_NEXT_STEP',
  LockNextStep = 'LINEAR_REGRESSION__LOCK_NEXT_STEP',
  JumpToStep = 'LINEAR_REGRESSION__JUMP_TO_STEP',

  FetchedVariables = 'LINEAR_REGRESSION__FETCHED_VARIABLES',
  ChangeLabelX = 'LINEAR_REGRESSION__CHANGE_LABEL_X',
  ChangeLabelY = 'LINEAR_REGRESSION__CHANGE_LABEL_Y',
  ChangeTestSize = 'LINEAR_REGRESSION__CHANGE_TEST_SIZE',
  ChangeRandomState = 'LINEAR_REGRESSION__CHANGE_RANDOM_STATE',
  ModelFinished = 'LINEAR_REGRESSION__MODEL_FINISHED',
  ChangeValueToPredict = 'LINEAR_REGRESSION__CHANGE_VALUE_TO_PREDICT',
  PredictionFinished = 'LINEAR_REGRESSION__PREDICTION_FINISHED',
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

interface FetchedVariables {
  type: ActionType.FetchedVariables;
  payload: string[];
}

interface ChangeLabelX {
  type: ActionType.ChangeLabelX;
  payload: string;
}

interface ChangeLabelY {
  type: ActionType.ChangeLabelY;
  payload: string;
}

interface ChangeTestSize {
  type: ActionType.ChangeTestSize;
  payload: number;
}

interface ChangeRandomState {
  type: ActionType.ChangeRandomState;
  payload: number;
}

export interface ModelResult {
  trainPath: string;
  testPath: string;
  coeff: number;
  intercept: number;
  equation: string;
  mse: number;
  rSquaredAdj: number;
  rSquared: number;
}
interface ModelFinished {
  type: ActionType.ModelFinished;
  payload: ModelResult;
}

interface PredictionFinished {
  type: ActionType.PredictionFinished;
  payload: number;
}

interface ChangeValueToPredict {
  type: ActionType.ChangeValueToPredict;
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
  | FetchedVariables
  | ChangeLabelX
  | ChangeLabelY
  | ChangeTestSize
  | ChangeRandomState
  | ModelFinished
  | PredictionFinished
  | ChangeValueToPredict;

export type Dispatch = ReduxDispatch<DispatchTypes>;
