// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = 'LOGISTIC_REGRESSION__LOADING',
  Reset = 'LOGISTIC_REGRESSION__RESET',

  NextStep = 'LOGISTIC_REGRESSION__NEXT_STEP',
  PrevStep = 'LOGISTIC_REGRESSION__PREV_STEP',
  UnlockNextStep = 'LOGISTIC_REGRESSION__UNLOCK_NEXT_STEP',
  LockNextStep = 'LOGISTIC_REGRESSION__LOCK_NEXT_STEP',
  JumpToStep = 'LOGISTIC_REGRESSION__JUMP_TO_STEP',
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

export type DispatchTypes = 
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | JumpToStep;

export type Dispatch = ReduxDispatch<DispatchTypes>;

