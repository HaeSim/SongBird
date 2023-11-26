import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

import DrawerMenu from '@/components/organisms/Drawer';
import { useAppRouting } from '@/hooks/useAppRouting';
import type { ILayoutComponent } from '@/types/common/component';
import { PAGES } from '@/utils/AppConfig';

const Default: ILayoutComponent = ({ children }) => {
  const { currentMenu } = useAppRouting();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="h1" fontWeight="bold">
            {currentMenu.label}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          width: '100%',
          height: '100vh',
          paddingTop: '32px',
        }}
      >
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
              name: PAGES.QUIZ.label,
              icon: <QuizIcon />,
              path: PAGES.QUIZ.path,
              value: PAGES.QUIZ.value,
            },
            {
              name: PAGES.DASHBOARD.label,
              icon: <DashboardIcon />,
              path: PAGES.DASHBOARD.path,
              value: PAGES.DASHBOARD.value,
            },
            {
              name: PAGES.SETTINGS.label,
              icon: <SettingsIcon />,
              path: PAGES.SETTINGS.path,
              value: PAGES.SETTINGS.value,
            },
          ]}
        />
        {children}
      </Container>
    </>
  );
};

export default Default;
