import { notificationsT } from '@/types/app';
import { axiosInstance } from '@/utils';

export const getNotifications: (token: string) => Promise<notificationsT> = async (token) => {
  const res = await axiosInstance.get<notificationsT>('/v1/users/me/notice', {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data;
};
