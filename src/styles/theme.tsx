// theme for mui
import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

import globalStyles from './globalStyles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      'system-ui',
      'Roboto',
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#aa2e25',
    },
    secondary: {
      main: '#00a152',
    },
    error: {
      main: red.A400,
    },
    background: {
      // 밤하늘 색상
      default: '#11233d',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  // Global style overrides
  components: {
    MuiCssBaseline: {
      styleOverrides: globalStyles.styles,
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
});

export default theme;
