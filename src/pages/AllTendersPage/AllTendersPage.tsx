import { FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.css";
import FastFilterBlock from "@/components/FindExecutorComponents/FastFilter/FastFilter";
import { useTenderListState } from "@/store/tendersListStore";
import MainFilterTender from "@/components/TenderListComponents/TenderListCustomFilter";
import { TenderListComp } from "@/components/TenderListComponents/TenderListComponents";

export const AllTendersPage: FC = () => {
  const tenderListState = useTenderListState();
  const startRef = useRef<HTMLHeadingElement>(null);

  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    startRef.current!.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const elementTop = startRef.current!.getBoundingClientRect().top;
      window.scrollBy({ top: elementTop - 200, behavior: "smooth" });
    }, 0);
  }, []);

  return (
    <div ref={startRef} className={s.main_blokkk}>
      <FastFilterBlock
        title="тендера"
        values={tenderListState.fastFilterTexts}
        setValues={tenderListState.handleFastFilterTexts}
      />
      <div className={s.block_container}>
        <MainFilterTender></MainFilterTender>
        <TenderListComp />
      </div>
      <div className="w-[1130px] mx-auto text-[20px]">
        <h2 className="text-[46px] font-black text-center mb-5">
          Сэкономьте время на поиск заказов по уборке на сервисе{" "}
          <span className="text-accent">Ubrato</span>
        </h2>
        <div className={`${s.content} ${isCollapsed ? "h-[150px]" : "h-fit"}`}>
          <p className="text-[#666] mb-5">
            Комфортный поиск выгодных тендеров на оказание клининговых и сопутствующих услуг в
            городе Москва на одной онлайн-площадке — это реальность. Сервис Ubrato предоставляет
            доступ к объявлениям без посредников.
          </p>
          <p className="text-[#666] mb-5">
            Здесь вы найдете актуальную информацию о подрядах и требующихся услугах клининга для
            жилых и нежилых объектов недвижимости в городе Москва, в том числе для промышленных,
            транспортных площадок, парковых, заповедных зон, торговых центров, домов и квартир.
            Ubrato предлагает принципиально новый комфортный формат поиска тендеров и получения
            заказов.
          </p>
          <p className="text-[#666] mb-5">
            На сайте размещают заявки верифицированные компании-заказчики. Ubrato проверяет сведения
            обо всех участниках тендеров. Каждое объявление на сайте-агрегаторе проходит модерацию
            администрацией сервиса. Заказчикам требуются профессиональные клининговые и смежные
            услуги. Благодаря агрегатору вы можете быстро находить новых клиентов и формировать,
            расширять свои клиентские базы.
          </p>
          <p className="text-[#666]">
            Онлайн-площадка предоставляет достоверные данные о заказах на клининговые услуги. С
            сервисом Ubrato комфортно работать, потому что для его пользователей предусмотрено все:
            от интуитивного интерфейса, удобной навигации по сайту до системы точных, понятных
            фильтров и сортировки опций клининга. На карточках тендеров выводится
            систематизированная информация, потому сориентироваться в заявках заказчиков вам не
            составит труда.
          </p>
          <button className={`${s.button}`} onClick={() => setIsCollapsed(!isCollapsed)}>
            <div className={`${s.gradient} ${!isCollapsed ? s.active : ""}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
};
