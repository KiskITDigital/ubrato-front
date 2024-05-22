import { FC, useEffect, useRef, useState } from 'react';
import styles from './companyinfo.module.css';
import { fetchOrganizationInfo, fetchFileInfo, updateToken, uploadFile } from '@/api';
import { Link } from 'react-router-dom';
import { orgInfoT, putBrandData } from '@/api/profileOrganization';
import { Avatar } from '@nextui-org/react';
import { InputPhone } from '../inputPhone/InputPhone';

export const CompanyInfo: FC = () => {
  const [companyInfo, setCompanyInfo] = useState<orgInfoT>();
  const [brandName, setBrandName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isBrandEqual, setIsBrandEqual] = useState(true);
  const [avatarDate, setAvatarDate] = useState<Date>();
  const [avatarInfo, setAvatarInfo] = useState<{
    name: string;
    format: string;
    size: number;
    ctime: string;
  }>();
  const [emails, setEmails] = useState<{ contact: string; info: string }[]>([]);
  const [phones, setPhones] = useState<{ contact: string; info: string }[]>([]);
  const [messengers, setMessengers] = useState<{ contact: string; info: string }[]>([]);

  const initialBrandInfo = useRef<{ brand_name: string; avatar: string }>();

  const avatarStyle = {
    base: styles.base,
    img: styles.img,
    icon: styles.icon,
  };

  useEffect(() => {
    if (
      initialBrandInfo.current?.avatar !== avatar ||
      initialBrandInfo.current.brand_name !== brandName
    ) {
      setIsBrandEqual(false);
    } else {
      setIsBrandEqual(true);
    }
    (async () => {
      if (avatar.length > 0) {
        const avatarInfoRes = await fetchFileInfo(avatar.replace('https://cdn.ubrato.ru/s3', ''));
        setAvatarDate(new Date(avatarInfoRes.ctime));
        setAvatarInfo(avatarInfoRes);
      }
    })();
  }, [avatar, brandName]);

  useEffect(() => {
    (async () => {
      const res = await updateToken(fetchOrganizationInfo, null);
      setBrandName(res.brand_name);
      setAvatar(res.avatar);
      if (res.avatar) {
        (async () => {
          const avatarInfoRes = await fetchFileInfo(
            res.avatar.replace('https://cdn.ubrato.ru/s3', '')
          );
          setAvatarDate(new Date(avatarInfoRes.ctime));
          setAvatarInfo(avatarInfoRes);
        })();
      }
      setEmails(res.email);
      setPhones(res.phone);
      setMessengers(res.messager);
      setCompanyInfo(res);
      initialBrandInfo.current = { brand_name: res.brand_name, avatar: res.avatar };
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Публичная информация о компании</h2>
      <div className={styles.infoContainer}>
        <img src="/info-ic.svg" alt="" />
        <p className={styles.infoText}>
          Вся информация с этой страницы будет опубликована в публичном профиле вашей компании за
          исключением контактов. Их ваши контрагенты увидят после подведения итогов тендера.
        </p>
      </div>
      <div className={styles.brandInfo}>
        <h3 className={styles.blockHeader}>Бренд</h3>
        <div className={styles.brandGrid}>
          <p className={styles.gridHeader}>Наименование бренда</p>
          <input
            value={brandName}
            onChange={(e) => {
              setBrandName(e.target.value);
            }}
            className={styles.input}
            type="text"
          />
          <p className={styles.gridHeader}>Логотип компании</p>
          <div className={styles.avatarContainer}>
            <Avatar src={avatar} classNames={avatarStyle} />
            <div className={styles.avatarInfo}>
              <div className={styles.flexText}>
                <p className={styles.text}>{avatarInfo?.format.slice(1)}</p>
                <p className={styles.text}>
                  {avatarInfo ? (avatarInfo?.size / 1024).toFixed(1) : ''}kb
                </p>
              </div>
              <p className={styles.text}>
                Загружен {avatarDate?.toLocaleString('default', { day: 'numeric', month: 'long' })}{' '}
                {avatarDate?.getFullYear()}
              </p>
              <label htmlFor="brand_avatar">
                <input
                  onChange={async (e) => {
                    const rawData = e.target.files![0];
                    const token = localStorage.getItem('token');
                    const parameters = {
                      file: rawData,
                      private: false,
                    };
                    if (token) {
                      const link = await updateToken<string, { file: File; private: boolean }>(
                        uploadFile,
                        parameters
                      );
                      const avatar = `https://cdn.ubrato.ru/s3${link?.replace('/files', '')}`;
                      setAvatar(avatar);
                    }
                  }}
                  className={styles.baseInput}
                  id="brand_avatar"
                  accept="image/png, image/jpeg"
                  type="file"
                />
                <p className={styles.avatarInput}>
                  <img src="/change-ic.svg" alt="" /> Заменить
                </p>
              </label>
            </div>
          </div>
          <button
            onClick={() => {
              const params = { name: brandName, avatar: avatar };
              (async () => {
                await updateToken(putBrandData, params);
                const res = await updateToken(fetchOrganizationInfo, null);
                initialBrandInfo.current = { brand_name: res.brand_name, avatar: res.avatar };
                setBrandName(res.brand_name);
                setAvatar(res.avatar);
                setCompanyInfo(res);
                setIsBrandEqual(true);
              })();
            }}
            className={styles.brandBtn}
            disabled={isBrandEqual}
          >
            Сохранить изменения
          </button>
        </div>
      </div>
      <div className={styles.contacts}>
        <h3 className={styles.blockHeader}>Контакты</h3>
        <div className={styles.brandGrid}>
          <p className={styles.gridHeader}>Номер телефона</p>
          <div className={styles.inputs}>
            {phones.length === 0 && <InputPhone phones={phones} setPhones={setPhones} />}
            {phones.length !== 0 &&
              phones.map((_, ix) => (
                <InputPhone
                  phones={phones}
                  setPhones={setPhones}
                  ix={ix}
                  key={crypto.randomUUID()}
                />
              ))}
            <button
              onClick={() => {
                const newPhones = [...phones];
                newPhones.push({ contact: '', info: '' });
                setPhones(newPhones);
              }}
              className={styles.addContact}
            >
              Добавить еще один номер телефона
            </button>
          </div>
          <p className={styles.gridHeader}>Электронная почта</p>
          <div>
            <input className={`${styles.contactInput}`} type="text" />
            <input
              className={`${styles.contactInput} ${styles.comment}`}
              type="text"
              placeholder="Комментарий"
            />
            <button className={styles.addContact}>Добавить еще один адрес электронной почты</button>
          </div>
          <p className={styles.gridHeader}>Мессенджер</p>
          <div>
            <input className={`${styles.contactInput}`} type="text" />
            <input
              className={`${styles.contactInput} ${styles.comment}`}
              type="text"
              placeholder="Комментарий"
            />
            <button className={styles.addContact}>Добавить еще один мессенджер</button>
          </div>
        </div>
      </div>
      <div className={styles.egrulData}>
        <h3 className={styles.blockHeader}>Данные из ЕГРЮЛ</h3>
        <div className={styles.infoContainer}>
          <img src="/info-ic.svg" alt="" />
          <p className={styles.infoText}>
            Данные компании получены из Единого государственного реестра юридических лиц
            автоматически на основе идентификационного номера налогоплательщика. Если вы заметили
            ошибку,{' '}
            <Link to="../help" className="underline">
              свяжитесь
            </Link>{' '}
            с администрацией Ubrato.
          </p>
        </div>
        <div className="grid grid-cols-2 w-full items-center mt-[20px] gap-[16px]">
          <p className={`text-base ${styles.rowName}`}>Сокращенное наименование</p>
          <p className={styles.rowData}>{companyInfo?.short_name}</p>
          <p className={`text-base ${styles.rowName}`}>Полное наименование</p>
          <p className={styles.rowData}>{companyInfo?.full_name}</p>
          <p className={`text-base ${styles.rowName}`}>ИНН</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.inn}</p>
          <p className={`text-base ${styles.rowName}`}>ОКПО</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.okpo}</p>
          <p className={`text-base ${styles.rowName}`}>ОГРН</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.ogrn}</p>
          <p className={`text-base ${styles.rowName}`}>КПП</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.kpp}</p>
          <p className={`text-base ${styles.rowName}`}>Код налогового органа</p>
          <p className={`${styles.rowData} w-[222px]`}>{companyInfo?.tax_code}</p>
        </div>
      </div>
    </div>
  );
};
