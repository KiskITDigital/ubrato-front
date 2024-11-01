/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef } from 'react';
import styles from './organization-profile-page.module.css';
import { ExecutorProfileInfo, OrdererProfileInfo } from '@/types/app';
import { Link, useNavigate } from 'react-router-dom';
import Info from '@/components/OrganizationProfileComponents/Info';
import Description from '@/components/OrganizationProfileComponents/Description';
import Locations from '@/components/OrganizationProfileComponents/Locations';
import Services from '@/components/OrganizationProfileComponents/Services';
import Objects from '@/components/OrganizationProfileComponents/Objects';
import Portfolio from '@/components/OrganizationProfileComponents/Portfolio';
import { useUserInfoStore } from '@/store/userInfoStore';
import { addFavoriteExecutor, removeFavoriteExecutor, updateToken } from '@/api';

interface OrganizationProfileProps {
  data: ExecutorProfileInfo | OrdererProfileInfo | null;
  // isLoading: boolean;
  setFavourite: (isFavorite: boolean) => void;
}

export const OrganizationProfile: FC<OrganizationProfileProps> = ({ data, setFavourite }) => {
  const startRef = useRef<HTMLHeadingElement>(null);

  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
      navigate('/login');
    }
  }, []);

  const favoriteExecutorsHandler = (organization: { id: string; isFavorite: boolean }) => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        const res = organization.isFavorite
          ? await updateToken(removeFavoriteExecutor, organization.id)
          : await updateToken(addFavoriteExecutor, organization.id);
        const resStatus = res.data.status;
        if (resStatus) {
          setFavourite(!organization.isFavorite);
        }
      }
    })();
  };

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 300, behavior: 'smooth' });
    }, 0);
  }, []);

  return (
    <div className={`container ${styles.container}`} ref={startRef}>
      {data ? (
        <>
          <Info
            isFavorite={data.isFavorite}
            favoriteExecutorsHandler={favoriteExecutorsHandler}
            orgId={data.org.id}
            status={'executor' in data ? 'executor' : 'orderer'}
            img={data.org.avatar}
            brand={data.org.brand_name}
            name={data.org.short_name}
            inn={data.org.inn}
          />
          {'orderer' in data
            ? !!data.orderer.description && <Description text={data.orderer.description} />
            : !!data.executor.description && <Description text={data.executor.description} />}
          {'orderer' in data
            ? !!data.orderer.locations.length && (
                <Locations status="orderer" locations={data.orderer.locations} />
              )
            : !!data.executor.locations.length && (
                <Locations status="executor" locations={data.executor.locations} />
              )}
          {'executor' in data && (
            <>
              {!!data.executor.services.length && <Services services={data.executor.services} />}
              {!!data.executor.objects.length && <Objects objects={data.executor.objects} />}
              {!!data.executor.portfolio.length && (
                <Portfolio portfolio={data.executor.portfolio} />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Link className={styles.link} to="/find-executor">
            перейти к списку исполнителей
          </Link>
        </>
      )}
    </div>
  );
};
