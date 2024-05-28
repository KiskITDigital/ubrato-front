import { FC } from 'react';
import styles from './servicecard.module.css';
import { Checkbox } from '@nextui-org/react';

export const ServiceCard: FC<{
  isChecked: boolean;
  name: string;
  setCheacked: (id: number) => void;
  id: number;
  setPrice?: (id: number, price: string) => void;
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
      {price !== undefined && setPrice !== undefined && (
        <input
          type="number"
          value={price ?? ''}
          onChange={(e) => {
            console.log(e);
            console.log(e.nativeEvent instanceof InputEvent);
            if (e.nativeEvent instanceof InputEvent) {
              if (e.nativeEvent.data !== '.') {
                if (setPrice !== undefined) {
                  setPrice(id, e.target.value);
                }
              }
            }
          }}
        />
      )}
    </div>
  );
};
