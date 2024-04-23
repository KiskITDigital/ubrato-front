import { FC, useCallback, useEffect, useRef } from 'react';
import { ArrowControl } from '@/components';
import styles from './tendersadvice.module.css';
import { useIsOrdererState } from '../../../store/isOrdererStore';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';

export const TendersAdvice: FC = () => {
  const isOrdererState = useIsOrdererState();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 22 });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const width: number | null = null;
  const widthR = useRef<number | null>(width);

  useEffect(() => {
    if (window.outerWidth <= 450) {
      widthR.current = window.outerHeight;
    }
  }, []);

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>
          {isOrdererState.role === 'orderer' ? 'Исполнители' : 'Тендеры'}{' '}
          <span className={styles.blueText}>Ubrato</span>
        </h2>
        <p className={styles.headerText}>
          {isOrdererState.role === 'orderer'
            ? 'Исполнители проходят проверку администрацией сайта Ubrato и оцениваются заказчиками по итогам выполнения тендеров'
            : 'Найдите подходящий тендер, задайте уточняющий вопрос заказчику, согласуйте стоимость, откликнитесь и становитесь исполнителем'}
        </p>
      </div>
      <div className={styles.carouselContainer}>
        {!widthR.current && (
          <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
              <div className={styles.embla__container}>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}1
                  </div>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}2
                  </div>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}3
                  </div>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}4
                  </div>
                </div>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}6
                  </div>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}7
                  </div>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}8
                  </div>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}5
                  </div>
                </div>
              </div>
            </div>
            <button className={styles.embla__prev} onClick={scrollPrev}>
              <ArrowControl image="./arrow-left.svg" />
            </button>
            <button className={styles.embla__next} onClick={scrollNext}>
              <ArrowControl image="./arrow-right.svg" />
            </button>
          </div>
        )}
        {widthR.current && (
          <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
              <div className={styles.embla__container}>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}1
                  </div>
                </div>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}2
                  </div>
                </div>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}3
                  </div>
                </div>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}4
                  </div>
                </div>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}5
                  </div>
                </div>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}6
                  </div>
                </div>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}7
                  </div>
                </div>
                <div className={styles.embla__slide}>
                  <div className={styles.slide_item}>
                    {isOrdererState.role === 'orderer' ? 'Исполнитель ' : 'Тендер '}8
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.btnContainer}>
        <Link to="/tenders" className={styles.btn}>
          <p className={styles.btnText}>
            {isOrdererState.role === 'orderer' ? 'Найти исполнителя' : 'Найти тендер'}
          </p>
          <img src="./arrow-with-line-right-white.svg" alt="arrow" />
        </Link>
      </div>
    </div>
  );
};
