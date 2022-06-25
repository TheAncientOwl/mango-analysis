// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = 'K_MEANS__LOADING',
  Reset = 'K_MEANS__RESET',

  NextStep = 'K_MEANS__NEXT_STEP',
  PrevStep = 'K_MEANS__PREV_STEP',
  UnlockNextStep = 'K_MEANS__UNLOCK_NEXT_STEP',
  LockNextStep = 'K_MEANS__LOCK_NEXT_STEP',
  JumpToStep = 'K_MEANS__JUMP_TO_STEP',
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
