import { CacheSystem } from '@renderer/api/CacheSystem';

import { PCA } from './index';

export interface PrincipalComponentsAnalysisState {
  loading: boolean;
  target: string;
  features: string[];
  unlockedSteps: boolean[];
  selectedComponentsCount: number;
  correlationMatrixPath: string;
  loadingsMatrixPath: string;
  scaledData: boolean;
  currentStep: number;
}

export const getDefaultState = (): PrincipalComponentsAnalysisState => ({
  loading: false,
  target: CacheSystem.GetItemOrDefault(PCA.CacheKeys.Target, ''),
  features: CacheSystem.GetItemOrDefault(PCA.CacheKeys.Features, []),
  unlockedSteps: CacheSystem.GetItemOrDefault(PCA.CacheKeys.UnlockedSteps, new Array(PCA.Steps.length + 1).fill(false)),
  selectedComponentsCount: CacheSystem.GetItemOrDefault(PCA.CacheKeys.ComponentsCount, 2),
  correlationMatrixPath: CacheSystem.GetItemOrDefault(PCA.CacheKeys.CorrelationMatrixPath, ''),
  loadingsMatrixPath: CacheSystem.GetItemOrDefault(PCA.CacheKeys.LoadingsMatrixPath, ''),
  scaledData: CacheSystem.GetItemOrDefault(PCA.CacheKeys.ScaledData, false),
  currentStep: CacheSystem.GetItemOrDefault(PCA.CacheKeys.CurrentStep, 1),
});
