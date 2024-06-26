import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import type { FC } from 'react';
import React from 'react';

import Profile from '@/components/molecules/Profile';
import { useAppRouting } from '@/hooks/useAppRouting';

type MenuItems = {
  name: string;
  icon: JSX.Element;
  path: string;
  value: string;
};

interface IDrawerProps {
  menuItemList: MenuItems[];
  open: boolean; // Receive open state as a prop
  onClose: () => void; // Receive a function to close the drawer
}

const DrawerMenu: FC<IDrawerProps> = ({ menuItemList, open, onClose }) => {
  const { currentMenu, navigateToMenu } = useAppRouting();

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        zIndex: 1199,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          transition: 'width 0.2s ease-in-out',
        },
      }}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <Profile />
      </Toolbar>
      <Divider />
      <List>
        {menuItemList.map((item) => (
          <ListItemButton
            key={item.name}
            selected={currentMenu.value === item.value}
            onClick={() => {
              navigateToMenu(item.value);
              onClose(); // Close the drawer when a menu item is clicked
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
      {/* New List for additional hyperlinks */}
      <Box
        sx={{
          marginTop: 'auto',
        }}
      >
        <List>
          {/* Privacy Policy Link */}
          <ListItemButton
            component="a"
            href="/privacy"
            onClick={onClose}
            sx={{}}
          >
            <ListItemText
              primary="개인정보처리방침"
              primaryTypographyProps={{
                fontSize: '0.8rem',
              }}
            />
          </ListItemButton>
          {/* Terms of Service Link */}
          <ListItemButton component="a" href="/terms" onClick={onClose}>
            <ListItemText
              primary="서비스이용약관"
              primaryTypographyProps={{
                fontSize: '0.8rem',
              }}
            />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
