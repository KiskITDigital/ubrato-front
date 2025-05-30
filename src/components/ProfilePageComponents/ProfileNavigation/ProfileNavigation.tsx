import { AvatarInput } from "@/components/AvatarInput/AvatarInput";
import { useUserInfoStore } from "@/store/userInfoStore";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./profilenav.module.css";
import {
  DocumentsIC,
  HeartIC,
  LogoutIC,
  SurveyIC,
  CompanyProfiveIC,
  BellIC,
  SettingsIC,
  TenderIC,
  HelpIC,
} from "./icons";
import { logout } from "@/utils/auth/auth";
import Modal from "@/components/Modal";
import InfoModal from "@/components/Modal/InfoModal";

interface ProtectedLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}
const allowedRoutes = [
  "notifications",
  "help",
  "documents",
  "/my-tenders",
  "/survey",
];

export const ProfileNavigation: FC = () => {
  const userStore = useUserInfoStore();
  const location = useLocation();
  const isEmailVerified = userStore.user.email_verified;

  const [page, setPage] = useState("");
  const [openInfoModal, setOpenInfoModal] = useState(false);

  useEffect(() => {
    setPage(location.pathname);
  }, [location]);

  const closeInfoModal = () => {
    setOpenInfoModal(false);
  };

  const ProtectedLink = ({
    to,
    children,
    className = "",
  }: ProtectedLinkProps) => {
    const isAllowedRoute = allowedRoutes.includes(to);

    return (
      <Link
        to={isEmailVerified || isAllowedRoute ? to : "#"}
        className={className}
        onClick={(e) => {
          if (!isEmailVerified && !isAllowedRoute) {
            e.preventDefault();
            setOpenInfoModal(true);
          }
        }}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <AvatarInput />
      </div>

      <div className={styles.info}>
        <p>{userStore.user.organization.short_name}</p>
        <p>
          ИНН{" "}
          <span className={styles.blueText}>
            {userStore.user.organization.inn}
          </span>
        </p>
      </div>

      <div className={styles.links}>
        {userStore.user.is_contractor && (
          <ProtectedLink to="/survey" className={`${styles.link}`}>
            <SurveyIC />
            Анкета
          </ProtectedLink>
        )}

        <ProtectedLink
          to=""
          className={`${styles.link} ${
            !page.includes("profile/") ? styles.active : ""
          }`}
        >
          <CompanyProfiveIC />
          Профиль компании
        </ProtectedLink>

        <ProtectedLink
          className={`${styles.link} ${styles.sublink} ${
            page.includes("orderer") && !page.includes("tenders")
              ? styles.active
              : ""
          }`}
          to="orderer"
        >
          Заказчик
        </ProtectedLink>

        {userStore.user.is_contractor ? (
          <ProtectedLink
            className={`${styles.link} ${styles.sublink} ${
              page.includes("contractor") && !page.includes("tenders")
                ? styles.active
                : ""
            }`}
            to="contractor"
          >
            Исполнитель
          </ProtectedLink>
        ) : (
          <ProtectedLink
            className={`${styles.link} ${styles.sublink} ${styles.become_link__padding}`}
            to="become-contractor"
          >
            <p className={styles.become_link}>Стать исполнителем</p>
          </ProtectedLink>
        )}

        <ProtectedLink
          to="/my-tenders"
          className={`${styles.link} ${
            page.includes("tenders") && !page.includes("tenders/")
              ? styles.active
              : ""
          }`}
        >
          <TenderIC />
          Мои тендеры
        </ProtectedLink>

        <ProtectedLink
          to="favourite"
          className={`${styles.link} ${
            page.includes("favourite") ? styles.active : ""
          }`}
        >
          <HeartIC />
          Избранное
        </ProtectedLink>

        <ProtectedLink
          to="notifications"
          className={`${styles.link} ${
            page.includes("notifications") ? styles.active : ""
          }`}
        >
          <BellIC />
          Уведомления
        </ProtectedLink>

        <ProtectedLink
          to="documents"
          className={`${styles.link} ${
            page.includes("documents") ? styles.active : ""
          }`}
        >
          <DocumentsIC />
          Документы
        </ProtectedLink>

        <ProtectedLink
          to="settings"
          className={`${styles.link} ${
            page.includes("settings") ? styles.active : ""
          }`}
        >
          <SettingsIC />
          Настройки аккаунта
        </ProtectedLink>

        <ProtectedLink
          to="help"
          className={`${styles.link} ${
            page.includes("help") ? styles.active : ""
          }`}
        >
          <HelpIC />
          Помощь
        </ProtectedLink>
      </div>

      <button className={styles.logout} onClick={logout}>
        <LogoutIC />
        Выйти
      </button>

      <Modal isOpen={openInfoModal}>
        <InfoModal
          title=""
          text="Для завершения регистрации, пожалуйста, подтвердите адрес электронной почты."
          onClose={closeInfoModal}
        />
      </Modal>
    </div>
  );
};
