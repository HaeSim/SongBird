import type { AxiosResponse } from 'axios';

export interface APICommonResponse<T> extends AxiosResponse<T> {
  data: {
    status: string;
    message: string;
    path: string;
    data: T;
    error?: string;
  };
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
