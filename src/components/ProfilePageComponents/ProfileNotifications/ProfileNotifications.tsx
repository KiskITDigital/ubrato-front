import { useNotificationsStore } from "@/store/notificationsStore";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./styles.module.css";

export const ProfileNotifications: FC = () => {
  const notificationsStore = useNotificationsStore();
  const notifications = notificationsStore.notifications.notifications;
  const reversedNotifications = notifications.reverse();

  const handleNotificationClick = (id: number) => {
    notificationsStore.setNotificationRead(id);
    notificationsStore.toggleNotificationExpansion(id);
    console.log(notificationsStore.notifications);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isExpanded = (id: number) => {
    return useNotificationsStore.getState().expandedIds.includes(id);
  };

  const toDateTime = (date: string) => {
    const newDate = new Date(Date.parse(date));
    if (isNaN(newDate.getTime())) {
      throw new Error("Invalid date string");
    }
    const datePart = newDate.toISOString().split("T")[0];
    const timePart = newDate.toTimeString().split(" ")[0];
    return `${datePart} ${timePart}`;
  };

  return (
    <div>
      <h1 className={s.title}>Уведомления</h1>
      {reversedNotifications.map((e) => (
        <div
          className={s.notification_container}
          onClick={() => handleNotificationClick(e.id)}
          key={e.id}
        >
          <div className={s.header_line}>
            <div className={s.created_at}>{toDateTime(e.created_at)}</div>
            <div className={s.content}>
              <h2
                className={`${s.notification_header} ${
                  isExpanded(e.id) ? s.notification_header_expanded : ""
                }`}
              >
                {e.header}
              </h2>
              {isExpanded(e.id) && (
                <div className={s.message}>
                  {e.msg}
                  {e.href && (
                    <Link
                      className="underline text-red-400"
                      to={e.href.replace("https://ubrato.ru", "")}
                    >
                      {e.href_text}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
