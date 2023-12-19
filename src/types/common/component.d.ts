import type { ReactNode } from 'react';

export interface ILayoutProps {
  children: ReactNode;
}

export interface IMetaInfoComponent extends React.FC<IMetaProps> {}

// this is a common type definition file
export interface ILayoutComponent
  extends React.FC<{
    children: ReactNode;
  }> {}
