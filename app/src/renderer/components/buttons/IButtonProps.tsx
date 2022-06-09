// eslint-disable-next-line import/named
import { SxProps } from '@mui/system';

export interface IButton {
  sx?: SxProps;
  size?: 'large' | 'medium' | 'small';
  onClick: () => void;
  disabled?: boolean;
}
