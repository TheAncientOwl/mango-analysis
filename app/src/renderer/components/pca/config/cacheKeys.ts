import { CacheSystem } from '@renderer/api/CacheSystem';

export const CacheKeys = Object.freeze({
  Target: 'pca-target',
  Features: 'pca-features',
  CanStep: 'pca-can-step',
  ComponentsCount: 'pca-components-count',
  CurrentStep: 'pca-current-step',
  CorrelationMatrixPath: 'pca-correlation-matrix-path',
  LoadingsMatrixPath: 'pca-loadings-matrix-path',
});

export const clearCache = () => {
  for (const [, cacheKey] of Object.entries(CacheKeys)) {
    CacheSystem.Remove(cacheKey);
  }
};
