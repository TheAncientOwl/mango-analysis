import { CacheSystem } from '@renderer/api/CacheSystem';
import { CacheKeys } from './cacheKeys';

import { PCA } from './index';

import { BasicDataFrameProps } from '@renderer/components/BasicDataFrame';

export interface ComponentsCountHints {
  kaiserPath: string;
  threshold70: BasicDataFrameProps;
  eigenvaluesG1: BasicDataFrameProps;
}

const HintsKeys = CacheKeys.ComponentsCountHints;
export const cacheComponentsCountHints = (hints: ComponentsCountHints) => {
  CacheSystem.SetItem(HintsKeys.KaiserPath, hints.kaiserPath);

  CacheSystem.SetItem(HintsKeys.Threshold70.Columns, hints.threshold70.columns);
  CacheSystem.SetItem(HintsKeys.Threshold70.Data, hints.threshold70.data);
  CacheSystem.SetItem(HintsKeys.Threshold70.Index, hints.threshold70.index);

  CacheSystem.SetItem(HintsKeys.EigenValuesG1.Columns, hints.threshold70.columns);
  CacheSystem.SetItem(HintsKeys.EigenValuesG1.Data, hints.threshold70.data);
  CacheSystem.SetItem(HintsKeys.EigenValuesG1.Index, hints.threshold70.index);
};

const getDefaultComponentsCountHints = (): ComponentsCountHints => ({
  kaiserPath: CacheSystem.GetItemOrDefault(HintsKeys.KaiserPath, ''),
  threshold70: {
    columns: CacheSystem.GetItemOrDefault(HintsKeys.Threshold70.Columns, []),
    data: CacheSystem.GetItemOrDefault(HintsKeys.Threshold70.Data, []),
    index: CacheSystem.GetItemOrDefault(HintsKeys.Threshold70.Index, []),
  },
  eigenvaluesG1: {
    columns: CacheSystem.GetItemOrDefault(HintsKeys.EigenValuesG1.Columns, []),
    data: CacheSystem.GetItemOrDefault(HintsKeys.EigenValuesG1.Data, []),
    index: CacheSystem.GetItemOrDefault(HintsKeys.EigenValuesG1.Index, []),
  },
});

export interface PrincipalComponentsAnalysisState {
  loading: boolean;
  target: string;
  features: string[];
  unlockedSteps: boolean[];
  selectedComponentsCount: number;
  componentsCountHints: ComponentsCountHints | null;
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
  componentsCountHints: getDefaultComponentsCountHints(),
});
