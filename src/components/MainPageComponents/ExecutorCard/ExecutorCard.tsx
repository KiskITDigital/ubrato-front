import { executorList } from '@/types/app';
import { Dispatch, FC } from 'react';

export const ExecutorCard: FC<{
  executor: executorList;
  favoriteExecutorsHandler: (executor: executorList) => void;
  setExecutorIdToOfferTender: Dispatch<React.SetStateAction<string | null>>;
  setExecutorNameToOfferTender: Dispatch<React.SetStateAction<string | null>>;
}> = ({ executor }) => {
  return (
    <div className="w-[560px] h-[420px] shadow-md rounded-[35px] p-[30px]">
      <div className="flex gap-8">
        <img
          className="w-[86px] h-[86px] shadow-md rounded-full object-cover"
          src={executor.img}
          alt="avatar"
        />
        <div>
          <p className="font-bold text-[20px]">{executor.name}</p>
        </div>
      </div>
    </div>
  );
};
