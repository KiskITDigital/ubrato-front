import { useNotificationsStore } from '@/store/notificationsStore';
import { FC, useEffect } from 'react';

export const ProfileNotifications: FC = () => {
  const notificationsStore = useNotificationsStore();

  console.log(notificationsStore.notifications.notifications);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {notificationsStore.notifications.notifications.map((e) => (
        <div key={e.id}>{e.header}</div>
      ))}
    </div>
  );
};
