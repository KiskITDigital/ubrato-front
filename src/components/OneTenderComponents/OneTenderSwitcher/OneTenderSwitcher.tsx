import React, { useState } from 'react';
import { useSwitchStore } from '@/store/switchStore';
import styles from './OneTenderSwitcher.module.css';
import { OneTenderExecutorAcceptModal } from '../OneTenderExecutorAcceptModal/OneTenderExecutorAcceptModal';


type SwitchProps = {
  options: string[];
  noticeKnocks: number;
  button_text: string,
  price: number,
  tenderId: number
}




export const Switchero: React.FC<SwitchProps> = ({ tenderId, options,  button_text, price}) => {
  const { activeIndex, setActiveIndex } = useSwitchStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
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
    {button_text == 'Откликнуться на тендер' ? <button onClick={openModal} className={styles.button_modal_adapt}>Откликнуться на тендер</button> : <></> }
    <div className={styles.switch_container}>
      {options.map((option, index) => (
        <button
          key={index}
          className={`${styles.switch_btn} ${activeIndex === index ? styles.active : ''}`}
          onClick={() => handleSwitch(index)}
        >
          {option}
        </button>
      ))}
      <div>
    {button_text == 'Откликнуться на тендер' ? <button onClick={openModal} className={styles.button_modal}>Откликнуться на тендер</button> : <></> }
        <OneTenderExecutorAcceptModal id={tenderId} isOpen={isOpen} handleChange={handleChange} handleSubmit={handleSubmit} price={price} closeModal={() => closeModal()}></OneTenderExecutorAcceptModal>
      </div>
    </div>
  </> 
  );
};
