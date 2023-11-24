import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useStore from '@/store/client';
import { PAGES } from '@/utils/AppConfig';

export function useAppRouting() {
  const { currentMenu, navigateMenu } = useStore((state) => state);
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

  // 컴포넌트에서 현재 메뉴와 라우팅 함수를 사용하려면 다음과 같이 반환합니다.
  return {
    currentMenu,
    navigateToMenu,
  };
}
