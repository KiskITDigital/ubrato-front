import { getNotifications } from '@/api';
import { notificationsT } from '@/types/app';
import { create } from 'zustand';

interface notificationsStore {
  notifications: notificationsT;
  fetchNotifications: (token: string) => Promise<void>;
}

export const useNotificationsStore = create<notificationsStore>()((set) => ({
  notifications: {
    total: 0,
    notifications: [],
  },
  fetchNotifications: async (token) => {
    const res = await getNotifications(token);
    set({ notifications: res });
  },
}));
