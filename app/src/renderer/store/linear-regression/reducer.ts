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
  independentVariables: string[];
  dependentVariable: string;
  variables: string[];
  randState: number;
  testSize: number;
  modelResult: ModelResult;
  valuesToPredict: number[];
  prediction: number | undefined;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCountArray).fill(false),

  independentVariables: [],
  dependentVariable: '',
  variables: [],
  randState: 42,
  testSize: 33,
  modelResult: {
    coeff: [],
    intercept: 0,
    equation: '',
    mse: 0,
    rSquaredAdj: 0,
    rSquared: 0,
  },
  valuesToPredict: [],
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

    case ActionType.SetIndependentVariables: {
      return {
        ...state,
        independentVariables: action.payload,
      };
    }

    case ActionType.SetDependentVariable: {
      return {
        ...state,
        dependentVariable: action.payload,
      };
    }

    case ActionType.SetRandState: {
      return {
        ...state,
        randState: action.payload,
      };
    }

    case ActionType.SetTestSize: {
      return {
        ...state,
        testSize: action.payload,
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

    case ActionType.FetchedVariables: {
      return {
        ...state,
        loading: false,
        variables: action.payload,
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

    default: {
      return state;
    }
  }
};
