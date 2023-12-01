/* eslint-disable react/no-invalid-html-attribute */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import theme from '@/styles/theme';
import type { IMetaInfoComponent } from '@/types/common/component';
import { AppConfig, makePageTitle } from '@/utils/AppConfig';

type IMetaProps = {
  title: string;
  description?: string;
};

const MetaInfo: IMetaInfoComponent = ({ title, description }: IMetaProps) => {
  const router = useRouter();
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
        <meta
          name="msapplication-TileColor"
          content={theme.palette.background.default}
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/favicons/apple-icon-180x180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon-180x180.png"
        />
        <link rel="manifest" href="/manifest.json" />
        {generateSplashscreenLinks()}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <NextSeo
        title={makePageTitle(title)}
        description={description ?? AppConfig.description}
        canonical={AppConfig.canonical}
        openGraph={{
          type: 'website',
          url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
          title: makePageTitle(title),
          description: description ?? AppConfig.description,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
          images: [
            {
              url: AppConfig.imageUrl,
              alt: AppConfig.site_name,
            },
          ],
        }}
      />
    </>
  );
};

export default MetaInfo;
