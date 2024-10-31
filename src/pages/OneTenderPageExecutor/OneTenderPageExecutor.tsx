/* eslint-disable react-hooks/exhaustive-deps */
import { OneTenderHeader } from '@/components/OneTenderComponents/OneTenderHeader/OneTenderHeader';
import { FC, useEffect, useState } from 'react';
import { Link, Outlet, Params, useLocation, useParams } from 'react-router-dom';
import { useTenderInfoStore } from '@/store/tenderStore';
import { useUserInfoStore } from '@/store/userInfoStore';
import { OneTenderExecutorAcceptModal } from '@/components/OneTenderComponents/OneTenderExecutorAcceptModal/OneTenderExecutorAcceptModal';

export const OneTenderPageExecutor: FC = () => {
  const tenderInfoState = useTenderInfoStore();
  const userInfoStore = useUserInfoStore();

  const { id }: Readonly<Params<string>> = useParams();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const changeResponseStatus = () => {
    tenderInfoState.setResponded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    (async () => {
      if (id) {
        await tenderInfoState.fetchTenderInfo(id, token);
      }
    })();
  }, [id]);

  return (
    <div>
      <OneTenderHeader
        status={tenderInfoState.tenderInfo.active}
        id={tenderInfoState.tenderInfo.id}
        name={tenderInfoState.tenderInfo.name}
      ></OneTenderHeader>

      <div className="w-[1024px] mx-auto">
        <div className="flex border-b pb-[14px] justify-between">
          <div className="flex">
            <Link
              className={`pr-[14px] relative border-solid border-r border-[#ddd] ${
                !location.pathname.includes('responses') &&
                !location.pathname.includes('questions_and_answers') &&
                !location.pathname.includes('more_inforamtion')
                  ? 'after:content-[" "] after:bottom-[-14px] after:block after:absolute after:w-[calc(100%-14px)] after:h-[2px] after:bg-accent'
                  : ''
              }`}
              to=""
            >
              Тендер
            </Link>
            <Link
              className={`pr-[14px] pl-[14px] border-solid border-r border-[#ddd] relative ${
                location.pathname.includes('responses')
                  ? 'after:content-[" "] after:bottom-[-14px] after:block after:absolute after:w-[calc(100%-28px)] after:h-[2px] after:bg-accent'
                  : ''
              }`}
              to="responses"
            >
              Отклики
            </Link>
            <Link
              className={`pr-[14px] pl-[14px] border-solid border-r border-[#ddd] relative ${
                location.pathname.includes('questions_and_answers')
                  ? 'after:content-[" "] after:bottom-[-14px] after:block after:absolute after:w-[calc(100%-28px)] after:h-[2px] after:bg-accent'
                  : ''
              }`}
              to="questions_and_answers"
            >
              Вопросы и ответы
            </Link>
            <Link
              className={`pl-[14px] relative ${
                location.pathname.includes('more_inforamtion')
                  ? 'after:content-[" "] after:bottom-[-14px] after:block after:absolute after:w-[calc(100%-14px)] after:h-[2px] after:bg-accent'
                  : ''
              }`}
              to="more_inforamtion"
            >
              Доп. информация
            </Link>
          </div>
          <div>
            {userInfoStore.is_contractor &&
              tenderInfoState.tenderInfo.user_id != userInfoStore.user.id &&
              !tenderInfoState.isResponded && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="ml-auto right-0 top-[-47px] px-2 py-1 rounded-lg bg-accent text-white"
                >
                  Откликнуться на тендер
                </button>
              )}
            {userInfoStore.is_contractor &&
              tenderInfoState.tenderInfo.user_id != userInfoStore.user.id &&
              tenderInfoState.isResponded && (
                <p className="right-0 top-[-47px] px-2 py-1 rounded-lg bg-accent text-white">
                  Вы уже откликнулись на тендер
                </p>
              )}
          </div>
        </div>
      </div>
      <Outlet />
      <OneTenderExecutorAcceptModal
        setResponse={() => changeResponseStatus()}
        response={tenderInfoState.isResponded}
        id={id}
        isOpen={isModalOpen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        price={tenderInfoState.tenderInfo.price}
        closeModal={() => setIsModalOpen(false)}
      ></OneTenderExecutorAcceptModal>
    </div>
  );
};
