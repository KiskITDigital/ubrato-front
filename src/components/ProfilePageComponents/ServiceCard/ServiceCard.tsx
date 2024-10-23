import { FC } from 'react';
import styles from './servicecard.module.css';
import { Checkbox, Select, SelectItem } from '@nextui-org/react';

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
    <div className={styles.container}>
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
        <div className={styles.inpContainer}>
          <input
            className={styles.input}
            type="number"
            value={price ?? ''}
            onChange={(e) => {
              if (e.nativeEvent instanceof InputEvent) {
                if (e.nativeEvent.data !== '.') {
                  if (setPrice !== undefined) {
                    setPrice(id, e.target.value);
                  }
                }
              }
            }}
          />
          <p className={styles.rub}>₽</p>
          <Select
            aria-label="Показывать на странице"
            defaultSelectedKeys={['кв. м.']}
            onChange={(e) => {
              console.log(e.target.value);
              // setDefaultPerPage(Number(e.target.value));
            }}
            onOpenChange={(e) => {
              console.log(e);
            }}
            classNames={{
              mainWrapper:
                'flex pl-[8px] justify-center bg-light-gray w-[68px] h-[30px] border-solid border-[1px] rounded-r-[6px]',
              trigger: 'flex justify-between items-center p-0',
              selectorIcon: 'mt-[3px] mr-[3px] z-10 h-fit relative data-[open]:rotate-180 duration-300 transition-all',
              popoverContent:
                'p-[5px] pt-[10px] ml-[-7px] mt-[-5px] w-[70px] border-solid border-accent border-[2px] border-t-0 rounded-b-[6px] bg-white',
            }}
          >
            <SelectItem className='rounded' key={'кв. м.'}>кв. м.</SelectItem>
            <SelectItem key={'кв.м.'}>кв.м.</SelectItem>
          </Select>
        </div>
      )}
    </div>
  );
};
