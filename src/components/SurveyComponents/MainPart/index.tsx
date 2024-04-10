import { Outlet } from 'react-router-dom';
import { FC } from 'react';

export const SurveyMainPart: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
