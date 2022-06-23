import React from 'react';

import { SelectSlider } from './SelectSlider';

interface Props {
  randomState: number;
  testSize: number;

  onRandomStateChange: (newState: number) => void;
  onTestSizeChange: (newTestSize: number) => void;
}

export const TestSizeSelector: React.FC<Props> = ({ randomState, testSize, onRandomStateChange, onTestSizeChange }) => {
  return (
    <>
      <SelectSlider
        maxWidth='32em'
        sliderWidth='20em'
        label='Random State'
        min={0}
        max={100}
        onChange={value => onRandomStateChange(value)}
        value={randomState}
        sx={{ mb: 4 }}
      />

      <SelectSlider
        maxWidth='32em'
        sliderWidth='20em'
        label='Test Size'
        min={0}
        max={100}
        onChange={value => onTestSizeChange(value)}
        value={testSize}
        sx={{ mb: 3 }}
      />
    </>
  );
};
