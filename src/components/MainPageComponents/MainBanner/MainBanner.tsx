import { FC, useEffect, useState } from "react";
import styles from "./mainbanner.module.css";
import styles2 from "./mainbanner2.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useCreateTenderState } from "@/store/createTenderStore";

export const MainBanner: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ playOnInit: false, delay: 3000 }),
  ]);

  const userStore = useUserInfoStore();

  const [isPlaying, setIsPlaying] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [mobile, setMobile] = useState(false);

  const navigate = useNavigate();
  const [bannerId, setBannerId] = useState<number>(
    Math.floor(Math.random() * 3)
  );
  const location = useLocation();

  useEffect(() => {
    if (!location.search || location.search.includes("bannerId")) {
      navigate(`/?bannerId=${bannerId}`);
      if (window.outerWidth <= 450) {
        setMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (isPlaying) {
      if (typeof autoplay.play === "function") {
        autoplay.play();
      }
    } else {
      if (typeof autoplay.stop === "function") {
        autoplay.stop();
      }
    }
  }, [emblaApi, isPlaying]);

  const [newTenderName, setNewTenderName] = useState("");
  const createTenderState = useCreateTenderState();

  function getBanner(id: number) {
    switch (id) {
      case 0:
        return (
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-black">
              Агрегатор тендеров{" "}
              <span className="text-accent">клининговых</span> и смежных услуг *
            </h1>
            <p className="text-sm">
              * Слово «тендер» не подразумевает под собой проведение торгов в
              соответствии с ФЗ-44 и ФЗ-223
            </p>
          </div>
        );
      case 1:
        return (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-5xl font-black">
                Выбор <span className="text-accent">клининга</span> на одной
                площадке *
              </h1>
              <p className="text-sm">
                * Под словом «одной» подразумевается площадка Ubrato
              </p>
            </div>
            <p className="font-semibold text-2xl">Агрегатор клининга</p>
          </>
        );
      case 2:
        return (
          <div className="flex flex-col gap-1">
            <h1 className="text-5xl font-black">
              Здесь решаются задачи{" "}
              <span className="text-accent">клининга</span> *
            </h1>
            <p className="text-sm">
              * Под словом «здесь» подразумевается площадка Ubrato
            </p>
          </div>
        );
    }
  }

  return (
    <div className={`container ${styles.mobileContainer}`}>
      {(!(userStore.isLoggedIn && userStore.user.is_contractor) ||
        userStore.passedSurvey) && (
        <div className={` ${styles.container}`}>
          <div>
            <div className="flex flex-col gap-3 max-w-[520px] mt-10">
              {getBanner(bannerId)}
            </div>
            <div className={styles.createTender}>
              <input
                onFocus={() => {
                  setIsPlaying(false);
                  if (!userStore.isLoggedIn) {
                    setShowNotification(true);
                  }
                }}
                onBlur={() => {
                  setIsPlaying(true);
                }}
                value={newTenderName}
                onChange={(e) => setNewTenderName(e.currentTarget.value)}
                className={styles.createTenderInput}
                id="tender_text"
                type="text"
                name="tender_text"
                placeholder={
                  mobile ? "Создать тендер" : "Опишите задачу или объект"
                }
              />
              {userStore.isLoggedIn ? (
                <Link
                  onClick={() => {
                    createTenderState.handleSimpleInput("name", newTenderName);
                    setNewTenderName("");
                  }}
                  to="/create-tender"
                >
                  <button className={styles.createTenderBtn}>
                    {mobile ? (
                      <img src="/arrow-with-line-right-white.svg" />
                    ) : (
                      "Создать тендер"
                    )}
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (!userStore.isLoggedIn) {
                      setShowNotification(true);
                    }
                  }}
                  className={styles.createTenderBtn}
                >
                  {mobile ? (
                    <img src="./arrow-with-line-right-white.svg" />
                  ) : (
                    "Создать тендер"
                  )}
                </button>
              )}
              {showNotification && (
                <div className={styles.notification}>
                  <p>
                    Чтобы создать тендер,{" "}
                    <Link to={"/login"}>
                      <span
                        className={`${styles.blueText} ${styles.text_underline} `}
                      >
                        войдите на сайт.
                      </span>
                    </Link>
                  </p>
                  <Link to={"/faq?page=3&number=4#q3_4"}>
                    <p
                      className={`${styles.blueText} ${styles.text_underline} `}
                    >
                      Узнать, как создать тендер
                    </p>
                  </Link>
                  <button
                    className={styles.closeButton}
                    onClick={() => setShowNotification(false)}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            <div className={styles.exampleSearchContainer}>
              <p className={styles.exampleSearch}>Например, </p>
              <p className={`${styles.exampleSearch}`}>генеральная уборка</p>
            </div>
          </div>
          <img
            className={styles.image}
            src="./banner-image.png"
            alt="big-man"
          />
        </div>
      )}
      {userStore.isLoggedIn &&
        userStore.user.is_contractor &&
        !userStore.passedSurvey && (
          <div className={`${styles.embla}`}>
            <div className={`${styles.embla__viewport}`} ref={emblaRef}>
              <div className={styles.embla__container}>
                <div className={`${styles.embla__slide} ${styles.container}`}>
                  <div>
                    <h1 className={styles.header}>
                      <span className={styles.blueText}>Весь рынок</span>{" "}
                      клининга на одной площадке
                    </h1>
                    <p className={styles.agregator}>Агрегатор клининга</p>
                    <div className={styles.createTender}>
                      <input
                        onFocus={() => {
                          setIsPlaying(false);
                          if (!userStore.isLoggedIn) {
                            setShowNotification(true);
                          }
                        }}
                        onBlur={() => {
                          setIsPlaying(true);
                        }}
                        value={newTenderName}
                        onChange={(e) =>
                          setNewTenderName(e.currentTarget.value)
                        }
                        className={styles.createTenderInput}
                        type="text"
                        id="tender_text"
                        name="tender_text"
                        placeholder={
                          mobile
                            ? "Создать тендер"
                            : "Опишите задачу или объект"
                        }
                      />

                      {userStore.isLoggedIn ? (
                        <Link
                          onClick={() => {
                            createTenderState.handleSimpleInput(
                              "name",
                              newTenderName
                            );
                            setNewTenderName("");
                          }}
                          to="/create-tender"
                        >
                          <button className={styles.createTenderBtn}>
                            {mobile ? (
                              <img src="/arrow-with-line-right-white.svg" />
                            ) : (
                              "Создать тендер"
                            )}
                          </button>
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            if (!userStore.isLoggedIn) {
                              setShowNotification(true);
                            }
                          }}
                          className={styles.createTenderBtn}
                        >
                          {mobile ? (
                            <img src="./arrow-with-line-right-white.svg" />
                          ) : (
                            "Создать тендер"
                          )}
                        </button>
                      )}
                      {showNotification && (
                        <div className={styles.notification}>
                          <Link to={"/login"}>
                            {" "}
                            <p>
                              Чтобы создать тендер,{" "}
                              <span
                                className={`${styles.blueText} ${styles.text_underline} `}
                              >
                                войдите на сайт.
                              </span>
                            </p>
                          </Link>
                          <Link to={"/"}>
                            <p
                              className={`${styles.blueText} ${styles.text_underline} `}
                            >
                              Узнать, как создать тендер
                            </p>
                          </Link>
                          <button
                            className={styles.closeButton}
                            onClick={() => setShowNotification(false)}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                    <div className={styles.exampleSearchContainer}>
                      <p className={styles.exampleSearch}>Например, </p>
                      <p className={`${styles.exampleSearch}`}>
                        генеральная уборка
                      </p>
                    </div>
                  </div>
                  <img
                    className={styles.image}
                    src="./banner-image.png"
                    alt="big-man"
                  />
                </div>
                <div className={`${styles.embla__slide} ${styles2.slide2}`}>
                  <div className={styles2.textBlock}>
                    <h2
                      className={`${styles2.surveyTitle} ${styles2.blueText}`}
                    >
                      Онлайн опрос
                    </h2>
                    <div className={styles2.survey__pair}>
                      <img
                        className={styles2.survey__pair__image}
                        src="./survey/check-mark.svg"
                        alt=""
                      />
                      <p className={styles2.survey__pair__text}>
                        Примите участие в опросе
                      </p>
                    </div>
                    <div className={styles2.survey__pair}>
                      <img
                        className={styles2.survey__pair__image}
                        src="./survey/arrow-down.svg"
                        alt=""
                      />
                      <p className={styles2.survey__pair__text}>
                        Получите исследование в подарок
                      </p>
                    </div>
                    <div className={styles2.survey__pair}>
                      <img
                        className={styles2.survey__pair__image}
                        src="./survey/heart.svg"
                        alt=""
                      />
                      <p className={styles2.survey__pair__text}>
                        Давайте улучшим{" "}
                        <span className={styles2.blueText}>Ubrato</span> вместе!
                      </p>
                    </div>
                    <Link to="survey">
                      <button className={styles2.survey__button}>
                        Участвовать!{" "}
                        <img
                          className={styles2.survey__button__image}
                          src="./survey/arrow-right.svg"
                          alt=""
                        />
                      </button>
                    </Link>
                  </div>
                  <img
                    className={styles2.image}
                    src="./survey/laptop.png"
                    alt="laptop"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
