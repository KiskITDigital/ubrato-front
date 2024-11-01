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
              mainWrapper: '',
              value: 'max-w-[60px] block',
              trigger:
                'p-0 gap-0 flex pl-[8px] justify-between bg-light-gray w-[88px] h-[30px] border-solid border-[1px] rounded-r-[6px] data-[open=true]:rounded-br-none',
              selectorIcon:
                'z-10 h-fit relative data-[open]:rotate-180 duration-300 transition-all',
              popoverContent:
                'p-[5px] ml-[-22px] mt-[-5px] w-[110px] text-[12px] border-solid border-[1px] border-t-0 rounded-b-[6px] bg-white',
            }}
          >
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'ед.'}
            >
              ед.[единиц]
            </SelectItem>
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'шт.'}
            >
              шт.
            </SelectItem>
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'кг'}
            >
              кг
            </SelectItem>
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'т'}
            >
              т[тонн]
            </SelectItem>
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'м.'}
            >
              м.
            </SelectItem>
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'кв. м.'}
            >
              кв. м.
            </SelectItem>
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'куб. м.'}
            >
              куб. м.
            </SelectItem>
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'ч.'}
            >
              ч.
            </SelectItem>
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'дн.'}
            >
              дн.
            </SelectItem>
            <SelectItem
              className="font-bold flex items-center h-[22px] rounded hover:bg-light-gray"
              key={'мес.'}
            >
              мес.
            </SelectItem>
          </Select>
        </div>
      )}
    </div>
  );
};
