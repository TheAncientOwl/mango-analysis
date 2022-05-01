import { CacheSystem } from '@renderer/api/CacheSystem';
import React from 'react';

export interface PrincipalComponentsAnalysisState {
  loading: boolean;
  target: string;
  features: Set<string>;
}

const PCA_CacheKeys = Object.freeze({
  Target: 'pca-target',
  Features: 'pca-features',
});

export const getDefeaultStatePCA = (): PrincipalComponentsAnalysisState => ({
  loading: false,
  target: CacheSystem.GetItemOrDefault(PCA_CacheKeys.Target, ''),
  features: new Set<string>(CacheSystem.GetItemOrDefault(PCA_CacheKeys.Features, [])),
});

export enum ActionType {
  Loading = 'LOADING',
  EndLoading = 'END_LOADING',

  ChangeTarget = 'CHANGE_TARGET',
  SetFeatures = 'SET_FEATURES',
  ClearFeatures = 'CLEAR_FEATURES',
}

interface Action {
  type: ActionType;
  payload?: string | Set<string>;
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

    default: {
      throw 'Action type not implemented! (PCA)';
    }
  }
};
