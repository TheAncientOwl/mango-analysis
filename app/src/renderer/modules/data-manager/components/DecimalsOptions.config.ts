import { DecimalsPrecision } from '../data-frame-viewer/types';

interface DecimalsOptionConfig {
  id: number;
  display: string;
  value: DecimalsPrecision;
}

export const DecimalsOptions: ReadonlyArray<DecimalsOptionConfig> = [
  {
    id: 0,
    display: 'all',
    value: 'all',
  },
  ...new Array(7).fill(0).map((item, index) => {
    const value = index + 1;

    return {
      id: value as number,
      display: value.toString(),
      value: value as DecimalsPrecision,
    } as DecimalsOptionConfig;
  }),
];
