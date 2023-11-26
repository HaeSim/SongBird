import {
  CacheProvider,
  type EmotionCache,
  ThemeProvider,
} from '@emotion/react';
import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import { type ReactElement, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { URL } from 'url';

import ComponentModal from '@/components/organisms/ComponentModal';
import MessageModal from '@/components/organisms/MessageModal';
import * as gtag from '@/lib/gtag';
import createEmotionCache from '@/styles/createEmotionCache';
import theme from '@/styles/theme';
import type { NextPageWithLayout } from '@/utils/common';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  const Component = props.Component as NextPageWithLayout;

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  const [open, setOpen] = useState<boolean>(false);

  // router 이동 간 Backdrop 출력
  useEffect(() => {
    const handleStart = () => {
      setOpen(true);
    };
    const handleComplete = (url: URL) => {
      setOpen(false);
      gtag.pageview(url);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    return () => {
      window.removeEventListener('resize', () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    };
  }, []);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
              <ComponentModal />
              <MessageModal />
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: (tm) => tm.zIndex.drawer + 1,
                }}
                open={open}
                onClick={() => setOpen(false)}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Analytics />
            </ThemeProvider>
          </CacheProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};
export default MyApp;
