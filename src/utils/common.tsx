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
