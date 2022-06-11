// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { IBasicDataFrame } from '@components/BasicDataFrame';

export enum ActionType {
  Loading = 'LOGISTIC_REGRESSION__LOADING',
  Reset = 'LOGISTIC_REGRESSION__RESET',

  NextStep = 'LOGISTIC_REGRESSION__NEXT_STEP',
  PrevStep = 'LOGISTIC_REGRESSION__PREV_STEP',
  UnlockNextStep = 'LOGISTIC_REGRESSION__UNLOCK_NEXT_STEP',
  LockNextStep = 'LOGISTIC_REGRESSION__LOCK_NEXT_STEP',
  JumpToStep = 'LOGISTIC_REGRESSION__JUMP_TO_STEP',

  SetIndependentVariables = 'LOGISTIC_REGRESSION__SET_INDEPENDENT_VARIABLES',
  SetDependentVariable = 'LOGISTIC_REGRESSION__SET_DEPENDENT_VARIABLE',
  SetRandState = 'LOGISTIC_REGRESSION__SET_RAND_STATE',
  SetTestSize = 'LOGISTIC_REGRESSION__SET_TEST_SIZE',
  SetMaxIterations = 'LOGISTIC_REGRESSION__SET_MAX_ITERATIONS',
  ModelFinished = 'LOGISTIC_REGRESSION__MODEL_FINISHED',
  FetchedVariables = 'LOGISTIC_REGRESSION__FETCHED_VARIABLES',

  ChangeValuesToPredict = 'LOGISTIC_REGRESSION__CHANGE_VALUES_TO_PREDICT',
  PredictionFinished = 'LOGISTIC_REGRESSION__PREDICTION_FINISHED',
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

interface SetMaxIterations {
  type: ActionType.SetMaxIterations;
  payload: number;
}

export interface IModelResult {
  confusionMatrix: {
    data: IBasicDataFrame;
    figPath: string;
    metrics: {
      accuracy: number;
      precision: number;
      recall: number;
    };
  };
  rocCurvePath: string;
}
interface ModelFinished {
  type: ActionType.ModelFinished;
  payload: IModelResult;
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
  | SetMaxIterations
  | ModelFinished
  | ChangeValuesToPredict
  | PredictionFinished
  | FetchedVariables;

export type Dispatch = ReduxDispatch<DispatchTypes>;
