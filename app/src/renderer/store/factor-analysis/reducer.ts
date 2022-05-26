import { BartlettTest, ActionType, DispatchTypes, DefaultHints } from './types';

import {
  IDefaultAnalysisStep,
  newNextStepUnlockedArray,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
} from '@store/IDefaultAnalysisState';
import { ComponentsID } from '@src/renderer/modules/factor-analysis/config/componentsID';

const StepsCountFactorAnalysis = 4;

interface IDefaultState extends IDefaultAnalysisStep {
  possibleFeatures: string[];
  features: string[];

  kmoModel: number;
  bartlett: BartlettTest;

  factorsNumber: number;

  defaultHints: DefaultHints;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCountFactorAnalysis).fill(false),

  possibleFeatures: [],
  features: [],

  factorsNumber: 2,

  kmoModel: undefined,
  bartlett: {
    chiSquare: undefined,
    pValue: undefined,
  },

  defaultHints: {
    eigenvalues: { columns: [], data: [], index: [] },
    screePlotSrc: '',
  },
};

export const factorAnalysisReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
  switch (action.type) {
    case ActionType.Loading: {
      return loading(state) as IDefaultState;
    }

    case ActionType.NextStep: {
      return nextStep(state, StepsCountFactorAnalysis) as IDefaultState;
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

    case ActionType.FetchedPossibleFeatures: {
      return {
        ...state,
        loading: false,
        possibleFeatures: action.payload,
      };
    }

    case ActionType.ChangeFeatures: {
      return {
        ...state,
        features: action.payload,
      };
    }

    case ActionType.ChangeFactorsNumber: {
      return {
        ...state,
        factorsNumber: action.payload,
      };
    }

    case ActionType.FetchedBartlettResults: {
      return {
        ...state,
        loading: false,
        bartlett: action.payload,
      };
    }

    case ActionType.FetchedKmoResult: {
      return {
        ...state,
        loading: false,
        kmoModel: action.payload,
      };
    }

    case ActionType.AnalysisFinished: {
      if (!state.loading) return state;

      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.FetchedDefaultHints: {
      return {
        ...state,
        loading: false,
        defaultHints: action.payload,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, ComponentsID.DefaultFactorAnalysis, true),
      };
    }

    case ActionType.ServerSetFeaturesSuccess: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.Reset: {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};
