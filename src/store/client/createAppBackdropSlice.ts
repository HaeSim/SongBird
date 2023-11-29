import type { StateCreator } from 'zustand';

interface IOpenMessageBackdrop {
  message: string | null;
}

export interface AppBackdropSlice {
  backdropMessage: string | null;
  backdropVisible: boolean;
  openBackdrop: (payload?: IOpenMessageBackdrop) => void;
  closeBackdrop: () => void;
}

const initialState: Pick<
  AppBackdropSlice,
  'backdropMessage' | 'backdropVisible'
> = {
  backdropMessage: null,
  backdropVisible: false,
};

const createAppBackdropSlice: StateCreator<AppBackdropSlice> = (set) => ({
  ...initialState,
  openBackdrop: (payload?: IOpenMessageBackdrop) => {
    const { message } = payload || {};
    // 1. 메시지 내용 적용
    set(() => ({
      backdropMessage: message ?? null,
    }));

    // 2. 모달 오픈
    setTimeout(() => {
      set(() => ({
        backdropVisible: true,
      }));
    }, 0);
  },
  closeBackdrop: () => {
    set(() => ({
      backdropVisible: false,
    }));

    setTimeout(() => {
      return set(() => ({
        backdropMessage: null,
      }));
    }, 0);
  },
});

export default createAppBackdropSlice;
