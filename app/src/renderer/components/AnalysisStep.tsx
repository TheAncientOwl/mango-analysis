import React from 'react';

import { alpha } from '@mui/system';
import { Box, Stack, Typography, Chip, Button } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { theme } from '../config';
// import { logRender } from '@src/common/logRender';

interface Props {
  step: number;
  currentStep: number;
  totalSteps: number;
  title: string;
  optional?: boolean;
  canNext: boolean;
  onNext?: () => void;
  onBack?: () => void;
}

export interface StepConfig<State, Dispatch> {
  index: number;
  title: string;
  content: React.ReactNode;
  onNext?: (state: State, dispatch: Dispatch) => void;
  onPrev?: (state: State, dispatch: Dispatch) => void;
}

// displays logic component and
// an additional overlay on top of it if the logic is not from the current step
export const AnalysisStepLogic: React.FC = ({ children }) => {
  return (
    <Box className='analysis-step-logic' sx={{ position: 'relative' }}>
      {children}
      <Box
        className='analysis-step-logic-overlay'
        sx={{
          position: 'absolute',
          top: -15,
          left: -15,
          right: -15,
          bottom: -15,
          background: alpha(theme.palette.common.black, 0.2),
          borderRadius: theme.shape.borderRadius,
          zIndex: 20,
        }}></Box>
    </Box>
  );
};

// "syntactic sugar" just for code readability
export const AnalysisStepResult: React.FC = ({ children }) => {
  return <>{children}</>;
};

const doNothing = () => {
  ('');
};

const separator = <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>;

// main step component
export const AnalysisStep: React.FC<Props> = ({
  step,
  currentStep,
  totalSteps,
  title,
  optional = false,
  canNext,
  onNext = doNothing,
  onBack = doNothing,
  children,
}) => {
  // logRender(`Step: ${step}`);
  const heading = (
    <Stack>
      <Stack direction='row' alignItems='center' pl={1} gap={1}>
        {step < currentStep && <BeenhereIcon color='primary' />}
        <Typography variant='h6' color={step === currentStep ? '' : 'grey.400'}>
          Step {step} / {totalSteps} ~ {title}
        </Typography>
        {optional && <Chip label='optional' color='info' size='small' />}
      </Stack>

      {separator}
    </Stack>
  );

  const prevButton = (
    <Button
      startIcon={<NavigateBeforeIcon />}
      onClick={onBack}
      variant='contained'
      size='medium'
      disableElevation
      sx={{ mr: 1 }}>
      Prev
    </Button>
  );

  const nextButton = (
    <Button
      endIcon={<NavigateNextIcon />}
      onClick={onNext}
      variant='contained'
      size='medium'
      disabled={!canNext}
      disableElevation>
      Next
    </Button>
  );

  const buttons = (
    <Box sx={{ mt: 2 }}>
      {step > 1 && prevButton}
      {step < totalSteps && nextButton}
    </Box>
  );

  const content = (
    <React.Fragment>
      <Box p={1}>
        {children}
        {step === currentStep && buttons}
      </Box>

      {separator}
    </React.Fragment>
  );

  return (
    <Box
      sx={{
        mt: 4,
        '.analysis-step-logic > .analysis-step-logic-overlay': {
          visibility: step === currentStep ? 'hidden' : 'visible',
        },
      }}>
      {heading}

      {step <= currentStep && content}
    </Box>
  );
};

// mapper StepsConfig -> ReactNodes
export const mapConfigToSteps = <State, Dispatch>(
  stepsConfig: ReadonlyArray<StepConfig<State, Dispatch>>,
  nextStep: () => void,
  prevStep: () => void,
  currentStep: number,
  totalSteps: number,
  canStep: boolean[],
  state: State,
  dispatch: Dispatch
) => {
  return (
    <>
      {stepsConfig.map(step => (
        <AnalysisStep
          key={step.index}
          step={step.index}
          currentStep={currentStep}
          totalSteps={totalSteps}
          title={step.title}
          canNext={canStep[step.index + 1]}
          onNext={
            step.onNext
              ? () => {
                  nextStep();
                  step?.onNext?.(state, dispatch);
                }
              : nextStep
          }
          onBack={
            step.onPrev
              ? () => {
                  prevStep();
                  step?.onPrev?.(state, dispatch);
                }
              : prevStep
          }>
          {step.content}
        </AnalysisStep>
      ))}
    </>
  );
};
