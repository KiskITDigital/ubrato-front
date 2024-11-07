import { generateTypesenseClient } from '@/components/FindExecutorComponents/generateSearchclient';
import { tenderList } from '@/types/app';
import { FC, useEffect, useState } from 'react';
import { fetchProduct as getTender } from '@/api/getTender';
import styles from './tenders-advice-tenders.module.css';
import { addFavouriteTender, isFavoriteTender, removeFavoriteTender } from '@/api/favouriteTenders';
import { Link, useNavigate } from 'react-router-dom';
import { useTenderListState } from '@/store/tendersListStore';

interface modifiedTenderList extends tenderList {
  price: number;
  reception_end: number;
  description: string;
  location: string;
  categories: { name: string; services: string[] }[];
  isFavorite: boolean;
  isTextHidden: boolean;
}

const TendersAdvicesTenders: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const [tenderList, setTenderList] = useState<(modifiedTenderList | true)[][]>([]);

  const tenderListStore = useTenderListState();

  const navigate = useNavigate();

  const favoriteExecutorsHandler = async (tender: modifiedTenderList) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const res = tender.isFavorite
        ? removeFavoriteTender(tender.id, token)
        : addFavouriteTender(tender.id, token);
      const resStatus = (await res).data.status;
      if (!resStatus) return;
      const tenderListToFormat = tenderList.flat(Infinity) as modifiedTenderList[];

      updateTenderList(
        tenderListToFormat.map((tenderItem) =>
          tenderItem.id === tender.id
            ? {
                ...tenderItem,
                isFavorite: resStatus ? !tenderItem.isFavorite : tenderItem.isFavorite,
              }
            : tenderItem
        )
      );
    }
  };

  const transformPrice = (value: number | string, currencySymbol: string = '₽'): string => {
    const stringValue = String(value);
    const parts = stringValue.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    if (parts.length === 2) {
      return integerPart + ' ' + parts[1] + ' ' + currencySymbol;
    } else {
      return integerPart + ' ' + currencySymbol;
    }
  };

  const updateTenderList = async (newTenderList: (modifiedTenderList | true)[]) => {
    const changedNewExecutorList: (modifiedTenderList | true)[][] = [];
    for (let i = 0; i < newTenderList.length; i += isMobile ? 1 : 4) {
      const chunk = newTenderList.slice(i, i + (isMobile ? 1 : 4));
      if (chunk.length < 4) {
        for (let i = 0; i < 4 - chunk.length; i++) {
          chunk.push(true);
        }
      }
      changedNewExecutorList.push(chunk);
    }
    setTenderList(changedNewExecutorList);
  };

  // const showAllExecutorText = (id: string) => {
  //   const tenderListToFormat = tenderList.flat(Infinity) as modifiedTenderList[];
  //   const newTenderList = tenderListToFormat.map((tender) =>
  //     tender.id === id ? { ...tender, isTextHidden: false } : tender
  //   );
  //   updateTenderList(newTenderList);
  // };

  // const getShorterText = (text: string) => {
  //   return text.split(' ').slice(0, 10).join(' ');
  // };

  useEffect(() => {
    (async () => {
      const hits = await generateTypesenseClient('tender_index', { per_page: 16 });
      console.log(hits);
      const tenderListPromises =
        hits?.hits?.map(async (hit) => {
          const { id: tenderId } = hit.document as { id: string };
          const tender = await getTender(tenderId);
          const token = localStorage.getItem('token');
          const isFavorite = token ? (await isFavoriteTender(tenderId, token)).data.status : false;
          return { ...tender, isFavorite, isTextHidden: true } as modifiedTenderList;
        }) || [];

      Promise.allSettled(tenderListPromises).then((res) => {
        const fulfilled = res.filter((promise) => promise.status === 'fulfilled');
        const tendersList = fulfilled.map((promise) => {
          return promise.value;
        });
        updateTenderList(tendersList);
        tenderListStore.setTendersCount(hits?.out_of ?? 0);
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.embla__container}>
      {tenderList.map((tenderBlock: (modifiedTenderList | true)[], ind: number) => (
        <div key={ind} className={styles.embla__slide}>
          {tenderBlock.map((tender, ind) =>
            tender !== true ? (
              <div key={tender.id} className={styles.tenderForCarousel}>
                <div>
                  <p className={styles.tenderName}>{tender.name}</p>
                  <p className="font-medium text-[16px] text-[rgba(0,0,0,.6)] line-clamp-4">
                    {tender.description}
                    {/* {tender.isTextHidden && tender.description.split(' ').length > 10
                      ? getShorterText(tender.description)
                      : tender.description}
                    {tender.isTextHidden && tender.description.split(' ').length > 10 && (
                      <img
                        onClick={() => showAllExecutorText(tender.id)}
                        src="/find-executor/arrow-right-black.svg"
                        alt="->"
                      />
                    )} */}
                  </p>
                  <p className={styles.tenderPrice}>{transformPrice(tender.price)}</p>
                  <p className={styles.tenderTime}>
                    Прием откликов по{' '}
                    {new Date(tender.reception_end).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                {/* <div>{!!tender.regions?.length && tender.regions?.map(region => <p key={region.id}>{region.name}</p>)}</div> */}
                {isMobile || (
                  <div className={styles.locationsAndLinkBlock}>
                    <p className={styles.tenderLocation}>{tender.location}</p>
                    <div className="flex">
                      {tender.categories.map((category, ix) => {
                        if (ix < 3) {
                          return (
                            <p
                              key={ix}
                              className="max-w-[150px] line-clamp-3 [&:not(:first-child)]:pl-[10px] [&:not(:last-child)]:pr-[10px] [&:not(:last-child)]:border-r border-[#ECF0F3]"
                            >
                              {category.name}
                            </p>
                          );
                        }
                      })}
                    </div>
                    <div className={`${styles.executorButtons}`}>
                      <button
                        onClick={() => favoriteExecutorsHandler(tender)}
                        className={styles.executorLoveButton}
                      >
                        <img
                          src={`/find-executor/heart-${
                            tender.isFavorite ? 'active' : 'inactive'
                          }.svg`}
                          alt="+"
                        />
                      </button>
                      <Link to={`/tender/${tender.id}`}>
                        <button className={`${styles.executorOfferButton}`}>
                          Перейти к тендеру
                          <img src={'/find-executor/arrow-right-black.svg'} alt="->" />
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div key={ind + Math.random()}></div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default TendersAdvicesTenders;
