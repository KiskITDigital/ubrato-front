import { useCleaningTypeStore } from '@/store/cleaningTypeStore';
import { useCreateTenderState } from '@/store/createTenderStore';
import { useTypesObjectsStore } from '@/store/objectsStore';
import { FC, useState } from 'react';
import { formatDate } from '../../funcs';
import { createTender, offerTender, updateToken } from '@/api/index';
import styles from '../../CreateTender.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@/components/Modal';
import AfterSendInfo from '../AfterSendInfo/AfterSendInfo';
import { AxiosError } from 'axios';
import { createTenderData } from '@/types/app';

const SendButtons: FC = () => {
  const createTenderState = useCreateTenderState();
  const objectsStore = useTypesObjectsStore();
  const cleaningTypeStore = useCleaningTypeStore();

  const [isModal, setIsModal] = useState<'' | 'tender' | 'draft'>('');
  const navigate = useNavigate();

  const submit = async (isDraft: boolean) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/register');
      return;
    }
    if (createTenderState.validateInputs(isDraft)) return;
    const arrToSearchObjectTypes = objectsStore.apiObjects
      .flatMap((type) => type.types)
      .filter((el) => createTenderState.objectCategory.includes(el.name))
      .map((el) => el.id);
    const servicesToCheck = createTenderState.services
      .map((el) => el.types)
      .reduce((acc, el) => [...acc, ...el], [])
      .map((el) => el.name);
    const arrToSearchServicesTypes = cleaningTypeStore.apiCleaningTypes
      .filter((el) => createTenderState.services.some((elem) => elem.name === el.name))
      .flatMap((type) => type.types)
      .filter((el) => servicesToCheck.includes(el.name))
      .map((el) => el.id);
    const city_id =
      createTenderState.cities.find((el) => el.name === createTenderState.city)?.id || 0;

    const objectToSend = {
      objects_types: arrToSearchObjectTypes.length ? arrToSearchObjectTypes : [],
      services_types: arrToSearchServicesTypes.length ? arrToSearchServicesTypes : [],
      specification: createTenderState.cleaningTZ ? createTenderState.cleaningTZ.linkToSend : '',
      name: createTenderState.name,
      price: +createTenderState.price.replaceAll(' ', ''),
      is_contract_price: +createTenderState.price ? createTenderState.is_contract_price : true,
      is_nds_price: createTenderState.is_NDS,
      floor_space: +createTenderState.floor_space,
      wishes: createTenderState.wishes,
      description: createTenderState.description,
      reception_start: createTenderState.reception_start.toISOString(),
      reception_end: createTenderState.reception_end.toISOString(),
      work_start: formatDate(createTenderState.work_start),
      work_end: formatDate(createTenderState.work_end),
      city_id: city_id || null,
      attachments: createTenderState.attachments.map((attachment) => attachment.linkToSend),
    };
    // console.log();

    try {
      const res =
        (isDraft || city_id) &&
        ((await updateToken<
          { status: number; data: { id: number } },
          { parameters: createTenderData; isDraft?: boolean }
        >(createTender, { parameters: objectToSend, isDraft: isDraft })) as {
          status: number;
          data: { id: number };
        });
      // console.log(res);
      if (res && res.status === 200) {
        if (createTenderState.executorToSend)
          offerTender(token, createTenderState.executorToSend.id, res.data.id);
        createTenderState.clear();
        setIsModal(isDraft ? 'draft' : 'tender');
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        navigate('/login');
      }
    }
  };
  return (
    <div className={`${styles.section} ${styles.sendButtons}`}>
      {!!isModal && (
        <Modal isOpen={!!isModal}>
          <AfterSendInfo
            isDraft={isModal === 'draft'}
            closeModal={() => {
              setIsModal('');
              createTenderState.changeExecutorToSend();
            }}
            executorName={createTenderState.executorToSend?.name || null}
          />
        </Modal>
      )}
      <p className="ml-[244px]">
        Нажимая на кнопку «Отправить на модерацию» Я даю{' '}
        <Link to="" className="text-accent underline text-sm">
          Согласие на обработку персональных данных
        </Link>{' '}
        в соответствии с{' '}
        <Link to="" className="text-accent underline text-sm">
          Политикой в отношении обработки персональных данных
        </Link>{' '}
        и соглашаюсь с условиями настоящей{' '}
        <Link to="" className="text-accent underline text-sm">
          Оферты
        </Link>
        , а также даю{' '}
        <Link to="" className="text-accent underline text-sm">
          Согласие на размещение и обнародование фотографий и иных материалов
        </Link>
        .
      </p>
      <div className={`${styles.section__block}`}>
        <div className={`ml-[244px] ${styles.section__sendButtons__block}`}>
          <button
            onClick={() => {
              submit(false);
            }}
            className={styles.section__sendButtons__block__moderationButton}
          >
            Отправить на модерацию
          </button>
          <button
            disabled={!!createTenderState.executorToSend?.name}
            onClick={() => {
              submit(true);
            }}
            className={styles.section__sendButtons__block__templateButton}
          >
            Сохранить как черновик
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendButtons;
