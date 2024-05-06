import { useNotificationsStore } from '@/store/notificationsStore';
import { FC } from 'react';

export const ProfileNotifications: FC = () => {
  const notificationsStore = useNotificationsStore();

  console.log(notificationsStore.notifications.notifications);

  return (
    <div>
      {notificationsStore.notifications.notifications.map((e) => (
        <div key={e.id}>{e.header}</div>
      ))}
    </div>
  );
};
