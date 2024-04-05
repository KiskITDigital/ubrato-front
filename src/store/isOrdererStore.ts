import { create } from 'zustand';

interface OrdererState {
  role: string;
  handleState: (role:string) => void;
}

export const useIsOrdererState = create<OrdererState>()((set) => ({
  role: 'orderer',
  handleState: (role: string) => {
    set(() => ({ role: role }));
  },
}));
