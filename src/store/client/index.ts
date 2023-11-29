import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { AppBackdropSlice } from './createAppBackdropSlice';
import createAppBackdropSlice from './createAppBackdropSlice';
import type { AppMenuSlice } from './createAppMenuSlice';
import createAppMenuSlice from './createAppMenuSlice';
import type { AppModalSlice } from './createAppModalSlice';
import createAppModalSlice from './createAppModalSlice';

export type MyState = AppMenuSlice & AppModalSlice & AppBackdropSlice;

const useClientStore = create<MyState>()(
  devtools((...a) => ({
    ...createAppBackdropSlice(...a),
    ...createAppMenuSlice(...a),
    ...createAppModalSlice(...a),
  }))
);

export default useClientStore;
