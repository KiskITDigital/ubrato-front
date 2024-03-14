import { create } from "zustand";

interface OrdererState {
  isOrderer: boolean;
  handleState: () => void;
}

export const useIsOrdererState = create<OrdererState>()((set) => ({
  isOrderer: true,
  handleState: () => {
    set((state) => ({ isOrderer: !state.isOrderer }));
  },
}));
