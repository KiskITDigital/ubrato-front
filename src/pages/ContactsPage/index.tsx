/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef } from 'react';
import styles from './contacts-page.module.css';
import { useLocation } from 'react-router-dom';
import ContactModal from '@/components/Modal/ContactModal';

const ContactsPage: FC = () => {
  const location = useLocation();

  const startRef = useRef<HTMLHeadingElement>(null);

  const helpRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // console.log(location.state);
    if (
      (location.state && 'isHelp' in location.state && location.state.isHelp) ||
      location.hash === '#contact-form'
    ) {
      helpRef.current!.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const elementTop = helpRef.current!.getBoundingClientRect().top;
        window.scrollBy({ top: elementTop - 100, behavior: 'smooth' });
      }, 0);
    } else {
      startRef.current!.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const elementTop = startRef.current!.getBoundingClientRect().top;
        window.scrollBy({ top: elementTop - 300, behavior: 'smooth' });
      }, 0);
    }
  }, [location.state]);

  return (
    <section ref={startRef} className={`${styles.container} container`}>
      <p className={styles.title}>
        Контакты <span>Ubrato (Убрато)</span>
      </p>
      <div className={styles.infos}>
        <div className={styles.info}>
          <p className={styles.infoTitle}>8 800-775-67-57</p>
          <p className={styles.infoText}>
            Горячая линия доступна с 9:00 до 18:00 по московскому времени
          </p>
        </div>
        <div className={styles.info}>
          <p className={styles.infoTitle}>info@ubrato.ru</p>
          <p className={styles.infoText}>Электронная почта</p>
        </div>
        <div className={styles.info}>
          <p className={styles.infoTitle}>Москва, метро Румянцево</p>
          <p className={styles.infoText}>Адрес</p>
        </div>
      </div>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <a
          href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
          style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 0 }}
        ></a>
        <a
          href="https://yandex.ru/maps/213/moscow/stops/station__10105315/?ll=37.466102%2C55.645837&tab=overview&utm_medium=mapframe&utm_source=maps&z=13.35"
          style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 14 }}
        ></a>
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=37.466102%2C55.645837&masstransit%5BstopId%5D=station__10105315&mode=masstransit&tab=overview&z=13.35"
          width="100%"
          height="380"
          allowFullScreen={true}
          style={{ position: 'relative', borderRadius: 20, marginTop: 20 }}
        ></iframe>
      </div>
      <div ref={helpRef} id="contact-form" className={styles.contact}>
        <p className={styles.contactText}>Нашли ошибку или у вас есть предложение? Напишите нам</p>
        <ContactModal type="SURVEY_TYPE_FEEDBACK" />
      </div>
    </section>
  );
};

export default ContactsPage;
