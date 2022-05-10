import React from 'react';

import { AnalysisStep } from './AnalysisStep';
import { StepConfig } from './index';

// mapper StepsConfig -> ReactNodes
export const mapConfigToSteps = (
  stepsConfig: ReadonlyArray<StepConfig>,
  nextStep: () => void,
  prevStep: () => void,
  currentStep: number,
  totalSteps: number,
  canStep: boolean[]
) => {
  return (
    <React.Fragment>
      {stepsConfig.map(step => (
        <AnalysisStep
          key={step.index}
          step={step.index}
          currentStep={currentStep}
          totalSteps={totalSteps}
          title={step.title}
          canNext={canStep[step.index]}
          onNext={
            step.onNext
              ? () => {
                  nextStep();
                  step?.onNext?.();
                }
              : nextStep
          }
          onBack={
            step.onPrev
              ? () => {
                  prevStep();
                  step?.onPrev?.();
                }
              : prevStep
          }>
          {step.content}
        </AnalysisStep>
      ))}
    </React.Fragment>
  );
};
