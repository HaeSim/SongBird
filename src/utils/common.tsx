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

/**
 * @description userAgent를 통해 현재 브라우저가 모바일인지 확인
 * @returns boolean
 * @example
 * const isMobile = isMobileBrowserByUserAgent();
 * if (isMobile) {
 *  // 모바일 브라우저
 * }
 * else {
 * // 데스크탑 브라우저
 * }
 */
export const isMobileBrowserByUserAgent = (): boolean => {
  // ssr일 경우 userAgent가 없으므로 window가 있는지 확인
  if (typeof window === 'undefined') {
    return false;
  }

  const { userAgent } = navigator;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent);
};

/**
 * @description userAgent를 통해 현재 브라우저를 유형별(safari, chrome, firefox, opera, ie, edge)로 구분
 * @returns string
 * @example
 * const browserType = getBrowserTypeByUserAgent();
 * if (browserType === 'safari') {
 * // 사파리 브라우저
 * }
 * else if (browserType === 'chrome') {
 * // 크롬 브라우저
 * }
 */
export const getBrowserTypeByUserAgent = (): string => {
  // ssr일 경우 userAgent가 없으므로 window가 있는지 확인
  if (typeof window === 'undefined') {
    return '';
  }

  const { userAgent } = navigator;
  const browserRegex = /safari|chrome|firefox|opera|msie|edge/i;
  const browserType = userAgent.match(browserRegex)?.[0] ?? '';

  return browserType;
};

/**
 * @description userAgent를 통해 현재 환경을 유형별(IOS, Android, Windows, Mac, Linux)로 구분
 * @returns string
 * @example
 * const osType = getOSTypeByUserAgent();
 * if (osType === 'IOS') {
 * // IOS
 * }
 * else if (osType === 'Android') {
 * // Android
 * }
 * else if (osType === 'Windows') {
 * // Windows
 * }
 */
export const getOSTypeByUserAgent = (): string => {
  // ssr일 경우 userAgent가 없으므로 window가 있는지 확인
  if (typeof window === 'undefined') {
    return '';
  }

  const { userAgent } = navigator;
  const osRegex = /iPhone|iPad|iPod|Android|Windows|Mac|Linux/i;
  const osType = userAgent.match(osRegex)?.[0] ?? '';

  if (osType === 'iPhone' || osType === 'iPad' || osType === 'iPod') {
    return 'IOS';
  }

  return osType;
};

/**
 * @description 날짜를 받아서 포맷팅
 * @param date 날짜 (ex: 2023-02-25T00:18:24Z)
 * @param format 포맷팅 형식 (default: YYYY-MM-DD HH:mm)
 * @returns string
 * @example
 * const formattedDate = formatDate(date, 'YYYY-MM-DD');
 * console.log(formattedDate); // 2021-10-01
 */
export const formatDatetime = (
  date: string,
  format: string = 'YYYY-MM-DD HH:mm'
): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  const formattedDate = format
    .replace('YYYY', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('HH', hours.toString().padStart(2, '0'))
    .replace('mm', minutes.toString().padStart(2, '0'));

  return formattedDate;
};
