import { FC, forwardRef, Ref, useEffect, useRef, useState } from 'react';
import styles from '../../CreateTender.module.css';
import datesStyles from './Dates.module.css';
import { useCreateTenderState } from '@/store/createTenderStore';
import { Checkbox, DateRangePicker, RangeValue, Switch, Tooltip } from '@nextui-org/react';
import dayjs from 'dayjs';
import {
  CalendarDate,
  CalendarDateTime,
  getLocalTimeZone,
  parseDate,
  parseDateTime,
  today,
} from '@internationalized/date';
import { useIMask } from 'react-imask';

const Dates: FC<{ ref2?: React.LegacyRef<HTMLDivElement> }> = forwardRef<
  HTMLDivElement,
  { ref2?: React.LegacyRef<HTMLDivElement> }
>((_, ref2) => {
  const createTenderState = useCreateTenderState();

  const calendarRef1 = useRef<HTMLDivElement>(null);
  const calendarRef2 = useRef<HTMLDivElement>(null);

  const spanRef = useRef<HTMLSpanElement>(null);

  const [isCalendar1Open, setIsCalendar1Open] = useState(false);
  const [isCalendar2Open, setIsCalendar2Open] = useState(false);

  const { ref, value, setValue, unmaskedValue } = useIMask({
    mask: Number,
    min: 0.01,
    max: 9999999999.99,
    thousandsSeparator: ' ',
    scale: 2,
    radix: ',',
    mapToRadix: ['.'],
  });

  const classNames = {
    base: datesStyles.base,
    calendar: datesStyles.calendar,
    calendarContent: datesStyles.calendarContent,
    inputWrapper: datesStyles.inputWrapper,
    innerWrapper: datesStyles.innerWrapper,
    input: datesStyles.input,
    segment: datesStyles.segment,
    separator: datesStyles.separator,
  };

  useEffect(() => {
    createTenderState.handleSimpleInput('price', unmaskedValue);
  }, [unmaskedValue]);

  useEffect(() => {
    if (createTenderState.price === '') {
      setValue('');
    }
  }, [setValue, createTenderState.price]);

  return (
    <div ref={ref2} className={`${styles.firstSections}`}>
      <span ref={spanRef} tabIndex={-1}></span>
      <div className={`${styles.firstSections__div} ${styles.firstSections__responses}`}>
        <div className={`${styles.firstSections__div__title}`}>
          <p className={`${styles.firstSections__div__title__p}`}>Прием откликов</p>
        </div>
        <div
          ref={calendarRef1}
          className={`${styles.firstSections__div__main} ${styles.firstSections__div__mainWork} ${datesStyles.dateTimeContainer}`}
          onClick={() => {
            setIsCalendar1Open(true);
          }}
        >
          <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
          <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
          <DateRangePicker
            aria-label="прием откликов"
            classNames={classNames}
            isOpen={isCalendar1Open}
            onOpenChange={(e) => {
              setIsCalendar1Open(e);
            }}
            disableAnimation
            value={{
              start: parseDateTime(dayjs(createTenderState.reception_start).format().split('+')[0]),
              end: parseDateTime(dayjs(createTenderState.reception_end).format().split('+')[0]),
            }}
            onChange={(newVal: RangeValue<CalendarDateTime>) => {
              const firstDate = new Date(
                newVal.start.year,
                newVal.start.month - 1,
                newVal.start.day,
                newVal.start.hour,
                newVal.start.minute
              );
              const secondDate = new Date(
                newVal.end.year,
                newVal.end.month - 1,
                newVal.end.day,
                newVal.end.hour,
                newVal.end.minute
              );
              if (
                firstDate.getFullYear() > 2030 ||
                firstDate.getFullYear() < new Date().getFullYear() ||
                secondDate.getFullYear() > 2030 ||
                secondDate.getFullYear() < new Date().getFullYear()
              )
                return;
              if (firstDate.getTime() > secondDate.getTime()) {
                createTenderState.handleSimpleInput('reception_start', firstDate);
                createTenderState.handleSimpleInput('reception_end', firstDate);
              } else {
                createTenderState.handleSimpleInput('reception_start', firstDate);
                createTenderState.handleSimpleInput('reception_end', secondDate);
              }
            }}
            minValue={today(getLocalTimeZone())}
            selectorIcon={
              <img className="w-[16px] h-[16px]" src="/calendar-ic.svg" alt="calendar" />
            }
          />
        </div>
      </div>
      <div className={`${styles.firstSections__div}`}>
        <div className={`${styles.firstSections__div__title}`}>
          <p className={`${styles.firstSections__div__title__p}`}>Стоимость</p>
          <Switch
            aria-hidden={false}
            className={`${styles.SwitchNextUI} ${
              createTenderState.is_NDS ? styles.SwitchNextUIOn : ''
            }`}
            isSelected={createTenderState.is_NDS}
            onValueChange={() =>
              createTenderState.handleSimpleInput('is_NDS', !createTenderState.is_NDS)
            }
          >
            вкл. НДС
          </Switch>
        </div>
        <div className={`${styles.firstSections__div__main}`}>
          <div className={`${styles.firstSections__div__main__block} relative`}>
            <p className={`${styles.firstSections__div__main__block__p}`}>Стоимость в рублях</p>
            <div className="absolute right-0">
              <Tooltip
                classNames={{
                  base: 'bg-white text-[12px] px-[8px] py-[4px] rounded-[8px] shadow-md',
                }}
                content={'Введите значение от 0,01 до 9 999 999 999,99 или выберите “Договорная”'}
                closeDelay={100}
              >
                <button>
                  <img className="w-[16px] h-[16px]" src="/info-ic.svg" alt="info" />
                </button>
              </Tooltip>
            </div>
            <input
              // onClick={(e) => e.stopPropagation()}
              onFocus={() => createTenderState.removeError('price')}
              onBlur={() => {
                !createTenderState.price && createTenderState.addError('price');
                +createTenderState.price === 0 && createTenderState.handleSimpleInput('price', '');
              }}
              value={value}
              onChange={(e) => {
                if (/^0\d+/.test(e.target.value)) {
                  setValue(value.slice(1));
                } else {
                  setValue(e.target.value);
                }
              }}
              className={`${styles.input} ${styles.firstSections__div__main__block__input} ${
                createTenderState.errors.includes('price') && !createTenderState.is_contract_price
                  ? styles.inputError
                  : ''
              }`}
              type="text"
              ref={ref as Ref<HTMLInputElement>}
            />
            {createTenderState.errors.includes('price') && !createTenderState.is_contract_price && (
              <p
                className={`${styles.inputErrorText} ${styles.inputErrorTextPrice} ${styles.inputErrorTenderPrice}`}
              >
                Обязательно для заполнения
              </p>
            )}
          </div>
          <div
            className={`${styles.firstSections__div__main__block} ${styles.CheckboxNextUI__block}`}
          >
            <span className={`${styles.CheckboxNextUI__block__span}`}></span>
            <Checkbox
              onValueChange={() =>
                createTenderState.handleSimpleInput(
                  'is_contract_price',
                  !createTenderState.is_contract_price
                )
              }
              className={`${styles.CheckboxNextUI} ${
                createTenderState.is_contract_price ? styles.CheckboxNextUIActive : ''
              } ${styles.CheckboxNextUIIsContract}`}
              isSelected={createTenderState.is_contract_price}
            >
              Договорная
            </Checkbox>
          </div>
        </div>
      </div>
      <div className={`${styles.firstSections__div} ${styles.firstSections__responses}`}>
        <div className={`${styles.firstSections__div__title}`}>
          <p className={`${styles.firstSections__div__title__p}`}>Оказание услуг</p>
        </div>
        <div
          className={`${styles.firstSections__div__main} ${styles.firstSections__div__mainWork}`}
          ref={calendarRef2}
        >
          <p className={`${styles.firstSections__div__main__block__p}`}>Начало</p>
          <p className={`${styles.firstSections__div__main__block__p}`}>Окончание</p>
          <DateRangePicker
            aria-label="оказание услуг"
            classNames={classNames}
            isOpen={isCalendar2Open}
            onOpenChange={(e) => {
              setIsCalendar2Open(e);
            }}
            disableAnimation
            value={{
              start: parseDate(dayjs(createTenderState.work_start).format().split('T')[0]),
              end: parseDate(dayjs(createTenderState.work_end).format().split('T')[0]),
            }}
            onChange={(newVal: RangeValue<CalendarDate>) => {
              const firstDate = new Date(
                newVal.start.year,
                newVal.start.month - 1,
                newVal.start.day
              );
              const secondDate = new Date(newVal.end.year, newVal.end.month - 1, newVal.end.day);
              if (
                firstDate.getFullYear() > 2030 ||
                firstDate.getFullYear() < new Date().getFullYear() ||
                secondDate.getFullYear() > 2030 ||
                secondDate.getFullYear() < new Date().getFullYear()
              )
                return;
              if (firstDate.getTime() > secondDate.getTime()) {
                createTenderState.handleSimpleInput('work_start', firstDate);
                createTenderState.handleSimpleInput('work_end', firstDate);
              } else {
                createTenderState.handleSimpleInput('work_start', firstDate);
                createTenderState.handleSimpleInput('work_end', secondDate);
              }
            }}
            minValue={today(getLocalTimeZone())}
            selectorIcon={
              <img className="w-[16px] h-[16px]" src="/calendar-ic.svg" alt="calendar" />
            }
          />
        </div>
      </div>
    </div>
  );
});

export default Dates;
