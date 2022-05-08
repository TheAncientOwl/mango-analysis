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
  ComponentsCountHints: Object.freeze({
    KaiserPath: 'pca-hints-kaiser-path',
    Threshold70: Object.freeze({
      Columns: 'pca-hints-threshold70-columns',
      Data: 'pca-hints-threshold70-data',
      Index: 'pca-hints-threshold70-index',
    }),
    EigenValuesG1: Object.freeze({
      Columns: 'pca-hints-egienvaluesg1-columns',
      Data: 'pca-hints-egienvaluesg1-data',
      Index: 'pca-hints-egienvaluesg1-index',
    }),
    Show: 'pca-hints-show',
  }),
  DataVisualizer: Object.freeze({
    pcaLabels: 'pca-data-visualizer-labels',
    targets: 'pca-data-visualizer-targets',
    plots: 'pca-data-visualizer-plots',
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clearCacheUtil = (obj: any) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof obj[key] !== 'string') clearCacheUtil(obj[key]);
    else CacheSystem.Remove(value as string);
  }
};

export const clearCache = () => clearCacheUtil(CacheKeys);
