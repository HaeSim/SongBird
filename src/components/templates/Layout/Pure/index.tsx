import CampaignIcon from '@mui/icons-material/Campaign';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import QuizIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import DrawerMenu from '@/components/organisms/Drawer';
import { useAppRouting } from '@/hooks/useAppRouting';
import theme from '@/styles/theme';
import type { ILayoutComponent } from '@/types/common/component';
import { PAGES } from '@/utils/AppConfig';

const Pure: ILayoutComponent = ({ children }) => {
  const { currentMenu } = useAppRouting();
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State to manage drawer open/close

  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: '64px',
          backgroundColor: theme.palette.background.default,
          color: '#fff',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 10%)',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(!isDrawerOpen)} // Toggle drawer when the button is clicked
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            fontWeight="bold"
            sx={{ flexGrow: 1 }}
          >
            {currentMenu.label}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth={false} disableGutters>
        <DrawerMenu
          menuItemList={[
            {
              // HOME
              name: PAGES.HOME.label,
              icon: <HomeIcon />,
              path: PAGES.HOME.path,
              value: PAGES.HOME.value,
            },
            {
              // NOTICE
              name: PAGES.NOTICE.label,
              icon: <CampaignIcon />,
              path: PAGES.NOTICE.path,
              value: PAGES.NOTICE.value,
            },
            {
              // QUIZ
              name: PAGES.QUIZ.label,
              icon: <QuizIcon />,
              path: PAGES.QUIZ.path,
              value: PAGES.QUIZ.value,
            },
            {
              // DASHBOARD
              name: PAGES.DASHBOARD.label,
              icon: <DashboardIcon />,
              path: PAGES.DASHBOARD.path,
              value: PAGES.DASHBOARD.value,
            },
            {
              // SETTINGS
              name: PAGES.SETTINGS.label,
              icon: <SettingsIcon />,
              path: PAGES.SETTINGS.path,
              value: PAGES.SETTINGS.value,
            },
          ]}
          open={isDrawerOpen}
          onClose={() => setDrawerOpen(false)} // Close drawer when the menu item is clicked
        />
        {children}
      </Container>
    </>
  );
};

export default Pure;
