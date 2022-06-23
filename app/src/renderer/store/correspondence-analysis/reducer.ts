import { ActionType, DispatchTypes, ICorrespondenceAnalysisResult } from './types';

import {
  IDefaultAnalysisStep,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
} from '@store/IDefaultAnalysisState';

const StepsCount = 3;

interface IDefaultState extends IDefaultAnalysisStep {
  nComponents: number;
  nIter: number;
  rowsName: string;
  columnsName: string;
  result: ICorrespondenceAnalysisResult;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCount).fill(false),

  nComponents: 2,
  nIter: 10,
  rowsName: 'Rows',
  columnsName: 'Columns',

  result: {
    rowCoordinates: { columns: [], data: [], index: [] },
    columnCoordinates: { columns: [], data: [], index: [] },
    summary: { columns: [], data: [], index: [] },
    totalInertia: undefined,
  },
};

export const correspondenceAnalysisReducer = (
  state: IDefaultState = defaultState,
  action: DispatchTypes
): IDefaultState => {
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

    case ActionType.ChangeComponentsN: {
      if (action.payload < 1) return state;

      return {
        ...state,
        nComponents: action.payload,
      };
    }

    case ActionType.ChangeIterN: {
      if (action.payload < 1) return state;

      return {
        ...state,
        nIter: action.payload,
      };
    }

    case ActionType.ChangeRowsName: {
      return {
        ...state,
        rowsName: action.payload,
      };
    }

    case ActionType.ChangeColumnsName: {
      return {
        ...state,
        columnsName: action.payload,
      };
    }

    case ActionType.AnalysisFinished: {
      const newSteps = [...state.nextStepUnlocked];
      newSteps[0] = true;

      return {
        ...state,
        loading: false,
        currentStep: 1,
        nextStepUnlocked: newSteps,
        result: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
