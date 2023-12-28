// FIXME: Update this configuration file based on your project information

type AppConfigType = {
  site_name: string;
  title: string;
  description: string;
  imageUrl: string;
  locale: string;
  canonical: string;
  base_url: string;
};

export const AppConfig: AppConfigType = {
  site_name: '송버드(SongBird)',
  title: '🎵 SongBird 🐦',
  description: '나의 유튜브 재생목록으로 노래퀴즈를 만들어보세요!',
  imageUrl: '/images/og_songbird.png',
  locale: 'ko',
  canonical: 'https://app.songbirdquiz.com',
  base_url: '/api/v1',
};

export const makePageTitle = (title: string) => `${title} | ${AppConfig.title}`;

type MenuConfigType = 'HOME' | 'NOTICE' | 'QUIZ' | 'DASHBOARD' | 'SETTINGS';

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
  NOTICE: createMenuItem('공지사항', 'notice', '/notion/notice'),
  QUIZ: createMenuItem('퀴즈', 'quiz', '/quiz'),
  DASHBOARD: createMenuItem('대시보드', 'dashboard', '/dashboard'),
  SETTINGS: createMenuItem('세팅', 'settings', '/settings'),
};
