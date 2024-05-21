import { FC, useEffect, useRef, useState } from 'react';
import styles from './ordererprofile.module.css';
import { useUserInfoStore } from '@/store/userInfoStore';
import { useNavigate } from 'react-router-dom';
import { fetchOrdererProfile, getCities, putOrdererProfile, updateToken } from '@/api';

export const OrdererProfile: FC = () => {
  const navigate = useNavigate();
  const userStore = useUserInfoStore();
  const [textareaValue, setTextareaValue] = useState<string | null>('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [citiesArr, setSitiesArr] = useState<{ id: number; name: string; region: string }[]>([]);
  const [locations, setLocations] = useState<{ id: number; name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEqual, setIsEqual] = useState(true);

  const area = useRef<HTMLTextAreaElement>(null);
  const initalData = useRef<{ description: string; locations: { id: number; name: string }[] }>();

  useEffect(() => {
    if (!userStore.user.is_contractor) {
      navigate('../');
    }
  }, [navigate, userStore.user.is_contractor]);

  useEffect(() => {
    if (
      textareaValue !== initalData.current?.description ||
      JSON.stringify(locations) !== JSON.stringify(initalData.current.locations)
    ) {
      setIsEqual(false);
    } else {
      setIsEqual(true);
    }
  }, [locations, textareaValue]);

  useEffect(() => {
    (async () => {
      const res = await updateToken(fetchOrdererProfile, null);
      setTextareaValue(res.description);
      console.log(area.current);
      initalData.current = res;
      setTimeout(() => {
        area.current!.style.height = `${
          Math.floor((area.current!.scrollHeight - 29) / 22) * 22 + 51
        }px`;
      }, 10);
      console.log(area.current!.scrollHeight);
      setLocations(res.locations);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Профиль Заказчика</h2>
      <div className={styles.infoContainer}>
        <img src="/info-blue-ic.svg" alt="" />
        <p className={styles.infoText}>
          Информация о вашей компании будет доступна компаниям-исполнителям после подведения итогов
          тендера.
        </p>
      </div>
      <p className={styles.text}>
        Нажмите на кнопку “Смотреть”, чтобы посмотреть, как эту информацию увидят ваши партнеры.
      </p>
      <div className={styles.borderedContainer}>
        <div className={styles.infoContainer}>
          <img src="/info-blue-ic.svg" alt="" />
          <p className={styles.infoTextBig}>Укажите подробное описание и локации вашей компании</p>
        </div>
      </div>
      <div className={styles.description}>
        <p>Описание компании</p>
        <textarea
          className={styles.textarea}
          value={textareaValue ?? ''}
          ref={area}
          onChange={(e) => {
            setTextareaValue(e.target.value);
            console.log(e.target.scrollHeight);
            e.target.style.height = `${Math.floor(e.target.scrollHeight / 22) * 22}px`;
            console.log(e.target.scrollHeight);
          }}
          name="description"
          id="description"
        ></textarea>
      </div>
      <div className={styles.locations}>
        <p>Локации</p>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={(e) => {
              (async () => {
                setInputValue(e.target.value);
                const res = await getCities(e.target.value);
                setSitiesArr(res.data);
                setIsListOpen(true);
              })();
            }}
          />
          {locations.length !== 0 && (
            <div className={styles.locationsList}>
              {locations.map((e) => (
                <div className={styles.locationItem} key={e.id}>
                  {e.name}
                  <button
                    onClick={() => {
                      setLocations(locations.filter((i) => i.id !== e.id));
                    }}
                    className={styles.deleteBtn}
                  >
                    <img src="/x-icon-white.svg" alt="" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {citiesArr.length !== 0 && isListOpen && (
            <div className={styles.citiesList}>
              {citiesArr.map((e) => (
                <div
                  className={styles.city}
                  onClick={() => {
                    setIsListOpen(false);
                    setInputValue('');
                    const newLocations = [...locations];
                    if (!newLocations.find((i) => i.name === e.name)) {
                      newLocations.push({ id: e.id, name: e.name });
                    }
                    setLocations(newLocations);
                  }}
                  key={e.id}
                >
                  {e.name}
                  <span className={styles.region}>{e.region}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        disabled={isEqual}
        onClick={() => {
          (async () => {
            await updateToken(putOrdererProfile, {
              description: textareaValue ?? '',
              locations: locations.map((e) => e.id),
            });
            const res = await updateToken(fetchOrdererProfile, null);
            setTextareaValue(res.description);
            initalData.current = res;
            setLocations(res.locations);
          })();
        }}
        className={styles.save}
      >
        Сохранить изменения
      </button>
    </div>
  );
};
