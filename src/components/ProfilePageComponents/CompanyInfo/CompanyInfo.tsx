import { FC, useEffect, useState } from 'react';
import styles from './companyinfo.module.css';
import { fetchOrganizationInfo, updateToken } from '@/api';
import { Link } from 'react-router-dom';
import { orgInfoT } from '@/api/profileOrganization';

export const CompanyInfo: FC = () => {
  const [companyInfo, setCompanyInfo] = useState<orgInfoT>();

  useEffect(() => {
    (async () => {
      const res = await updateToken(fetchOrganizationInfo, null);
      setCompanyInfo(res);
    })();
  });

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
