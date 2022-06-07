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

export type DispatchTypes = Loading | Reset | NextStep | PrevStep | UnlockNextStep | LockNextStep | JumpToStep;

export type Dispatch = ReduxDispatch<DispatchTypes>;
