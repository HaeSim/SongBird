import type { ReactNode } from 'react';

export interface ILayoutProps {
  children: ReactNode;
}

export interface IMetaInfoComponent
  extends React.FC<{
    title: string;
    description: string;
    canonical?: string;
  }> {}

// this is a common type definition file
export interface ILayoutComponent
  extends React.FC<{
    children: ReactNode;
  }> {}
