import { useSurveyStore } from '@/store/surveyStore';
import { CheckboxGroup, Checkbox, Textarea, Modal, ModalContent } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../MainPart.module.css';
import { sendAnswers, updateToken } from '@/api';

export const Page5: FC = () => {
  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState<boolean>(false);

  const handleGoNext = () => {
    const answers: string[] = [
      surveyStore.question1.answer,
      surveyStore.question1.comment,
      surveyStore.question2.rate,
      surveyStore.question2.comment,
      surveyStore.question3.rate,
      surveyStore.question3.comment,
      surveyStore.question4.naviagtion,
      surveyStore.question4.companyInfoChanging,
      surveyStore.question4.contactInfoChanging,
      surveyStore.question4.portfolioCreating,
      surveyStore.question4.comment,
      surveyStore.question5.rate,
      surveyStore.question5.comment,
      JSON.stringify(surveyStore.question6.answers),
      surveyStore.question6.comment,
      surveyStore.question7.rate,
      surveyStore.question7.comment,
      JSON.stringify(surveyStore.question8.answers),
      surveyStore.question8.comment,
      surveyStore.question9.rate,
      surveyStore.question9.comment,
      surveyStore.question10.rate,
      surveyStore.question10.comment,
      surveyStore.question11.response,
      surveyStore.question11.priceNDS,
      surveyStore.question11.chat,
      surveyStore.question11.winnerInfo,
      surveyStore.question11.readyConfirm,
      surveyStore.question11.comment,
      JSON.stringify(surveyStore.question12.answers),
      surveyStore.question12.comment,
      JSON.stringify(surveyStore.question13.answers),
      surveyStore.question13.comment,
      JSON.stringify(surveyStore.question14.answers),
      surveyStore.question15,
    ];
    // console.log(answers);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        (async () => {
          const res = await updateToken(sendAnswers, answers);
          if (res === 200) {
            setCompleted(true);
          }
        })();
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const modalStyle = {
    wrapper:
      'z-[7] fixed top-[calc(50vh-154px)] left-[calc(50vw-314px)] w-[618px] h-[308px] bg-white p-5 shadow-md rounded-[20px]',
    backdrop: 'z-[6] backdrop-blur fixed top-0 left-0 w-full h-full',
    closeButton:
      'absolute right-0 w-[34px] h-[34px] bg-[rgba(0,0,0,.04)] rounded-[10px] flex items-center justify-center',
  };

  useEffect(() => {
    if (!surveyStore.isPage4Completed) {
      if (!surveyStore.isPage3Completed) {
        if (!surveyStore.isPage2Completed) {
          if (!surveyStore.isPage1Completed) {
            navigate('/survey/1');
          } else {
            navigate('/survey/2');
          }
        } else {
          navigate('/survey/3');
        }
      } else {
        navigate('/survey/4');
      }
    }
  }, [
    navigate,
    surveyStore.isPage1Completed,
    surveyStore.isPage2Completed,
    surveyStore.isPage3Completed,
    surveyStore.isPage4Completed,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="text-[20px] font-medium w-full">
        <h1 className="font-bold text-[40px] text-center">
          Тест-драйв <span className="text-accent">Ubrato</span> Анкета
        </h1>

        <div className="flex bg-[#F5FAFE] w-full justify-center max-w-screen py-10 mb-[20px]">
          <div className="max-w-[1130px] w-full px-[40px] xl:px-0 flex flex-col gap-[20px]">
            <p className="font-bold">
              Агрегатор клининговых услуг Ubrato предлагает участникам сервиса, зарегистрированным в
              качестве{' '}
              <Link to="/knowledge-base" className="text-accent hover:underline">
                Исполнителей
              </Link>
              , принять участие в тест-драйве сайта.
            </p>
            <div className="flex flex-col">
              <p className="font-bold">Пожалуйста, ответьте на вопросы анкеты.</p>
              <p>* Звездочкой отмечены обязательные для ответов</p>
            </div>
          </div>
        </div>

        <div className="flex bg-[#F5FAFE] w-full justify-center max-w-screen py-10">
          <div className="max-w-[1130px] w-full px-[40px] xl:px-0 flex flex-col">
            <p className="font-bold">Ubrato и ваш бизнес</p>
          </div>
        </div>

        <ol className={styles.questionsContainer}>
          <li className={`${styles.questionItem} ${styles.text}`}>
            <p className={styles.bold}>
              Какие услуги платформы Ubrato были бы интересны и востребованы для вашего бизнеса?
            </p>
            <CheckboxGroup
              value={surveyStore.question12.answers}
              onChange={(e) => {
                if (e instanceof Array) {
                  surveyStore.setQuestion12answers(e);
                }
              }}
              className={styles.checkGroup}
            >
              <div className={styles.checkContainer}>
                <p className="text-[18px]">Поиск заказа</p>
                <Checkbox value="Поиск заказа" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">Согласование объема и стоимости услуг</p>
                <Checkbox value="Согласование объема и стоимости услуг" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>Проверка контрагента</p>
                <Checkbox value="Проверка контрагента" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p>Возможность загружать примеры работ (кейсы)</p>
                <Checkbox value="Возможность загружать примеры работ" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">Наличие отзывов</p>
                <Checkbox value="Наличие отзывов" classNames={checkStyle} />
              </div>
            </CheckboxGroup>
            <div className={`${styles.yourVariant} ${styles.comment}`}>
              <p className="text-[18px]">Ваш комментарий</p>
              <input
                type="text"
                value={surveyStore.question12.comment}
                onChange={(e) => {
                  surveyStore.setQuestion12comment(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </li>
          <li className={`${styles.questionItem} ${styles.text}`}>
            <p className={styles.bold}>
              Какие услуги платформы Ubrato были бы интересны и востребованы для вашего бизнеса?
            </p>
            <CheckboxGroup
              value={surveyStore.question13.answers}
              onChange={(e) => {
                if (e instanceof Array) {
                  surveyStore.setQuestion13answers(e);
                }
              }}
              className={styles.checkGroup}
            >
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Режим одного окна (договор, акт сдачи-приемки работ, арбитраж, привлечение
                  эксперта на любом из этапов взаимодействия сторон, в т.ч. с выездом на объект)
                </p>
                <Checkbox value="Режим одного окна" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Гарантия получения оплаты по процедуре “Безопасная сделка”
                </p>
                <Checkbox
                  value="Гарантия получения оплаты по процедуре “Безопасная сделка”"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">Заключение договора через площадку</p>
                <Checkbox value="Заключение договора через площадку" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">Подписание акта выполненных работ через площадку</p>
                <Checkbox
                  value="Подписание акта выполненных работ через площадку"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">Разрешение споров с помощью процедуры арбитража</p>
                <Checkbox
                  value="Разрешение споров с помощью процедуры арбитража"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Аренда/продажа уборочной техники, расходных материалов и экипировки
                </p>
                <Checkbox
                  value="Аренда/продажа уборочной техники, расходных материалов и экипировки"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">Аутсорсинг персонала</p>
                <Checkbox value="Аутсорсинг персонала" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Финансовые услуги (страхование, помощь в получении кредита, банковской гарантии)
                </p>
                <Checkbox
                  value="Финансовые услуги (страхование, помощь в получении кредита, банковской гарантии)"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Продвижение компании на сайте (баннерная реклама, выделенная карточка профиля,
                  приоритетное размещение в выдаче каталога и др.)
                </p>
                <Checkbox value="Продвижение компании на сайте" classNames={checkStyle} />
              </div>
            </CheckboxGroup>
            <div className={`${styles.yourVariant} ${styles.comment}`}>
              <p className="text-[18px]">
                Что еще можно добавить на сайт Ubrato? (Ваш комментарий)
              </p>
              <input
                type="text"
                value={surveyStore.question13.comment}
                onChange={(e) => {
                  surveyStore.setQuestion13comment(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </li>
          <li className={`${styles.questionItem} ${styles.text}`}>
            <p className={styles.bold}>
              Если площадка Ubrato станет платной, то какие услуги вы готовы оплачивать?
            </p>
            <CheckboxGroup
              value={surveyStore.question14.answers}
              onChange={(e) => {
                if (e instanceof Array) {
                  surveyStore.setQuestion14answers(e);
                }
              }}
              className={styles.checkGroup}
            >
              <div className={styles.checkContainer}>
                <p className="text-[18px]">Участие в тендерах (абонентская плата)</p>
                <Checkbox value="Участие в тендерах (абонентская плата)" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Доступ к базе текущих тендеров (единовременная плата за пакет услуг)
                </p>
                <Checkbox value="Доступ к базе текущих тендеров" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Доступ к базе текущих тендеров и продвижение компании (единовременная плата за
                  пакет услуг)
                </p>
                <Checkbox
                  value="Доступ к базе текущих тендеров и продвижение компании"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">Комиссия за победу в тендере</p>
                <Checkbox value="Комиссия за победу в тендере" classNames={checkStyle} />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Раскрытие контактных данных вашей организации в каталоге Исполнителей (абонентская
                  плата)
                </p>
                <Checkbox
                  value="Раскрытие контактных данных вашей организации в каталоге Исполнителей"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Размещение и оформление профиля, продвижение компании (единовременная плата за
                  пакет услуг)
                </p>
                <Checkbox
                  value="Размещение и оформление профиля, продвижение компании"
                  classNames={checkStyle}
                />
              </div>
              <div className={styles.checkContainer}>
                <p className="text-[18px]">
                  Смс-уведомления о публикации новых тендеров в вашем сегменте (абонентская плата)
                </p>
                <Checkbox
                  value="Смс-уведомления о публикации новых тендеров в вашем сегменте"
                  classNames={checkStyle}
                />
              </div>
            </CheckboxGroup>
          </li>
          <li>
            <div className={`${styles.yourVariant} ${styles.comment}`}>
              <p className={`${styles.text} text-[18px]`}>
                Что еще вы хотели бы улучшить или добавить на сайте Ubrato?
              </p>
              <Textarea
                value={surveyStore.question15}
                onChange={(e) => {
                  surveyStore.setQuestion15(e.target.value);
                }}
                variant="faded"
                disableAutosize
                disableAnimation
                className={styles.textarea + ' border-4 rounded-3xl '}
              />
            </div>
          </li>
        </ol>
        <div className={styles.btnsContainer}>
          <Link className={`${styles.survey__button} ${styles.backBtn}`} to="/survey/4">
            Назад
          </Link>
          <button className={`${styles.survey__button} ${styles.nextBtn2}`} onClick={handleGoNext}>
            Завершить!
          </button>
        </div>
      </div>
      <Modal
        onOpenChange={() => {
          navigate('/profile');
        }}
        isOpen={completed}
        classNames={modalStyle}
      >
        <ModalContent>
          <div className="flex flex-col gap-9">
            <p className="font-bold text-[26px]">Анкета отправлена</p>
            <p className="font-semibold text-[20px]">
              Благодарим за участие в тест-драйве площадки Ubrato!
            </p>
            <p className="text-[16px] font-semibold py-3 px-[14px] bg-[rgba(0,0,0,.03)] rounded-[14px]">
              Вам доступно{' '}
              <span className="underline text-accent">Исследование рынка клининга</span>
            </p>
            <Link
              className="self-center text-lg font-bold w-[200px] h-[48px] flex items-center justify-center bg-accent text-white rounded-[17px]"
              target="_blank"
              download
              to="/documents/test-drive-report.pdf"
            >
              Скачать
            </Link>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
