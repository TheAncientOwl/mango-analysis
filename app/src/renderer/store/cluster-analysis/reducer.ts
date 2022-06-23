import { ActionType, DispatchTypes } from './types';

import {
  IDefaultAnalysisStep,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
} from '@store/IDefaultAnalysisState';

const StepsCount = 0;

interface IDefaultState extends IDefaultAnalysisStep {
  specificStatePropery: string;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCount).fill(false),

  specificStatePropery: 'dunno',
};

export const clusterAnalysisReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
  switch (action.type) {
    case ActionType.Loading: {
      return loading(state) as IDefaultState;
    }

    case ActionType.NextStep: {
      return nextStep(state, StepsCount) as IDefaultState;
    }

    case ActionType.PrevStep: {
      return prevStep(state) as IDefaultState;
    }

    case ActionType.UnlockNextStep: {
      return unlockNextStep(state, action.payload) as IDefaultState;
    }

    case ActionType.LockNextStep: {
      return lockNextStep(state, action.payload) as IDefaultState;
    }

    case ActionType.JumpToStep: {
      return jumpToStep(state, action.payload) as IDefaultState;
    }

    case ActionType.Reset: {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};

