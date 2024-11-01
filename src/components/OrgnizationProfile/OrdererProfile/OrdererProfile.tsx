import { getOrdererProfile, isFavoriteExecutor, updateToken } from '@/api';
import { OrdererProfileInfo } from '@/types/app';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrganizationProfile } from '../OrganizationProfile/OrganiztionProfile';

export const OrdererProfileView: FC = () => {
  const [data, setData] = useState<OrdererProfileInfo | undefined>();

  const setFavourite = (isFavorite: boolean) => {
    if (data) {
      setData({ ...data, isFavorite: isFavorite });
    }
  };

  const org_id = useParams<{ org_id: string }>().org_id;

  useEffect(() => {
    if (org_id) {
      (async () => {
        const fetchedData = await getOrdererProfile(org_id);
        const token = localStorage.getItem('token');
        if (token && fetchedData) {
          const isFavorite =
            (await (await updateToken(isFavoriteExecutor, org_id))?.data?.status) || false;
          fetchedData.isFavorite = isFavorite;
          setData(fetchedData);
        } else {
          setData(fetchedData);
        }
      })();
    }
  }, [org_id]);

  return <>{data && <OrganizationProfile data={data} setFavourite={setFavourite} />}</>;
};
