import { FC } from "react";
// import style from './OneTenderExecutorNotification.css'
import styles from "./ExecutorNotice.module.css";
import { Link } from "react-router-dom";

export const OneTenderExecutorNotification: FC = () => {
  return (
    <div className={styles.block}>
      <h2 className={styles.notif_header}>Идёт этап приема откликов. </h2>
      <p className={styles.notif_paragraph}>
        Нажмите на кнопку «Откликнуться на тендер» и укажите стоимость, за которую вы готовы
        выполнить работы. Если есть вопросы, <Link className="text-accent underline" to='questions_and_answers'>напишите</Link> заказчику в чате.
      </p>
    </div>
  );
};
