import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useClientStore from '@/store/client';
import { PAGES } from '@/utils/AppConfig';

export function useAppRouting() {
  const { currentMenu, navigateMenu } = useClientStore((state) => state);
  const router = useRouter();

  const navigateToMenu = (menuValue: string) => {
    navigateMenu(menuValue);
    const targetMenu = Object.values(PAGES).find(
      (page) => page.value === menuValue
    );

    if (targetMenu && targetMenu.path) {
      router.push(`${targetMenu.path}`);
    }
  };

  useEffect(() => {
    // 주소 변경 시 현재 메뉴를 업데이트하고 라우팅합니다.
    const currentPath = router.pathname;
    const targetMenu = Object.values(PAGES).find(
      (page) => page.path === currentPath
    );

    if (targetMenu) {
      navigateToMenu(targetMenu.value);
    }
  }, [router.pathname]);

  // router events 중 routeChangeComplete 이벤트를 감지하여
  // redirect 시 currentMenu를 업데이트합니다.
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const targetMenu = Object.values(PAGES).find((page) => page.path === url);

      if (!targetMenu) {
        return;
      }

      if (targetMenu?.value !== currentMenu.value) {
        navigateToMenu(targetMenu.value);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return {
    currentMenu,
    navigateToMenu,
  };
}
