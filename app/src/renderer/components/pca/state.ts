import React from 'react';

import { CacheSystem } from '@renderer/api/CacheSystem';

import { PCA_Steps } from './PCA.steps';

export interface PrincipalComponentsAnalysisState {
  loading: boolean;
  target: string;
  features: Set<string>;
  canStep: boolean[];
}

export const PCA_CacheKeys = Object.freeze({
  Target: 'pca-target',
  Features: 'pca-features',
  CanStep: 'pca-can-step',
  ComponentsCount: 'pca-components-count',
  CurrentStep: 'pca-current-step',
  CorrelationMatrixPath: 'pca-correlation-matrix-path',
  LoadingsMatrixPath: 'pca-loadings-matrix-path',
});

export const PCA_clearCache = () => {
  for (const [, cacheKey] of Object.entries(PCA_CacheKeys)) {
    CacheSystem.Remove(cacheKey);
  }
};

export const getDefeaultStatePCA = (): PrincipalComponentsAnalysisState => ({
  loading: false,
  target: CacheSystem.GetItemOrDefault(PCA_CacheKeys.Target, ''),
  features: new Set<string>(CacheSystem.GetItemOrDefault(PCA_CacheKeys.Features, [])),
  canStep: CacheSystem.GetItemOrDefault(PCA_CacheKeys.CanStep, new Array(PCA_Steps.length + 1).fill(false)),
});

export enum ActionType {
  Loading = 'LOADING',
  EndLoading = 'END_LOADING',

  ChangeTarget = 'CHANGE_TARGET',
  SetFeatures = 'SET_FEATURES',
  ClearFeatures = 'CLEAR_FEATURES',

  EnableStep = 'ENABLE_STEP',
  DisableStep = 'DISABLE_STEP',
  ChangeCanStep = 'CHANGE_CAN_STEP',
}

interface CanStepSlotConfig {
  index: number;
  value: boolean;
}

interface Action {
  type: ActionType;
  payload?: string | Set<string> | boolean | number | CanStepSlotConfig;
}

export type PCA_Dispatcher = React.Dispatch<Action>;

const changeFeatures = (
  state: PrincipalComponentsAnalysisState,
  newFeatures: Set<string>
): PrincipalComponentsAnalysisState => {
  CacheSystem.SetItem(PCA_CacheKeys.Features, Array.from(newFeatures));

  return {
    ...state,
    features: newFeatures,
  };
};

export const pcaStateReducer = (
  state: PrincipalComponentsAnalysisState,
  action: Action
): PrincipalComponentsAnalysisState => {
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
      CacheSystem.SetItem(PCA_CacheKeys.Target, action.payload);

      return {
        ...state,
        target: action.payload as string,
      };
    }

    case ActionType.SetFeatures: {
      const newFeatures = action.payload as Set<string>;

      return changeFeatures(state, newFeatures);
    }

    case ActionType.ClearFeatures: {
      return changeFeatures(state, new Set<string>());
    }

    case ActionType.ChangeCanStep: {
      const config = action.payload as CanStepSlotConfig;

      if (state.canStep[config.index] === config.value) return state;

      const newSteps = [...state.canStep];
      newSteps[config.index] = config.value;

      CacheSystem.SetItem(PCA_CacheKeys.CanStep, newSteps);

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
