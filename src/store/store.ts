import { create } from 'zustand';

interface CountState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

interface OrdererState {
  isOrderer: boolean;
  handleState: () => void;
}

export const useStore = create<CountState>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));

export const useIsOrdererState = create<OrdererState>()((set) => ({
  isOrderer: true,
  handleState: () => {
    set((state) => ({ isOrderer: !state.isOrderer }));
  },
}));


//Базовый пример глобального хранилища, в будующем нужно будет для авторизации и т.д.
