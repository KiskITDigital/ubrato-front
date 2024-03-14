import { Carousel } from 'antd';
import { CarouselProps } from 'antd/es/carousel';
import { FC } from 'react';
import { ArrowControl } from '../ArrowControl/ArrowControl';
import styles from './tendersadvice.module.css';
import { useIsOrdererState } from '../../store/isOrdererStore';
import { Link } from 'react-router-dom';

export const TendersAdvice: FC = () => {
  const isOrdererState = useIsOrdererState();

  const settings: CarouselProps = {
    arrows: true,
    dots: false,
    draggable: true,
    nextArrow: <ArrowControl image="./arrow-right.svg" />,
    prevArrow: <ArrowControl image="./arrow-left.svg" />,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '1230px',
    },
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>
          {isOrdererState.isOrderer ? 'Исполнители' : 'Тендеры'}{' '}
          <span className={styles.blueText}>Ubrato</span>
        </h2>
        <p className={styles.headerText}>
          {isOrdererState.isOrderer
            ? 'Исполнители проходят проверку администрацией сайта Ubrato и оцениваются заказчиками поитогам выполнения тендеров'
            : 'Найдите подходящий тендер, задайте уточняющий вопрос заказчику, согласуйте стоимость, откликнитесь и становитесь исполнителем'}
        </p>
      </div>
      <div className={styles.carouselContainer}>
        <Carousel {...settings}>
          <div style={{ width: '1130px' }} className={styles.carouselItem}>
            <div>{isOrdererState.isOrderer ? 'Исполнитель ' : 'Тендер '}1</div>
            <div>{isOrdererState.isOrderer ? 'Исполнитель ' : 'Тендер '}2</div>
            <div>{isOrdererState.isOrderer ? 'Исполнитель ' : 'Тендер '}3</div>
            <div>{isOrdererState.isOrderer ? 'Исполнитель ' : 'Тендер '}4</div>
          </div>
          <div style={{ width: '1130px' }} className={styles.carouselItem}>
            <div>{isOrdererState.isOrderer ? 'Исполнитель ' : 'Тендер '}5</div>
            <div>{isOrdererState.isOrderer ? 'Исполнитель ' : 'Тендер '}6</div>
            <div>{isOrdererState.isOrderer ? 'Исполнитель ' : 'Тендер '}7</div>
            <div>{isOrdererState.isOrderer ? 'Исполнитель ' : 'Тендер '}8</div>
          </div>
        </Carousel>
      </div>
      <div className={styles.btnContainer}>
        <Link to="/tenders" className={styles.btn}>
          <p className={styles.btnText}>
            {isOrdererState.isOrderer ? 'Найти исполнителя' : 'Найти тендер'}
          </p>
          <img src="./arrow-with-line-right-white.svg" alt="arrow" />
        </Link>
      </div>
    </div>
  );
};
