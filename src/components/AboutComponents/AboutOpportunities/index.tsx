import { FC, useEffect, useState } from "react";
import styles from "./style.module.css";

export const AboutOpportunities: FC = () => {
  return (
    <div className={styles.develop_container}>
      <h2 className={styles.develop_header}>Возможности <span className={styles.blueText}>Ubrato</span></h2>
      <div className={styles.develop_list}>
        <div className={styles.list_elem}>
          <div className={styles.header_line}>
            <img src="./louper.png" alt="" /> <h3>Быстрый поиск</h3>
          </div>{" "}
          <p>исполнителей клининговых услуг самого разного профиля и масштаба</p>
        </div>
        <div className={styles.list_elem}>
          <div className={styles.header_line}>
            <img src="./man_checked.png" alt="" /> <h3>Проверка контрагентов</h3>
          </div>{" "}
          <p>по данным единого государственного реестра юридических лиц</p>
        </div>
        <div className={styles.list_elem}>
          <div className={styles.header_line}>
            <img src="./chating.png" alt="" /> <h3>Обсуждение условий</h3>
          </div>{" "}
          <p>сделки и уточнение деталей в отдельном чате с каждым исполнителем</p>
        </div>
      </div>
      <div className={styles.develop_list}>
        <div className={styles.list_elem}>
          <div className={styles.header_line}>
            <img src="./up_down.png" alt="" /> <h3>Рейтинг и отзывы</h3>
          </div>{" "}
          <p>об исполнителях по итогам каждого проекта </p>
        </div>
        <div className={styles.list_elem}>
          <div className={styles.header_line}>
            <img src="./support.png" alt="" /> <h3>Круглосуточная поддержка</h3>
          </div>{" "}
          <p>персонального менеджера с первого дня регистрации </p>
        </div>
        <div className={styles.list_elem}>
          <div className={styles.header_line}>
            <img src="./map.png" alt="" /> <h3>Широкая география</h3>
          </div>{" "}
          <p>исполнителей из разных регионов России</p>
        </div>
      </div>
    </div>
  );
};
