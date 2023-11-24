import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { AppMenuSlice } from './createAppMenuSlice';
import createAppMenuSlice from './createAppMenuSlice';
import type { CounterSlice } from './createCounterSlice';
import createCounterSlice from './createCounterSlice';

export type MyState = CounterSlice & AppMenuSlice;

const useStore = create<MyState>()(
  devtools((...a) => ({
    ...createCounterSlice(...a),
    ...createAppMenuSlice(...a),
  }))
);

export default useStore;
