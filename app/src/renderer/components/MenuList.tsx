import React from 'react';

import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
// eslint-disable-next-line import/named
import MuiMenu, { MenuProps } from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ListItem } from '@mui/material';

const StyledMenu = styled((props: MenuProps) => (
  <MuiMenu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

interface Props {
  startIcon: React.ReactNode;
  title: string;
  items: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>[];
}

export const MenuList: React.FC<Props> = ({ startIcon, title, items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    const open = Boolean(anchorEl);
    if (open) setAnchorEl(null);
    else setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        id='menu-list-button'
        aria-controls={open ? 'menu-list' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={toggleMenu}
        startIcon={startIcon}
        endIcon={<KeyboardArrowDownIcon />}>
        {title}
      </Button>

      <StyledMenu
        id='menu-list'
        MenuListProps={{
          'aria-labelledby': 'menu-list-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={toggleMenu}>
        {items.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </StyledMenu>
    </>
  );
};
