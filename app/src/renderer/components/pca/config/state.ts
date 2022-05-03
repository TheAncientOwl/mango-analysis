import { CacheSystem } from '@renderer/api/CacheSystem';

import { PCA } from './index';

export interface PrincipalComponentsAnalysisState {
  loading: boolean;
  target: string;
  features: Set<string>;
  canStep: boolean[];
}

export const getDefaultState = (): PrincipalComponentsAnalysisState => ({
  loading: false,
  target: CacheSystem.GetItemOrDefault(PCA.CacheKeys.Target, ''),
  features: new Set<string>(CacheSystem.GetItemOrDefault(PCA.CacheKeys.Features, [])),
  canStep: CacheSystem.GetItemOrDefault(PCA.CacheKeys.CanStep, new Array(PCA.Steps.length + 1).fill(false)),
});
