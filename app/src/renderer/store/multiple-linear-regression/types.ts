// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = 'MULTIPLE_LINEAR_REGRESSION__LOADING',
  Reset = 'MULTIPLE_LINEAR_REGRESSION__RESET',

  NextStep = 'MULTIPLE_LINEAR_REGRESSION__NEXT_STEP',
  PrevStep = 'MULTIPLE_LINEAR_REGRESSION__PREV_STEP',
  UnlockNextStep = 'MULTIPLE_LINEAR_REGRESSION__UNLOCK_NEXT_STEP',
  LockNextStep = 'MULTIPLE_LINEAR_REGRESSION__LOCK_NEXT_STEP',
  JumpToStep = 'MULTIPLE_LINEAR_REGRESSION__JUMP_TO_STEP',

  SetIndependentVariables = 'MULTIPLE_LINEAR_REGRESSION__SET_INDEPENDENT_VARIABLES',
  SetDependentVariable = 'MULTIPLE_LINEAR_REGRESSION__SET_DEPENDENT_VARIABLE',
  SetRandState = 'MULTIPLE_LINEAR_REGRESSION__SET_RAND_STATE',
  SetTestSize = 'MULTIPLE_LINEAR_REGRESSION__SET_TEST_SIZE',
  ModelFinished = 'MULTIPLE_LINEAR_REGRESSION__MODEL_FINISHED',
  FetchedVariables = 'MULTIPLE_LINEAR_REGRESSION__FETCHED_VARIABLES',

  ChangeValuesToPredict = 'MULTIPLE_LINEAR_REGRESSION__CHANGE_VALUES_TO_PREDICT',
  PredictionFinished = 'MULTIPLE_LINEAR_REGRESSION__PREDICTION_FINISHED',
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

interface SetDependentVariables {
  type: ActionType.SetIndependentVariables;
  payload: string[];
}

interface SetIndependentVariable {
  type: ActionType.SetDependentVariable;
  payload: string;
}

interface SetRandState {
  type: ActionType.SetRandState;
  payload: number;
}

interface SetTestSize {
  type: ActionType.SetTestSize;
  payload: number;
}

export interface ModelResult {
  coeff: number[];
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

interface ChangeValuesToPredict {
  type: ActionType.ChangeValuesToPredict;
  payload: number[];
}

interface PredictionFinished {
  type: ActionType.PredictionFinished;
  payload: number;
}

interface FetchedVariables {
  type: ActionType.FetchedVariables;
  payload: string[];
}

export type DispatchTypes =
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | JumpToStep
  | SetIndependentVariable
  | SetDependentVariables
  | SetRandState
  | SetTestSize
  | ModelFinished
  | ChangeValuesToPredict
  | PredictionFinished
  | FetchedVariables;

export type Dispatch = ReduxDispatch<DispatchTypes>;
