// FIXME: Update this configuration file based on your project information

type AppConfigType = {
  site_name: string;
  title: string;
  description: string;
  locale: string;
  base_url: string;
};

export const AppConfig: AppConfigType = {
  site_name: 'song-brid',
  title: 'Song Brid',
  description: 'Song Bird, 노래를 맞춰 보세요!',
  locale: 'ko',
  base_url: process.env.NODE_ENV === 'production' ? '/api/v1' : '/api/mock',
};

type MenuConfigType = 'HOME' | 'QUIZ' | 'DASHBOARD' | 'SETTINGS';

export type MenuItem = {
  label: string;
  value: string;
  path: string;
};

const createMenuItem = (
  label: string,
  value: string,
  path: string
): MenuItem => ({
  label,
  value,
  path,
});

export const PAGES: Record<MenuConfigType, MenuItem> = {
  HOME: createMenuItem('홈', 'home', '/'),
  QUIZ: createMenuItem('퀴즈', 'quiz', '/quiz'),
  DASHBOARD: createMenuItem('대시보드', 'dashboard', '/dashboard'),
  SETTINGS: createMenuItem('세팅', 'settings', '/settings'),
};
