import FastFilter from "@/components/FindExecutorComponents/FastFilter/FastFilter";
import styles from "./FindExecutor.module.css";
import { FC } from "react";
import MainFilter from "@/components/FindExecutorComponents/MainFilter/MainFilter";
import Executors from "@/components/FindExecutorComponents/Executors/Executors";
import { useFindExecutorState } from "@/store/findExecutorStore";

// import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@/store/userInfoStore";

const FindExecutor: FC = () => {
  const findExecutorState = useFindExecutorState();
  // const userInfoStore = useUserInfoStore();
  useUserInfoStore;
  // const navigate = useNavigate()

  // useEffect(() => {
  //     if (!userInfoStore.isLoggedIn) {
  //         navigate('/register');
  //       }
  // }, [navigate]);
  return (
    <section>
      <FastFilter
        title="исполнителя"
        values={findExecutorState.fastFilterTexts}
        setValues={findExecutorState.handleFastFilterTexts}
      />
      <div className={`container ${styles.mainBlock}`}>
        <MainFilter />
        <Executors />
      </div>
      <div className="w-[1130px] mx-auto text-[20px]">
        <h2 className="text-[46px] font-black text-center mb-5">Поручите клининг Ваших объектов профессионалам</h2>
        <p className="text-[#666] mb-5">
          На сервисе Ubrato действует простая и понятная система поиска исполнителей, благодаря
          которой вы быстро найдете надежных подрядчиков для любых клининговых работ в городе
          Москва.
        </p>
        <p className="text-[#666] mb-5">
          Поиск квалифицированных специалистов в городе Москва для выполнения клининговых работ —
          проблема для владельцев, арендаторов объектов жилой и нежилой недвижимости, рекреационных,
          промышленных, транспортных площадок, руководителей предприятий всех форм собственности,
          организаторов массовых мероприятий и торжеств. Ubrato предлагает ее реальное решение.
        </p>
        <p className="text-[#666] mb-5">
          Здесь собраны сведения о надежных, проверенных подрядчиках. Все юридические лица —
          участники тендеров — проходят многоступенчатую верификацию. На сервисе для
          компаний-подрядчиков действует специально разработанная схема проверки достоверности
          предоставляемой ими информации.
        </p>
        <p className="text-[#666]">
          На Ubrato заказчики получают достоверные сведения об исполнителях, сравнивают цены на
          клининг и выбирают подходящие для определенных объектов пакеты клининговых и сопутствующих
          услуг. Интуитивно понятный интерфейс, удобная навигация сайта делают процесс выбора
          подрядчиков простым, комфортным, результативным.
        </p>
      </div>
    </section>
  );
};

export default FindExecutor;
