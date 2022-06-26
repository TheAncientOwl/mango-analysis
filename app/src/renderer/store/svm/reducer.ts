import { ActionType, DispatchTypes, ISummarySVM, KernelSVM } from './types';

import {
  IDefaultAnalysisStep,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
  newNextStepUnlockedArray,
} from '@store/IDefaultAnalysisState';

const StepsCount = 0;

interface IDefaultState extends IDefaultAnalysisStep {
  possible: {
    features: string[];
    targets: string[];
  };
  target: string;
  features: string[];
  kernel: KernelSVM;
  valuesToPredict: number[];
  prediction: number | undefined;
  summary: ISummarySVM;
  randomState: number;
  testSize: number;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCount).fill(false),

  possible: {
    features: [],
    targets: [],
  },
  target: '',
  features: [],
  kernel: 'linear',
  valuesToPredict: [],
  prediction: undefined,
  summary: {
    accuracy: 0,
    precision: 0,
    recall: 0,
  },
  randomState: 42,
  testSize: 20,
};

export const svmReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
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

    case ActionType.FetchedPossibleTargetsAndFeatures: {
      return {
        ...state,
        loading: false,
        possible: action.payload,
      };
    }

    case ActionType.ChangeTarget: {
      return {
        ...state,
        target: action.payload,
      };
    }

    case ActionType.ChangeFeatures: {
      return {
        ...state,
        features: action.payload,
      };
    }

    case ActionType.ChangeKernel: {
      return {
        ...state,
        kernel: action.payload,
      };
    }

    case ActionType.ChangeValuesToPredict: {
      return {
        ...state,
        valuesToPredict: action.payload,
      };
    }

    case ActionType.PredictionFinished: {
      return {
        ...state,
        loading: false,
        prediction: action.payload,
      };
    }

    case ActionType.ModelFinished: {
      return {
        ...state,
        loading: false,
        currentStep: 1,
        summary: action.payload,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, 0, true),
      };
    }

    case ActionType.SetServerFeaturesTargetSuccess: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.ChangeTestSize: {
      return {
        ...state,
        testSize: action.payload,
      };
    }

    case ActionType.ChangeRandomState: {
      return {
        ...state,
        randomState: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
