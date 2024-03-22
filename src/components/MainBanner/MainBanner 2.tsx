import { FC, useEffect, useState } from 'react';
import styles from './mainbanner.module.css';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export const MainBanner: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ playOnInit: false, delay: 300000 }),
  ]);

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (isPlaying) {
      if (typeof autoplay.play === 'function') {
        autoplay.play();
      }
    } else {
      if (typeof autoplay.stop === 'function') {
        autoplay.stop();
      }
    }
  }, [emblaApi, isPlaying]);

  return (
    <div className={`container ${styles.mobileContainer}`}>
      <div className={`${styles.embla}`}>
        <div className={`${styles.embla__viewport}`} ref={emblaRef}>
          <div className={styles.embla__container}>
            <div className={`${styles.embla__slide} ${styles.container}`}>
              <div>
                <h1 className={styles.header}>
                  <span className={styles.blueText}>Весь рынок</span> клининга на одной площадке
                </h1>
                <p className={styles.agregator}>Агрегатор клининга</p>
                <div className={styles.createTender}>
                  <input
                    onFocus={() => {
                      setIsPlaying(false);
                    }}
                    onBlur={() => {
                      setIsPlaying(true);
                    }}
                    className={styles.createTenderInput}
                    type="text"
                    name="tender_text"
                    placeholder="Опишите задачу или объект"
                  />
                  <button className={styles.createTenderBtn}>Создать тендер</button>
                </div>
                <div className={styles.exampleSearchContainer}>
                  <p className={styles.exampleSearch}>Например, </p>
                  <Link to="/">
                    <p className={`${styles.exampleSearch} ${styles.exampleSearchLink}`}>
                      генеральная уборка
                    </p>
                  </Link>
                </div>
              </div>
              <img className={styles.image} src="./banner-image.png" alt="big-man" />
            </div>
            <div className={`${styles.embla__slide} ${styles.slide2}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
