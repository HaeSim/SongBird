import type { StateCreator } from 'zustand';

interface ComponentModal {
  type: 'component';
  component: React.ReactNode;
}

interface MessageModal {
  type: 'message';
  title?: string;
  message: string[];
  options: {
    label: string;
    callback: () => void;
    variant?: 'text' | 'outlined' | 'contained';
    color?:
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'default'
      | 'error'
      | 'info'
      | 'success'
      | 'warning';
  }[];
}

type ModalState = ComponentModal | MessageModal | null;

interface IOpenMessageModal {
  title: string;
  message: string[];
  options: {
    label: string;
    callback: () => void;
    variant?: 'text' | 'outlined' | 'contained';
    color?:
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'default'
      | 'error'
      | 'info'
      | 'success'
      | 'warning';
  }[];
}

export interface AppModalSlice {
  modal: ModalState;
  modalVisible: boolean;
  openComponentModal: (component?: React.ReactNode) => void;
  openMessageModal: ({ title, message, options }: IOpenMessageModal) => void;
  closeModal: () => void;
}

const initialState: Pick<AppModalSlice, 'modal' | 'modalVisible'> = {
  modal: null,
  modalVisible: false,
};

const createAppModalSlice: StateCreator<AppModalSlice> = (set) => ({
  ...initialState,

  openComponentModal: (component?: React.ReactNode) => {
    set(() => ({
      modal: { type: 'component', component },
    }));

    setTimeout(() => {
      set(() => ({
        modalVisible: true,
      }));
    }, 0);
  },
  openMessageModal: ({ title, message, options }: IOpenMessageModal) => {
    // 1. 메시지 내용 적용
    set(() => ({
      modal: { type: 'message', title, message, options },
    }));

    // 2. 모달 오픈
    setTimeout(() => {
      set(() => ({
        modalVisible: true,
      }));
    }, 0);
  },
  closeModal: () => {
    set(() => ({
      modalVisible: false,
    }));

    setTimeout(() => {
      return set(() => ({
        modal: null,
      }));
    }, 0);
  },
});

export default createAppModalSlice;
