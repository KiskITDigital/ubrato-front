import { FC, useEffect, useRef, useState } from 'react';
import styles from '../OrdererProfile/ordererprofile.module.css';
import { getCities, updateToken } from '@/api';
import { fetchContractorProfile } from '@/api';
import { contractorProfileData } from '@/api/profileOrganization';
import { useCleaningTypeStore } from '@/store/cleaningTypeStore';
import { useTypesObjectsStore } from '@/store/objectsStore';
import { Accordion, AccordionItem } from '@nextui-org/react';
import ArrowIC from './arrow.svg?react';
import { ServiceCard } from '../ServiceCard/ServiceCard';

type locations = {
  id: number;
  name: string;
  types: { isChecked: boolean; id: number; name: string }[];
}[];

type services = {
  id: number;
  name: string;
  types: { isChecked: boolean; id: number; name: string; price: number | undefined | null }[];
}[];

export const ContractorProfile: FC = () => {
  const [textareaValue, setTextareaValue] = useState<string | null>('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [citiesArr, setSitiesArr] = useState<{ id: number; name: string; region: string }[]>([]);
  const [locations, setLocations] = useState<{ id: number; name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [objectsList, setObjectsList] = useState<locations>([]);
  const [services, setServices] = useState<services>([]);
  const [isServicesShown, setIsServicesShown] = useState(false);
  const [isObjectsShown, setIsObjectsShown] = useState(false);

  const area = useRef<HTMLTextAreaElement>(null);
  const initalData = useRef<contractorProfileData>();

  const objectsStore = useTypesObjectsStore();
  const servicesStore = useCleaningTypeStore();

  const itemClasses = {
    base: `${styles.accordionItem}`,
    title: styles.accordionTitle,
    heading: styles.accordionHeading,
    indicator: styles.accordionIndicator,
    trigger: styles.accordionTrigger,
    content: styles.accordionContent,
    titleWrapper: styles.accordionTitleWrapper,
  };

  const handleServiceCheckbox = (id: number) => {
    let newServices = [...services];
    newServices = newServices.map((e) => {
      return {
        name: e.name,
        id: e.id,
        types: e.types.map((t) => {
          if (t.id === id) {
            return {
              isChecked: !t.isChecked,
              name: t.name,
              price: t.price === undefined && t.price !== null ? 100 : undefined,
              id: t.id,
            };
          } else {
            return t;
          }
        }),
      };
    });
    setServices(newServices);
  };

  const handleServicePrice = (id: number, price: string) => {
    let newServices = [...services];
    newServices = newServices.map((e) => {
      return {
        name: e.name,
        id: e.id,
        types: e.types.map((t) => {
          if (t.id === id) {
            return {
              isChecked: t.isChecked,
              name: t.name,
              price: price ? parseFloat(price) : null,
              id: t.id,
            };
          } else {
            return t;
          }
        }),
      };
    });
    setServices(newServices);
  };

  useEffect(() => {
    (async () => {
      const res = await updateToken(fetchContractorProfile, null);
      setLocations(res.locations);
      setTextareaValue(res.description);
      if (objectsStore.apiObjects.length === 0) {
        await objectsStore.fetchObjects();
      }
      if (servicesStore.apiCleaningTypes.length === 0) {
        await servicesStore.fetchCleaningTypes();
      }
      const newServices = servicesStore.apiCleaningTypes.map((e) => {
        return {
          name: e.name,
          id: e.id,
          types: e.types.map((t) => {
            const price = res.services.find((i) => i.id === t.id);
            return { isChecked: price ? true : false, name: t.name, id: t.id, price: price?.price };
          }),
        };
      });
      const newObjects = objectsStore.apiObjects.map((e) => {
        return {
          name: e.name,
          id: e.id,
          types: e.types.map((t) => {
            const isChecked = res.objects.find((i) => i.id === t.id);
            return { isChecked: isChecked ? true : false, name: t.name, id: t.id };
          }),
        };
      });
      setServices(newServices);
      setObjectsList(newObjects);
      initalData.current = res;
    })();
  }, [objectsStore, servicesStore]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Профиль исполнителя</h2>
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
      <div className="border-b border-dashed border-[rgba(0,0,0,0.15)] pb-[16px]">
        <div className={styles.infoContainer}>
          <img src="/info-blue-ic.svg" alt="" />
          <p className={styles.infoText}>Укажите услуги, которые оказывает ваша компания</p>
        </div>
        <div className={styles.listContainer}>
          <h3 className={styles.partHeader}>Услуги</h3>
          <div className={styles.wrapper}>
            <Accordion
              showDivider={false}
              className={styles.accordionWrapper}
              selectionMode="multiple"
              itemClasses={itemClasses}
            >
              {services.map((e, ix) => (
                <AccordionItem
                  className={`${ix < 9 || isServicesShown ? 'flex' : 'hidden'}`}
                  indicator={<ArrowIC />}
                  title={e.name}
                  key={e.id}
                >
                  <div className={styles.subList}>
                    {e.types.map((o) => (
                      <ServiceCard
                        isChecked={o.isChecked}
                        name={o.name}
                        setCheacked={handleServiceCheckbox}
                        setPrice={handleServicePrice}
                        id={o.id}
                        key={o.id}
                        price={o.price}
                      />
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
            <button
              onClick={() => setIsServicesShown(!isServicesShown)}
              className="underline py-2 px-[15px] bg-[var(--color-gray)] rounded-[13px] w-full text-left"
            >
              {isServicesShown ? 'Скрыть часть объектов' : 'Показать все объекты'}
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-dashed border-[rgba(0,0,0,0.15)] pb-[30px]">
        <div className={styles.infoContainer}>
          <img src="/info-blue-ic.svg" alt="" />
          <p className={styles.infoText}>
            Укажите объекты, на которых оказывает услуги ваша компания
          </p>
        </div>
        <div className={styles.listContainer}>
          <h3 className={styles.partHeader}>Объекты</h3>
          <div className={styles.wrapper}>
            <Accordion
              showDivider={false}
              className={styles.accordionWrapper}
              selectionMode="multiple"
              itemClasses={itemClasses}
            >
              {objectsList.map((e, ix) => (
                <AccordionItem
                  className={`${ix < 9 || isObjectsShown ? 'flex' : 'hidden'}`}
                  indicator={<ArrowIC />}
                  title={e.name}
                  key={e.id}
                >
                  <div className={styles.subList}>
                    {e.types.map((o) => (
                      <ServiceCard
                        isChecked={o.isChecked}
                        name={o.name}
                        setCheacked={handleServiceCheckbox}
                        setPrice={handleServicePrice}
                        id={o.id}
                        key={o.id}
                      />
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
            <button
              onClick={() => setIsObjectsShown(!isObjectsShown)}
              className="underline py-2 px-[15px] bg-[var(--color-gray)] rounded-[13px] w-full text-left"
            >
              {isObjectsShown ? 'Скрыть часть объектов' : 'Показать все объекты'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
