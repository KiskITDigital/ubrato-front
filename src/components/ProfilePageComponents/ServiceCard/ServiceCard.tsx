import { FC } from 'react';
import styles from './servicecard.module.css';
import { Checkbox } from '@nextui-org/react';

export const ServiceCard: FC<{
  isChecked: boolean;
  name: string;
  setCheacked: (id: number) => void;
  setPrice: (id: number, price: string) => void;
  id: number;
  price?: number | null;
}> = ({ isChecked, name, setCheacked, id, price, setPrice }) => {
  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: styles.checkText,
  };

  return (
    <div>
      <Checkbox
        onChange={() => {
          setCheacked(id);
        }}
        classNames={checkStyle}
        isSelected={isChecked}
      >
        {name}
      </Checkbox>
      {price !== undefined && (
        <input
          type="number"
          value={price ?? ''}
          onChange={(e) => {
            console.log(e);
            console.log(e.nativeEvent instanceof InputEvent);
            if (e.nativeEvent instanceof InputEvent) {
              if (e.nativeEvent.data !== '.') {
                setPrice(id, e.target.value);
              }
            }
          }}
        />
      )}
    </div>
  );
};
