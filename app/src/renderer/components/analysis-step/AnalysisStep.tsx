import React from 'react';

import { Box, Stack, Typography, Chip, Button, Collapse } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { getStepOverlayProps } from './AnalysisStepLogic';
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
  const stepActiveNow = step === currentStep;

  return (
    <Box sx={getStepOverlayProps(stepActiveNow)}>
      <Stack>
        <Stack direction='row' alignItems='center' pl={1} gap={1}>
          {step < currentStep && <BeenhereIcon color='primary' />}
          <Typography variant='h6' color={stepActiveNow ? '' : 'grey.400'}>
            Step {step} / {totalSteps} ~ {title}
          </Typography>
          {optional && <Chip label='optional' color='info' size='small' />}
        </Stack>

        {separator}
      </Stack>

      <Collapse in={step <= currentStep}>
        <Box p={1}>
          {children}
          {stepActiveNow && (
            <Box sx={{ mt: 2 }}>
              {step > 1 && (
                <Button startIcon={<NavigateBeforeIcon />} onClick={onBack} size='medium' sx={{ mr: 1 }}>
                  Prev
                </Button>
              )}
              {step < totalSteps && (
                <Button endIcon={<NavigateNextIcon />} onClick={onNext} size='medium' disabled={!canNext}>
                  Next
                </Button>
              )}
            </Box>
          )}
        </Box>
        {separator}
      </Collapse>
    </Box>
  );
};
