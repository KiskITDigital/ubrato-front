import React from 'react';
import { useSwitchStore } from '@/store/switchStore';
import styles from './OneTenderSwitcher.module.css';

type SwitchProps = {
  options: string[];
  noticeKnocks: number;
};

const Switchero: React.FC<SwitchProps> = ({ options }) => {
  const { activeIndex, setActiveIndex } = useSwitchStore();

  const handleSwitch = (index: number) => {
    setActiveIndex(index);
  };

  return (
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
    </div>
  );
};

export default Switchero;
