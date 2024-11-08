import { executorList } from "@/types/app";
import { countTransformWork } from "@/utils";
import { Dispatch, FC } from "react";
import { useNavigate } from "react-router-dom";

interface ExecutorCardProps {
  executor: executorList;
  favoriteExecutorsHandler: (executor: executorList) => void;
  setExecutorIdToOfferTender: Dispatch<React.SetStateAction<string | null>>;
  setExecutorNameToOfferTender: Dispatch<React.SetStateAction<string | null>>;
}

export const ExecutorCard: FC<ExecutorCardProps> = ({
  executor,
  favoriteExecutorsHandler,
  setExecutorIdToOfferTender,
  setExecutorNameToOfferTender,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-[560px] min-h-[420px] shadow-md rounded-[35px] p-[30px] flex flex-col justify-between">
      <div className="flex gap-8">
        <img
          className="w-[86px] h-[86px] shadow-md rounded-full object-cover"
          src={executor.img}
          alt="avatar"
        />
        <div>
          <p className="font-bold text-[20px] line-clamp-2">{executor.name}</p>
          <div className="mt-[10px]">
            <p className="text-[16px]">
              ИНН{" "}
              <span className="text-[14px] py-1 px-2 border border-light-gray rounded-lg">
                {executor.inn}
              </span>
            </p>
          </div>
          <p className="mt-[10px] text-[#666] line-clamp-3 text-[14px] w-[370px] leading-[18px]">
            {executor.text}
          </p>
          {executor.regions.length > 0 && (
            <div className="flex items-center h-[24px] mt-[10px] gap-[10px]">
              <p className="text-[16px] py-[2px] px-2 bg-[#ADB5BD] rounded-lg text-white leading-5">
                {executor.regions[0].name}
              </p>
              {executor.regions.length > 1 && (
                <div className="flex items-center gap-[10px]">
                  <img src="/map-point-ic.svg" alt="location" />
                  <p className="text-[16px] text-[#666]">и ещё в {executor.regions.length - 1}</p>
                </div>
              )}
            </div>
          )}
          <div className="mt-[15px] flex flex-col gap-[15px]">
            {executor.services.length > 0 &&
              executor.services.map(
                (service, ix) =>
                  ix < 2 && (
                    <div className="flex justify-between pt-[10px] border-t border-dashed border-[rgba(0,0,0,.14)]">
                      <p className="text-[16px] max-w-[274px]">{service.name}</p>
                      <div>
                        <p className="text-[16px]">
                          от <span className="text-accent">{service.price}</span>
                        </p>
                        <p>₽ за ед.</p>
                      </div>
                    </div>
                  )
              )}
            {executor.services.length > 2 && (
              <p className="pt-[10px] border-t border-dashed border-[rgba(0,0,0,.14)] text-[14px] text-[#666]">
                Ещё {executor.services.length - 2}{" "}
                {countTransformWork(executor.services.length - 2)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-[10px]">
        <button
          className="w-12 h-12 flex items-center justify-center border-light-gray border rounded-[13px]"
          onClick={() => favoriteExecutorsHandler(executor)}
        >
          <img
            src={`/find-executor/heart-${executor.isFavorite ? "active" : "inactive"}.svg`}
            alt="heart"
          />
        </button>
        <button
          className="w-[400px] flex justify-between items-center px-[18px] py-3 bg-[#F4F7F9] rounded-[14px]"
          onClick={() => {
            const token = localStorage.getItem("token");
            if (!token) {
              navigate("/login");
            } else {
              document.body.style.overflow = "hidden";
              setExecutorIdToOfferTender(executor.id);
              setExecutorNameToOfferTender(executor.name);
            }
          }}
        >
          <p>Предложить тендер</p>
          <img src="/find-executor/arrow-right-black.svg" alt="" />
        </button>
      </div>
    </div>
  );
};
