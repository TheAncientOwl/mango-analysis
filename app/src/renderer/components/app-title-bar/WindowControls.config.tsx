import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface WindowControl {
  icon: React.ReactNode;
  action: () => void;
}

export const WindowControls: ReadonlyArray<WindowControl> = [
  {
    icon: <KeyboardArrowDownIcon />,
    action: window.electron.minimizeAppWindow,
  },
  {
    icon: <KeyboardArrowDownIcon sx={{ transform: 'rotate(180deg)' }} />,
    action: window.electron.toggleMaximizeAppWindow,
  },
  {
    icon: <CloseIcon sx={{ transform: 'scale(0.9)' }} />,
    action: window.electron.closeAppWindow,
  },
];
