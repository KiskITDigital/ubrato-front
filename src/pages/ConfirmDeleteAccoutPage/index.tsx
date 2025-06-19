import { confirmDeleteAccount } from "@/api/confirmDeleteAccount";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./confirm-delete-account-page.module.css";
import useQueryParams from "./useQueryParams";
import { logout } from "@/utils/auth/auth";

const redirectToMainPageText =
  "Сейчас вы будете переадресованы на главную страницу...";

const ConfirmDeleteAccountPage: FC = () => {
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState(
    "Подтверждение удаления аккаунта..."
  );

  const { code, email } = useQueryParams();

  const redirectWithDelay = (path: string, withLogout = false) => {
    setTimeout(() => {
      withLogout && logout();
      navigate(path);
    }, 5000);
  };

  const showError = () => {
    setStatusText(
      `Произошла ошибка при удалении аккаунта. ${redirectToMainPageText}`
    );
    redirectWithDelay("/");
  };

  useEffect(() => {
    const processDeletion = async () => {
      if (!code || !email) {
        setStatusText(
          `Неверная ссылка для подтверждения. Пожалуйста, перейдите по ссылке из письма. ${redirectToMainPageText}`
        );
        redirectWithDelay("/");
        return;
      }

      try {
        setStatusText("Идет удаление аккаунта...");
        const isDeleted = await confirmDeleteAccount({ code, email });

        if (isDeleted) {
          setStatusText(`Аккаунт успешно удален. ${redirectToMainPageText}`);
          redirectWithDelay("/", true);
        } else {
          showError();
        }
      } catch (error) {
        showError();
        console.error("Deletion error:", error);
      }
    };

    processDeletion();
  }, [code, email, navigate]);

  return (
    <div className="container">
      <h1 className={styles.title}>{statusText}</h1>
    </div>
  );
};

export default ConfirmDeleteAccountPage;
