/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useUserInfoStore } from '@/store/userInfoStore';

export const SurveyMainPart: FC = () => {
  const userInfoStore = useUserInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfoStore.user.is_contractor) {
      navigate('/');
    }
  }, [userInfoStore.user.is_contractor]);

  return (
    <>
      {userInfoStore.user.is_contractor && !userInfoStore.passedSurvey && <Outlet />}
      {userInfoStore.user.is_contractor && userInfoStore.passedSurvey && (
        <div className="flex flex-col gap-9 w-[1130px] mx-auto items-center pt-[100px]">
          <p className="font-bold text-[26px]">Анкета отправлена</p>
          <p className="font-semibold text-[20px]">
            Благодарим за участие в тест-драйве площадки Ubrato!
          </p>
          <p className="text-[16px] font-semibold py-3 px-[14px] bg-[rgba(0,0,0,.03)] rounded-[14px]">
            Вам доступно <span>Исследование рынка клининга</span>
          </p>
          <div className="flex gap-2">
            <Link
              className="self-center text-lg font-bold w-[200px] h-[48px] flex items-center justify-center bg-accent text-white rounded-[17px]"
              target="_blank"
              download
              to="/documents/test-drive-report.pdf"
            >
              Скачать
            </Link>
            <Link
              className="self-center text-lg font-bold w-[200px] h-[48px] flex items-center justify-center bg-light-gray rounded-[17px]"
              to="/profile"
            >
              Назад
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
