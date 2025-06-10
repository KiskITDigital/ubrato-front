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
import {
  allowedNotEmailVerifiedRoutes,
  allowedNotUserVerifiedRoutes,
} from "./routes.constants";

interface ProtectedLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const ProfileNavigation: FC = () => {
  const userStore = useUserInfoStore();
  const location = useLocation();
  const isEmailVerified = userStore.user.email_verified;
  const isUserVerified = userStore.user.verified;
  const isContractor = userStore.user.is_contractor;

  const [page, setPage] = useState("");
  const [openVerifyEmailInfoModal, setOpenVerifyEmailInfoModal] =
    useState(false);
  const [openVerifyUserInfoModal, setOpenVerifyUserInfoModal] = useState(false);

  useEffect(() => {
    setPage(location.pathname);
  }, [location]);

  const closeVerifyEmailInfoModal = () => {
    setOpenVerifyEmailInfoModal(false);
  };

  const closeVerifyUserInfoModal = () => {
    setOpenVerifyUserInfoModal(false);
  };

  const ProtectedLink = ({
    to,
    children,
    className = "",
  }: ProtectedLinkProps) => {
    const isAllowedEmailRoute = allowedNotEmailVerifiedRoutes.includes(to);
    const isAllowedUserRoute = allowedNotUserVerifiedRoutes.includes(to);

    const handleClick = (e: React.MouseEvent) => {
      if (!isEmailVerified && !isAllowedEmailRoute) {
        e.preventDefault();
        setOpenVerifyEmailInfoModal(true);
        return;
      }

      if (isEmailVerified && !isUserVerified && !isAllowedUserRoute) {
        e.preventDefault();
        setOpenVerifyUserInfoModal(true);
      }
    };

    const canNavigate =
      (isEmailVerified || isAllowedEmailRoute) &&
      (isUserVerified || isAllowedUserRoute || isAllowedEmailRoute);

    return (
      <Link
        to={canNavigate ? to : "#"}
        className={className}
        onClick={handleClick}
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
        {isContractor && isUserVerified && (
          <ProtectedLink to="/survey" className={`${styles.link}`}>
            <SurveyIC />
            Анкета
          </ProtectedLink>
        )}

        {isUserVerified && (
          <ProtectedLink
            to=""
            className={`${styles.link} ${
              !page.includes("profile/") ? styles.active : ""
            }`}
          >
            <CompanyProfiveIC />
            Профиль компании
          </ProtectedLink>
        )}

        {isUserVerified && (
          <>
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

            {isContractor ? (
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
          </>
        )}

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

        {isEmailVerified && (
          <ProtectedLink
            to="settings"
            className={`${styles.link} ${
              page.includes("settings") ? styles.active : ""
            }`}
          >
            <SettingsIC />
            Настройки аккаунта
          </ProtectedLink>
        )}

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

      <Modal isOpen={openVerifyEmailInfoModal}>
        <InfoModal
          title=""
          text="Для завершения регистрации, пожалуйста, подтвердите адрес электронной почты."
          onClose={closeVerifyEmailInfoModal}
        />
      </Modal>

      <Modal isOpen={openVerifyUserInfoModal}>
        <InfoModal
          title=""
          text="Необходимо пройти верификацию."
          onClose={closeVerifyUserInfoModal}
        />
      </Modal>
    </div>
  );
};
