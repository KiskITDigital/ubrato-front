import React, { useState } from 'react';
import { useSwitchStore } from '@/store/switchStore';
import styles from './OneTenderSwitcher.module.css';
import { OneTenderExecutorAcceptModal } from '../OneTenderExecutorAcceptModal/OneTenderExecutorAcceptModal';
import { useUserInfoStore } from '@/store/userInfoStore';
import { Link } from 'react-router-dom';

type SwitchProps = {
  setResponse: () => void;
  noticeKnocks: number;
  button_text: string;
  price: number;
  tenderId: string | undefined;
  response: boolean;
  user_id: string;
};

export const Switchero: React.FC<SwitchProps> = ({
  setResponse,
  tenderId,
  button_text,
  price,
  response,
  user_id,
}) => {
  const userInfoStore = useUserInfoStore();

  const { activeIndex, setActiveIndex } = useSwitchStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const userInfo = useUserInfoStore();
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitch = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <>
      {button_text == 'Откликнуться на тендер' ? (
        <button onClick={openModal} className={styles.button_modal_adapt}>
          Откликнуться на тендер
        </button>
      ) : (
        <></>
      )}

      <div className={styles.switch_container}>
        <div>
          <Link to=''>Тендер</Link>
          <Link to="responses">Отклики</Link>
          <Link to="questions_and_answers">Вопросы и ответы</Link>
          <Link to="more_inforamtion">Доп. информация</Link>
        </div>
        <div>
          {userInfoStore.is_contractor &&
          button_text == 'Откликнуться на тендер' &&
          user_id != userInfo.user.id ? (
            <button onClick={openModal} className={styles.button_modal}>
              Откликнуться на тендер
            </button>
          ) : (
            <></>
          )}
          <OneTenderExecutorAcceptModal
            setResponse={setResponse}
            response={response}
            id={tenderId}
            isOpen={isOpen}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            price={price}
            closeModal={() => closeModal()}
          ></OneTenderExecutorAcceptModal>
        </div>
      </div>
    </>
  );
};
