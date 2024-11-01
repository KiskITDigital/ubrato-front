import { getContractorProfile, isFavoriteExecutor } from '@/api';
import { ExecutorProfileInfo } from '@/types/app';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrganizationProfile } from '../OrganizationProfile/OrganiztionProfile';

export const ContractorProfileView: FC = () => {
  const [data, setData] = useState<ExecutorProfileInfo | undefined>();

  const org_id = useParams<{ org_id: string }>().org_id;

  useEffect(() => {
    if (org_id) {
      (async () => {
        const fetchedData = await getContractorProfile(org_id);
        const token = localStorage.getItem('token');
        if (token && fetchedData) {
          const isFavorite = (await isFavoriteExecutor(org_id, token))?.data?.status || false;
          fetchedData.isFavorite = isFavorite;
          setData(fetchedData);
        } else {
          setData(fetchedData);
        }
      })();
    }
  }, [org_id]);

  return <>{data && <OrganizationProfile data={data} />}</>;
};
