import React from 'react';

import { Box, Stack, Typography, Chip, Button } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
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

  const buttons = (
    <Box sx={{ mt: 2 }}>
      {step > 1 && (
        <Button
          startIcon={<NavigateBeforeIcon />}
          onClick={onBack}
          variant='contained'
          size='medium'
          disableElevation
          sx={{ mr: 1 }}>
          Prev
        </Button>
      )}
      {step < totalSteps && (
        <Button
          endIcon={<NavigateNextIcon />}
          onClick={onNext}
          variant='contained'
          size='medium'
          disabled={!canNext}
          disableElevation>
          Next
        </Button>
      )}
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
