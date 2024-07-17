import { FC, useEffect, useState } from 'react';
import styles from './citymodal.module.css';
import { getCities } from '@/api';

export const CityModal: FC<{
  setConfirm: (a: boolean) => void;
  setModal: (a: boolean) => void;
  setCity: (newCity: string) => void;
}> = ({ setConfirm, setModal, setCity }) => {
  const [citiesArr, setCitiesArr] = useState<{ id: number; name: string; region: string }[]>([]);
  const [confirmedCity, setConfirmedCity] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getCities("").then(response => {
      setCitiesArr(response.data)
      setIsListOpen(true)
    })
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <input
          className={styles.input}
          type="text"
          placeholder="Начните вводить название города"
          value={inputValue}
          onChange={(e) => {
            (async () => {
              setInputValue(e.target.value);
              const res = await getCities(e.target.value);
              // console.log(res);
              setCitiesArr(res.data);
              setIsListOpen(true);
            })();
          }}
        />
        {citiesArr.length !== 0 && isListOpen && (
          <div className={styles.citiesList}>
            {citiesArr?.map((city) => (
              <div
                className={styles.city}
                onClick={() => {
                  setIsListOpen(false);
                  setConfirmedCity(city.name);
                  setInputValue('');
                }}
                key={city.id}
              >
                {city.name}
                <span className={styles.region}>{city.region}</span>
              </div>
            ))}
          </div>
        )}
        {confirmedCity && (
          <p className={styles.newCity}>{confirmedCity}</p>
        )}
        <div className={styles.btns}>
          <button
            disabled={!isListOpen && confirmedCity.length === 0}
            onClick={() => {
              setConfirm(true);
              setModal(false);
              setCity(confirmedCity);
              document.body.style.overflow = 'scroll';
            }}
            className={styles.btn}
          >
            Подтвердить
          </button>
          <button
            onClick={() => {
              setModal(false);
              setConfirm(true);
              document.body.style.overflow = 'scroll';
            }}
            className={styles.cancelBtn}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
