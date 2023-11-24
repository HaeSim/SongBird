import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import QuizIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';
import { Container } from '@mui/material';

import DrawerMenu from '@/components/organisms/Drawer';
import type { ILayoutComponent } from '@/types/common/component';
import { PAGES } from '@/utils/AppConfig';

const Default: ILayoutComponent = ({ children }) => (
  <Container
    component="main"
    maxWidth="lg"
    sx={{
      minHeight: 'calc(100vh - 255px)', // 255px = 0px (header) + 255px (footer)
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
);

export default Default;
