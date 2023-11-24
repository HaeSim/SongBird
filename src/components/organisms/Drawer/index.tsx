import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';

import Profile from '@/components/molecules/Profile';
import { useAppRouting } from '@/hooks/useAppRouting';

import AreaForDrawerOpenByHover from './index.styled';

type MenuItems = {
  name: string;
  icon: JSX.Element;
  path: string;
  value: string;
};

interface IDrawerProps {
  menuItemList: MenuItems[];
}

const DrawerMenu: FC<IDrawerProps> = ({ menuItemList }) => {
  const { currentMenu, navigateToMenu } = useAppRouting();
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            transition: 'width 0.2s ease-in-out',
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
          }}
        >
          <Profile
            name="Dean"
            avatar="https://avatars.githubusercontent.com/u/45196240?v=4"
          />
        </Toolbar>
        <Divider />
        <List>
          {menuItemList.map((item) => (
            <ListItemButton
              key={item.name}
              selected={currentMenu.value === item.value}
              onClick={() => {
                navigateToMenu(item.value);
                handleDrawerClose();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <AreaForDrawerOpenByHover onMouseEnter={handleDrawerOpen} />
    </>
  );
};

export default DrawerMenu;
