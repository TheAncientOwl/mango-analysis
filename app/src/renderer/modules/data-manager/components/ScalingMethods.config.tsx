import React from 'react';

import { Box } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { ScalingMethodType } from '@store/data-manager/types';

interface ScalingMethodConfig {
  id: number;
  display: string;
  type: ScalingMethodType;
  tooltip: string | React.ReactNode;
}

const tooltipParagraphChar = <DoubleArrowIcon sx={{ fontSize: '10px', mr: '2px' }} />;
export const ScalingMethods: ReadonlyArray<ScalingMethodConfig> = [
  {
    id: 0,
    display: 'none',
    type: 'none',
    tooltip: (
      <React.Fragment>
        <Box>{tooltipParagraphChar}Choose a scaling method</Box>
      </React.Fragment>
    ),
  },
  {
    id: 1,
    display: 'maximum-absolute',
    type: 'maximum_absolute_scaling',
    tooltip: (
      <React.Fragment>
        <Box>
          {tooltipParagraphChar}Rescales each feature between -1 and 1 by dividing every observation by its maximum
          absolute value.
        </Box>
      </React.Fragment>
    ),
  },
  {
    id: 2,
    display: 'min-max',
    type: 'min_max_scaling',
    tooltip: (
      <React.Fragment>
        <Box>
          {tooltipParagraphChar}Rescales the feature to a fixed range of [0,1] by subtracting the minimum value of the
          feature and then dividing by the range.
        </Box>
        <Box sx={{ fontStyle: 'italic' }}>(often called normalization)</Box>
      </React.Fragment>
    ),
  },
  {
    id: 3,
    display: 'robust',
    type: 'robust_scaling',
    tooltip: (
      <React.Fragment>
        <Box>
          {tooltipParagraphChar}
          Transforms the data into a distribution with a mean of 0 and a standard deviation of 1.
        </Box>
        <Box>
          {tooltipParagraphChar}Each standardized value is computed by subtracting the mean of the corresponding feature
          and then dividing by the standard deviation.
        </Box>
        <Box sx={{ fontStyle: 'italic' }}>(often called standardization)</Box>
      </React.Fragment>
    ),
  },
  {
    id: 4,
    display: 'z-score',
    type: 'z_score_scaling',
    tooltip: (
      <React.Fragment>
        <Box>
          {tooltipParagraphChar}Scale each feature of the data set by subtracting the median and then dividing by the
          interquartile range.
        </Box>
        <Box>
          {tooltipParagraphChar}The interquartile range (IQR) is defined as the difference between the third and the
          first quartile.
        </Box>
      </React.Fragment>
    ),
  },
];
