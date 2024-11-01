import { getContractorProfile, isFavoriteExecutor, updateToken } from '@/api';
import { ExecutorProfileInfo } from '@/types/app';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OrganizationProfile } from '../OrganizationProfile/OrganiztionProfile';

export const ContractorProfileView: FC = () => {
  const [data, setData] = useState<ExecutorProfileInfo | undefined | null>();

  const org_id = useParams<{ org_id: string }>().org_id;

  useEffect(() => {
    if (org_id) {
      (async () => {
        const fetchedData = await getContractorProfile(org_id);
        const token = localStorage.getItem('token');
        if (token && fetchedData) {
          const isFavorite = (await updateToken(isFavoriteExecutor, org_id))?.data?.status || false;
          fetchedData.isFavorite = isFavorite;
          setData(fetchedData);
        } else {
          setData(fetchedData);
        }
      })();
    }
  }, [org_id]);

  return (
    <>
      {data && <OrganizationProfile data={data} />}
      {data === null && (
        <div className="w-[1130px] pt-6 mx-auto text-[26px]">
          Эта компания ещё не является исполнителем посмотрите на на{' '}
          <Link className="text-accent underline" to={`/organization/${org_id}/orderer`}>
            профиль заказчика
          </Link>
        </div>
      )}
    </>
  );
};
