import React from 'react';

import { Box, Backdrop, CircularProgress } from '@mui/material';

import { IStep } from './index';
import { AnalysisStep } from './AnalysisStep';

interface Props {
  loading: boolean;

  stepsConfig: ReadonlyArray<IStep>;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  unlockedSteps: boolean[];
}

export const Analysis: React.FC<Props> = props => {
  return (
    <>
      <Box sx={{ p: 2, pb: '15em', overflowY: 'scroll' }}>
        {props.stepsConfig.map(step => (
          <AnalysisStep
            key={step.index}
            step={step.index}
            currentStep={props.currentStep}
            totalSteps={props.stepsConfig.length}
            title={step.title}
            canNext={props.unlockedSteps[step.index]}
            onNext={
              step.onNext
                ? () => {
                    props.nextStep();
                    step?.onNext?.();
                  }
                : props.nextStep
            }
            onBack={
              step.onPrev
                ? () => {
                    props.prevStep();
                    step?.onPrev?.();
                  }
                : props.prevStep
            }>
            {step.content}
          </AnalysisStep>
        ))}
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={props.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};
