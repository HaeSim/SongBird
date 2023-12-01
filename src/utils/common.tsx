import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

import type { ILayoutComponent } from '@/types/common/component';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode;
};
/**
 * @param Layout The layout component to wrap the page with.
 * @returns  A function getLayout that return the page wrapped with the layout component.
 */
export const generateGetLayout = (Layout: ILayoutComponent) => {
  return function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };
};

/**
 * @param time The time in seconds.
 * @returns A string with the time in the format mm:ss.
 */
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const detectInAppBrowser = (): boolean => {
  const { userAgent } = navigator;

  const inAppRegex =
    /KAKAOTALK|Instagram|NAVER|zumapp|whale|Snapchat|Line|everytimeApp|WhatsApp|Electron|wadiz|AliApp|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser/i;

  return inAppRegex.test(userAgent);
};
