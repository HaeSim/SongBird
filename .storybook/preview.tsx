import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import type { Preview } from '@storybook/react';

import theme from '@/styles/theme';

const withThemeProvider = (Story: any) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    viewport: {
      viewports: {
        /*
        breakpoints: {
    values: {
      xs: 0 ~ 599, 
      sm: 600 ~ 899,
      md: 900 ~ 1199,
      lg: 1200 ~ 1535,
      xl: 1536 ~
    },
  },
  */
        xs: {
          name: 'xs',
          styles: {
            width: '300px',
            height: '100%',
          },
          type: 'mobile',
        },
        sm: {
          name: 'sm',
          styles: {
            width: '600px',
            height: '100%',
          },
          type: 'tablet',
        },
        md: {
          name: 'md',
          styles: {
            width: '900px',
            height: '100%',
          },
          type: 'desktop',
        },
        lg: {
          name: 'lg',
          styles: {
            width: '1200px',
            height: '100%',
          },
          type: 'desktop',
        },
        xl: {
          name: 'xl',
          styles: {
            width: '1536px',
            height: '100%',
          },
          type: 'desktop',
        },
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
