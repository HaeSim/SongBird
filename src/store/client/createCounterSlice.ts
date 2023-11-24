import type { StateCreator } from 'zustand';

export interface CounterSlice {
  counter: number;
  incrementCounter: () => void;
  decrementCounter: () => void;
}

const counter = 1;

const createCounterSlice: StateCreator<CounterSlice> = (set) => ({
  counter,
  incrementCounter: () => set((prev) => ({ counter: prev.counter + 1 }), false),
  decrementCounter: () => set((prev) => ({ counter: prev.counter - 1 }), false),
});

export default createCounterSlice;
