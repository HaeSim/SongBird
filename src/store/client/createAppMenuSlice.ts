import type { StateCreator } from 'zustand';

import { type MenuItem, PAGES } from '@/utils/AppConfig';

export interface AppMenuSlice {
  currentMenu: MenuItem;
  navigateMenu: (menuValue: string) => void;
}

export const INITIAL_MENU = PAGES.HOME;

const initialState: Pick<AppMenuSlice, 'currentMenu'> = {
  currentMenu: INITIAL_MENU,
};

const createAppMenuSlice: StateCreator<AppMenuSlice> = (set) => ({
  ...initialState,
  navigateMenu: (menuValue: string) => {
    const currentMenu = Object.values(PAGES).find(
      (page) => page.value === menuValue
    );
    if (currentMenu) {
      set({ currentMenu });
    }
  },
});

export default createAppMenuSlice;
