import { useNotificationsStore } from '@/store/notificationsStore';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ProfileNotifications: FC = () => {
  const notificationsStore = useNotificationsStore();

  console.log(notificationsStore.notifications.notifications);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {notificationsStore.notifications.notifications.map((e) => (
        <div key={e.id}>
          {e.header}
          <div>{e.msg}</div>
          {e.href && (
            <Link className="underline text-red-400" to={e.href.replace('https://ubrato.ru', '')}>
              {e.href_text}
            </Link>
          )}
          <div>{e.href}</div>
        </div>
      ))}
    </div>
  );
};
