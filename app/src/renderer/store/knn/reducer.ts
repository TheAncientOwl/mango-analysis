import { ActionType, DispatchTypes, IModelKNN } from './types';

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

const StepsCount = 4;

interface IDefaultState extends IDefaultAnalysisStep {
  possbileFeatures: string[];
  target: string;
  features: string[];
  nNeigbors: number;
  predictionModelName: string;
  valuesToPredict: number[];
  prediction: number | undefined;
  models: IModelKNN[];
  testSize: number;
  randomState: number;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCount).fill(false),

  possbileFeatures: [],
  target: '',
  features: [],
  nNeigbors: 4,
  predictionModelName: '',
  valuesToPredict: [],
  prediction: undefined,
  models: [],
  testSize: 20,
  randomState: 42,
};

export const knnReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
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

    case ActionType.FetchedModel: {
      if (state.models.some(model => model === action.payload)) return state;

      return {
        ...state,
        loading: false,
        models: [...state.models, action.payload],
      };
    }

    case ActionType.FetchedPossibleFeatures: {
      return {
        ...state,
        loading: false,
        possbileFeatures: action.payload,
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

    case ActionType.ChangeNeighborsN: {
      if (action.payload < 1) return state;

      return {
        ...state,
        nNeigbors: action.payload,
      };
    }

    case ActionType.ChangedPredictionModelSuccess: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.ChangeValuesToPredict: {
      return {
        ...state,
        valuesToPredict: action.payload,
      };
    }

    case ActionType.FetchedPrediction: {
      return {
        ...state,
        loading: false,
        prediction: action.payload,
      };
    }

    case ActionType.SetServerFeaturesTargetSuccess: {
      return {
        ...state,
        loading: false,
        currentStep: 1,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, 0, true),
      };
    }

    default: {
      return state;
    }
  }
};
