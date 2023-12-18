import { useRouter } from 'next/router';

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

  return {
    currentMenu,
    navigateToMenu,
  };
}
