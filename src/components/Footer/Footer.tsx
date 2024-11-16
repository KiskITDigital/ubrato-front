import { FC } from "react";
import styles from "./footer.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useIsOrdererState } from "@/store/isOrdererStore";

export const Footer: FC = () => {
  const userInfoStorage = useUserInfoStore();
  const ordererState = useIsOrdererState();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    userInfoStorage.setLoggedIn(false);
    navigate("/");
  };

  return (
    <footer className={`container ${styles.container}`}>
      <div className={styles.footerTop}>
        <div className={styles.imgcontainer}>
          <img src="/minilogo2.png" className={styles.minilogo} alt="minilogo" />
          <img src="/logo.svg" className={styles.logo} alt="logo" />
        </div>
        {!userInfoStorage.isLoggedIn && (
          <div className={styles.loginRegister}>
            <Link to="/login" className={styles.loginLink}>
              <img src="/login.svg" alt="login" />
              <p className={styles.loginText}>Вход</p>
            </Link>
            <Link to="/registration" className={styles.registrationLink}>
              <p className={styles.registrationText}>Регистрация</p>
            </Link>
          </div>
        )}
        {userInfoStorage.isLoggedIn && !location.pathname.includes("profile") && (
          <div className="flex gap-[20px]">
            <Link to="/profile" className={styles.registrationLink}>
              <p className={styles.registrationText}>Личный кабинет</p>
            </Link>
            <button
              className="rounded-[10px] border-[#070c2c]/[.1] border-[1px] py-[9px] px-[14px] text-[var(--color-black-60)]"
              onClick={handleLogOut}
            >
              Выйти
            </button>
          </div>
        )}
      </div>
      <div className={styles.footerUnder}>
        <div className={styles.column}>
          <p className={styles.footercolumn}>Возможности</p>
          <ul>
            {/* {userInfoStorage.user} */}
            {!userInfoStorage.isLoggedIn && (
              <li>
                <Link
                  to="/registration"
                  onClick={() => ordererState.handleState("contractor")}
                  state={{ toReload: null }}
                >
                  <p className={styles.point}>Стать заказчиком</p>
                </Link>
              </li>
            )}
            {(!userInfoStorage.user || !userInfoStorage.user.is_contractor) && (
              <li>
                <Link
                  to={`${userInfoStorage.isLoggedIn ? "/profile/become-contractor" : "register"}`}
                  onClick={() => ordererState.handleState("contractor")}
                  state={{ toReload: null }}
                >
                  <p className={styles.point}>Стать исполнителем</p>
                </Link>
              </li>
            )}
            <li>
              <Link to="/create-tender">
                <p className={styles.point}>Создать тендер</p>
              </Link>
            </li>
            <li>
              <Link to="/alltenders">
                <p className={styles.point}>Найти тендер</p>
              </Link>
            </li>
            <li>
              <Link to="/find-executor">
                <p className={styles.point}>Найти исполнителя</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.footercolumn}>Информация</p>
          <ul>
            <li>
              <Link to="/" state={{ to: "catalog" }}>
                <p className={styles.point}>Каталог</p>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => ordererState.handleState("orderer")}
                state={{ toReload: null }}
              >
                <p className={styles.point}>Заказчикам</p>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => ordererState.handleState("contractor")}
                state={{ toReload: null }}
              >
                <p className={styles.point}>Исполнителям</p>
              </Link>
            </li>
            {/* <li>
              <Link to="/">
                <p className={styles.point}>Отзывы об исполнителях</p>
              </Link>
            </li> */}
            <li>
              <Link to="/" state={{ to: "questions" }}>
                <p className={styles.point}>Частые вопросы</p>
              </Link>
            </li>
            <li>
              <Link to="/knowledge-base">
                <p className={styles.point}>База знаний</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.footercolumn}>Об Ubrato</p>
          <ul>
            <li>
              <Link to="/about">
                <p className={styles.point}>О сервисе</p>
              </Link>
            </li>
            <li>
              <Link to="/contacts" state={{ isHelp: false, previousPage: location.pathname }}>
                <p className={styles.point}>Контакты</p>
              </Link>
            </li>
            <li>
              <Link to="/contacts" state={{ isHelp: true, previousPage: location.pathname }}>
                <p className={styles.point}>Помощь</p>
              </Link>
            </li>
            <li>
              <a
                target="_blank"
                href="https://yandex.ru/maps/213/moscow/stops/station__9858857/?ll=37.627860%2C55.685608&tab=overview&z=15"
              >
                <p className={styles.point}>Карта сайта</p>
              </a>
            </li>
            <li>
              <Link target="_blank" to="/documents">
                <p className={styles.point}>Документы Ubrato</p>
              </Link>
            </li>
            <li>
              <Link to="/requisites">
                <p className={styles.point}>Реквизиты</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.column} ${styles.supportService}`}>
          <p className={styles.footercolumn}>Служба поддержки</p>
          <ul>
            <li>
              <a className={styles.bluetext} href="tel:88007756757">
                8 800-775-67-57
              </a>
              <p className={styles.pointtwo}>Время работы с 9:00 до 18:00 по Московскому времени</p>
            </li>
            <li>
              <a href="mailto:info@ubrato.ru">
                <p className={styles.bluetext}>info@ubrato.ru</p>
              </a>
              <p className={styles.pointtwo}>Вопросы и предложения по работе сервиса</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.line}>
        <Link target="_blank" to="/documents/polzovatelskoe_soglashenie">
          <p className={styles.confidental}>Пользовательское соглашение</p>
        </Link>
        <Link
          target="_blank"
          to="/documents/politika_v_otnoshenii_obrabotki_personalnyh_dannyh_polzovateley_saita"
        >
          <p className={styles.confidental}>Политика в отношении обработки персональных данных</p>
        </Link>
        <Link target="_blank" to="/documents/soglasie_na_obrabotku_personalnyh_dannyh">
          <p className={styles.confidental}>Согласие на обработку персональных данных</p>
        </Link>
      </div>
      <div className="mb-5">
        <p className="text-[10px] text-[rgba(0,0,0,.6)] text-start">
          Использование Оператором сайта{" "}
          <a className="text-accent underline" href="https://www.ubrato.ru">
            https://www.ubrato.ru
          </a>{" "}
          осуществляется на основании лицензионного договора о предоставлении права на использование
          сайта как программы для ЭВМ от 28 августа 2024 г. на условиях простой (неисключительной)
          лицензии.
        </p>
        <p className="text-[10px] text-[rgba(0,0,0,.6)] text-start">
          Использование Оператором товарного знака Ubrato осуществляется на основании лицензионного
          договора о предоставлении права на использование товарного знака от 07 августа 2024 г. на
          условиях простой (неисключительной) лицензии, зарегистрированного в Федеральной службе по
          интеллектуальной собственности 24 сентября 2024 г. за номером РД0479806.
        </p>
      </div>
      <div className={styles.last}>
        <p className={styles.greytext}>
          © 2024 ООО “Интеграция”{" "}
          <Link to="/" className={styles.greytext}>
            (ubrato.ru)
          </Link>
        </p>
      </div>
    </footer>
  );
};
