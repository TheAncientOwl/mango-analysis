import React from 'react';
import { PrincipalComponentsAnalysisState } from './state';
import { PCA } from './index';
import { CacheSystem } from '@renderer/api/CacheSystem';

export enum ActionType {
  Loading = 'LOADING',
  EndLoading = 'END_LOADING',

  ChangeTarget = 'CHANGE_TARGET',
  SetFeatures = 'SET_FEATURES',

  EnableStep = 'ENABLE_STEP',
  DisableStep = 'DISABLE_STEP',
  ChangeCanStep = 'CHANGE_CAN_STEP',
}

interface StepConfig {
  index: number;
  allowed: boolean;
}

interface Action {
  type: ActionType;
  payload?: string | Set<string> | boolean | number | StepConfig;
}

export type PCA_Dispatcher = React.Dispatch<Action>;

export const reducer = (state: PrincipalComponentsAnalysisState, action: Action): PrincipalComponentsAnalysisState => {
  switch (action.type) {
    case ActionType.Loading: {
      if (state.loading) return state;

      return {
        ...state,
        loading: true,
      };
    }

    case ActionType.EndLoading: {
      if (!state.loading) return state;

      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.ChangeTarget: {
      CacheSystem.SetItem(PCA.CacheKeys.Target, action.payload);

      return {
        ...state,
        target: action.payload as string,
      };
    }

    case ActionType.SetFeatures: {
      const newFeatures = action.payload as Set<string>;

      CacheSystem.SetItem(PCA.CacheKeys.Features, Array.from(newFeatures));

      return {
        ...state,
        features: newFeatures,
      };
    }

    case ActionType.ChangeCanStep: {
      const config = action.payload as StepConfig;

      if (state.canStep[config.index] === config.allowed) return state;

      const newSteps = [...state.canStep];
      newSteps[config.index] = config.allowed;

      CacheSystem.SetItem(PCA.CacheKeys.CanStep, newSteps);

      return {
        ...state,
        canStep: newSteps,
      };
    }

    default: {
      throw 'Action type not implemented! (PCA)';
    }
  }
};
