import { FC } from 'react';
import styles from './seo.module.css';
import { useState } from 'react';

export const Seo: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const content = `В зависимости от типа вашего объекта недвижимости или вида загрязнения, выбирайте соответствующих исполнителей для уборки из каталога Ubrato. Определите, какие услуги клининга необходимы на вашем объекте, и подберите подходящих исполнителей из списка Ubrato, чтобы обеспечить качественное выполнение работ. Внимательно изучите каталог Ubrato и нанимайте профессиональных уборщиков, которые специализируются на объектах вашего типа или предлагают необходимые вам услуги клининга. Подбирайте исполнителей для уборки на вашем предприятии или в организации, ориентируясь на каталог Ubrato, где указаны опыт, специализация и отзывы о работе каждого кандидата.`;

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.seoBlock}>
        <h2 className={styles.titleblock}>
          <span className={styles.blueText}>Seo </span>Заголовок
        </h2>
        <p className={`${styles.content} ${isCollapsed ? styles.contentHidden : ''}`}>
          {content}
          <button className={`${styles.button}`} onClick={() => setIsCollapsed(!isCollapsed)}>
            <div className={`${styles.gradient} ${!isCollapsed ? styles.active : ''}`}></div>
          </button>
        </p>
      </div>
    </div>
  );
};
