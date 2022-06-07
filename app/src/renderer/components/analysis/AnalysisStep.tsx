import React from 'react';

import { Box, Stack, Typography, Chip, Button, Collapse } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

// import { logRender } from '@src/common/logRender';

import { RenderIf } from '@components/RenderIf';

import { getStepOverlayProps } from './AnalysisStepLogic';

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

const separator = <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>;

// main step component
export const AnalysisStep: React.FC<Props> = ({
  step,
  currentStep,
  totalSteps,
  title,
  optional = false,
  canNext,
  onNext,
  onBack,
  children,
}) => {
  // logRender(`Step: ${step}`);
  const stepActiveNow = step === currentStep;

  return (
    <Box sx={getStepOverlayProps(stepActiveNow)}>
      <Box>
        <Stack direction='row' alignItems='center' pl={1} gap={1}>
          {step < currentStep && <BeenhereIcon color='primary' />}
          <Typography variant='h6' color={stepActiveNow ? '' : 'grey.400'}>
            Step {step + 1} / {totalSteps} ~ {title}
          </Typography>
          {optional && <Chip label='optional' color='info' size='small' />}
        </Stack>

        {separator}
      </Box>

      <Collapse in={step <= currentStep}>
        <Box p={1} pl={2}>
          {children}
          <RenderIf condition={stepActiveNow}>
            <Box sx={{ mt: 2 }}>
              <RenderIf condition={step > 0}>
                <Button startIcon={<NavigateBeforeIcon />} onClick={onBack} size='medium' sx={{ mr: 1 }}>
                  Prev
                </Button>
              </RenderIf>

              <RenderIf condition={step < totalSteps}>
                <Button endIcon={<NavigateNextIcon />} onClick={onNext} size='medium' disabled={!canNext}>
                  Next
                </Button>
              </RenderIf>
            </Box>
          </RenderIf>
        </Box>
        {separator}
      </Collapse>
    </Box>
  );
};
