import { FC, useState } from 'react';
import styles from './citymodal.module.css';
import { getCities } from '@/api';

export const CityModal: FC<{
  setConfirm: (a: boolean) => void;
  setModal: (a: boolean) => void;
  setCity: (newCity: string) => void;
}> = ({ setConfirm, setModal, setCity }) => {
  const [citiesArr, setSitiesArr] = useState<{ id: number; name: string; region: string }[]>([]);
  const [confirmedCity, setConfirmedCity] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

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
              console.log(res);
              setSitiesArr(res.data);
              setIsListOpen(true);
            })();
          }}
        />
        {citiesArr.length !== 0 && isListOpen && (
          <div className={styles.citiesList}>
            {citiesArr.map((e) => (
              <div
                className={styles.city}
                onClick={() => {
                  setIsListOpen(false);
                  setConfirmedCity(e.name);
                  setInputValue('');
                }}
                key={e.id}
              >
                {e.name}
                <span className={styles.region}>{e.region}</span>
              </div>
            ))}
          </div>
        )}
        {!isListOpen && confirmedCity.length !== 0 && (
          <p className={styles.newCity}>{confirmedCity}</p>
        )}
        <div className={styles.btns}>
          <button
            onClick={() => {
              setModal(false);
              setConfirm(true);
            }}
            className={styles.cancelBtn}
          >
            Отмена
          </button>
          <button
            disabled={!isListOpen && confirmedCity.length === 0}
            onClick={() => {
              setConfirm(true);
              setModal(false);
              setCity(confirmedCity);
            }}
            className={styles.btn}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};
