import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { AppMenuSlice } from './createAppMenuSlice';
import createAppMenuSlice from './createAppMenuSlice';
import type { AppModalSlice } from './createAppModalSlice';
import createAppModalSlice from './createAppModalSlice';
import type { CounterSlice } from './createCounterSlice';
import createCounterSlice from './createCounterSlice';

export type MyState = CounterSlice & AppMenuSlice & AppModalSlice;

const useClientStore = create<MyState>()(
  devtools((...a) => ({
    ...createCounterSlice(...a),
    ...createAppMenuSlice(...a),
    ...createAppModalSlice(...a),
  }))
);

export default useClientStore;
