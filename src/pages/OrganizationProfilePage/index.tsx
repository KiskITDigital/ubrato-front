import { useUserInfoStore } from '@/store/userInfoStore';
import { FC } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export function groupBy<T>(iterable: Iterable<T>, fn: (item: T) => string | number) {
  return [...iterable].reduce<Record<string, T[]>>((groups, curr) => {
    const key = fn(curr);
    const group = groups[key] ?? [];
    group.push(curr);
    return { ...groups, [key]: group };
  }, {});
}

const OrganizationProfilePage: FC = () => {
  const org_id = useParams<{ org_id: string }>().org_id;
  const navigate = useNavigate();

  const userInfoStore = useUserInfoStore();

  return (
    <>
      {org_id === userInfoStore.user.organization.id && (
        <div className="w-[1130px] mx-auto">
          <button
            className="flex gap-2 items-center text-[18px] font-medium px-2 py-1 border border-black rounded-md"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img className="rotate-180" src="/arrow-with-line-right.svg" alt="arrow back" />
            Назад
          </button>
          <p className="my-5 text-[28px] font-bold">Как профиль вашей компании видят контрагенты</p>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default OrganizationProfilePage;
