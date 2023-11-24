/* eslint-disable react/no-invalid-html-attribute */
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import theme from '@/styles/theme';
import type { IMetaInfoComponent } from '@/types/common/component';
import { AppConfig } from '@/utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const MetaInfo: IMetaInfoComponent = ({
  title,
  description,
  canonical,
}: IMetaProps) => {
  const getAppleTouchStartupImageLink = (width: number, height: number) => {
    return `/splashscreens/splash_${width}x${height}.png`;
  };

  const generateSplashscreenLinks = () => {
    const splashscreenLinks = [
      { width: 375, height: 812, ratio: 3 }, // iPhone 13 Mini, iPhone 12 Mini, iPhone X
      { width: 393, height: 852, ratio: 3 }, // iPhone 14 Pro
      { width: 390, height: 844, ratio: 3 }, // iPhone 14, iPhone 13 Pro, iPhone 13
      { width: 414, height: 896, ratio: 3 }, // iPhone 11 Pro Max, iPhone 11 Pro, iPhone XS Max
      { width: 428, height: 926, ratio: 3 }, // iPhone 14 Pro Max, iPhone 13 Pro Max, iPhone 12 Pro Max
      { width: 430, height: 932, ratio: 3 }, // iPhone 14 Plus
      { width: 768, height: 1024, ratio: 2 }, // 9.7-inch iPad Pro, 7.9-inch iPad mini
      { width: 834, height: 1112, ratio: 2 }, // 10.5-inch iPad Pro
      { width: 834, height: 1194, ratio: 2 }, // 11-inch iPad Pro, 10.5-inch iPad Air
      { width: 1024, height: 1366, ratio: 2 }, // 12.9-inch iPad Pro
    ];

    return splashscreenLinks.map((splashscreen) => (
      <link
        key={`splashscreen-${splashscreen.width}-${splashscreen.height}`}
        href={getAppleTouchStartupImageLink(
          splashscreen.width,
          splashscreen.height
        )}
        media={`(device-width: ${splashscreen.width}px) and (device-height: ${splashscreen.height}px) and (-webkit-device-pixel-ratio: ${splashscreen.ratio})`}
        rel="apple-touch-startup-image"
      />
    ));
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1, viewport-fit=cover, user-scalable=no"
          key="viewport"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
          key="icon32"
        />
        <meta
          name="msapplication-TileColor"
          content={theme.palette.primary.main}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
          key="icon16"
        />
        <link rel="icon" href="/favicons/favicon.ico" key="favicon" />
        {generateSplashscreenLinks()}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title,
          description,
          url: canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export default MetaInfo;
