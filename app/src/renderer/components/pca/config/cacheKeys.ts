import { CacheSystem } from '@renderer/api/CacheSystem';

export const CacheKeys = Object.freeze({
  Target: 'pca-target',
  Features: 'pca-features',
  UnlockedSteps: 'pca-unlocked-steps',
  ComponentsCount: 'pca-components-count',
  CurrentStep: 'pca-current-step',
  CorrelationMatrixPath: 'pca-correlation-matrix-path',
  LoadingsMatrixPath: 'pca-loadings-matrix-path',
  ScaledData: 'pca-scaled-data',
});

export const clearCache = () => {
  for (const [, cacheKey] of Object.entries(CacheKeys)) {
    CacheSystem.Remove(cacheKey);
  }
};
