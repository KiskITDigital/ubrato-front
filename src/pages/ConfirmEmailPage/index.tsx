import { FC, useEffect, useState } from "react";
import styles from "./confirm-email-page.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { verify } from "@/api";

const ConfirmEmailPage: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const codeParams = searchParams.get("code");

  const navigate = useNavigate();

  const [text, setText] = useState("Проверяем email...");

  useEffect(() => {
    if (!codeParams) {
      setText(
        "Неверная ссылка подтверждения. Пожалуйста, проверьте email еще раз."
      );
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await verify(codeParams);
        if (res.status) {
          setText("Email успешно подтвержден. Перенаправляем...");
          navigate("/profile/documents");
          return;
        }
        throw new Error(`Unexpected status code: ${res.status}`);
      } catch (e) {
        setText(
          "Не удалось подтвердить email. Пожалуйста, попробуйте открыть ссылку еще раз."
        );
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="container">
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
};

export default ConfirmEmailPage;
