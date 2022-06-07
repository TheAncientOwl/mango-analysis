export { Analysis } from './Analysis';

export { AnalysisStepLogic } from './AnalysisStepLogic';
export { AnalysisStepResult } from './AnalysisStepResult';

export interface StepConfig {
  index: number;
  title: string;
  content: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
}
