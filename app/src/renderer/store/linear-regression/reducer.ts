import { ActionType, DispatchTypes, ModelResult } from './types';

import {
  IDefaultAnalysisStep,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
} from '@store/IDefaultAnalysisState';

const StepsCountArray = 2;

interface IDefaultState extends IDefaultAnalysisStep {
  variables: string[];
  xLabel: string;
  yLabel: string;
  testSize: number;
  randomState: number;
  modelResult: ModelResult;
  valueToPredict: number | undefined;
  prediction: number | undefined;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCountArray).fill(false),

  variables: [],
  xLabel: '',
  yLabel: '',
  testSize: 33,
  randomState: 42,
  modelResult: {
    trainPath: '',
    testPath: '',
    coeff: 0,
    intercept: 0,
    equation: '',
    mse: 0,
    rSquaredAdj: 0,
    rSquared: 0,
  },
  valueToPredict: undefined,
  prediction: undefined,
};

export const linearRegressionReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
  switch (action.type) {
    case ActionType.Loading: {
      return loading(state) as IDefaultState;
    }

    case ActionType.NextStep: {
      return nextStep(state, StepsCountArray) as IDefaultState;
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

    case ActionType.FetchedVariables: {
      return {
        ...state,
        loading: false,
        variables: action.payload,
      };
    }

    case ActionType.ChangeLabelX: {
      return {
        ...state,
        xLabel: action.payload,
      };
    }
    case ActionType.ChangeLabelY: {
      return {
        ...state,
        yLabel: action.payload,
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

    case ActionType.ModelFinished: {
      const newSteps = [...state.nextStepUnlocked];
      newSteps.fill(true);

      return {
        ...state,
        loading: false,
        currentStep: 1,
        nextStepUnlocked: newSteps,
        modelResult: action.payload,
      };
    }

    case ActionType.PredictionFinished: {
      return {
        ...state,
        loading: false,
        prediction: action.payload,
      };
    }

    case ActionType.ChangeValueToPredict: {
      return {
        ...state,
        valueToPredict: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
