import { useSurveyStore } from '@/store/surveyStore';
import { CheckboxGroup, Checkbox } from '@nextui-org/react';
import { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../MainPart.module.css';

export const Page5: FC = () => {
  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const handleGoNext = () => {
    navigate('/profile');
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
    <div style={{ marginBottom: '120px' }}>
      <h1 className={styles.title}>
        Оцените некоторые элементы и сервисы сайта <span className={styles.blueText}>Ubrato</span>
      </h1>
      <div className={styles.blueBackground}>
        <p className={styles.text}>
          Агрегатор клининговых услуг Ubrato предлагает участникам сервиса, зарегистрированным в
          качестве <span className={styles.blueText}>Исполнителей</span>, принять участие в
          тест-драйве площадки. Условия участия по{' '}
          <Link className={styles.blueText} to="/">
            ссылке
          </Link>
          .
        </p>
        <p className={styles.text}>
          Пожалуйста, ответьте на вопросы анкеты. * Звездочкой отмечены обязательные для ответов{' '}
        </p>
      </div>
      <div className={`${styles.blueBackground} ${styles.questionsHeader}`}>
        <p className={styles.text}>Ubrato и ваш бизнес</p>
      </div>
      <ol className={styles.questionsContainer}>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p>Какие услуги платформы Ubrato были бы интересны и востребованы для вашего бизнеса?</p>
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
              <p>Поиск заказа</p>
              <Checkbox value="Поиск заказа" classNames={checkStyle}></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Согласование объема и стоимости услуг</p>
              <Checkbox
                value="Согласование объема и стоимости услуг"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Проверка контрагента</p>
              <Checkbox value="Проверка контрагента" classNames={checkStyle}></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Возможность загружать примеры работ (кейсы)</p>
              <Checkbox
                value="Возможность загружать примеры работ"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Наличие отзывов</p>
              <Checkbox value="Наличие отзывов" classNames={checkStyle}></Checkbox>
            </div>
          </CheckboxGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Ваш комментарий</p>
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
          <p>Какие услуги платформы Ubrato были бы интересны и востребованы для вашего бизнеса?</p>
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
              <p>
                Режим одного окна (договор, акт сдачи-приемки работ, арбитраж, привлечение эксперта
                на любом из этапов взаимодействия сторон, в т.ч. с выездом на объект)
              </p>
              <Checkbox value="Режим одного окна" classNames={checkStyle}></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Гарантия получения оплаты по процедуре “Безопасная сделка”</p>
              <Checkbox
                value="Гарантия получения оплаты по процедуре “Безопасная сделка”"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Заключение договора через площадку</p>
              <Checkbox
                value="Заключение договора через площадку"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Подписание акта выполненных работ через площадку</p>
              <Checkbox
                value="Подписание акта выполненных работ через площадку"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Разрешение споров с помощью процедуры арбитража</p>
              <Checkbox
                value="Разрешение споров с помощью процедуры арбитража"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Аренда/продажа уборочной техники, расходных материалов и экипировки</p>
              <Checkbox
                value="Аренда/продажа уборочной техники, расходных материалов и экипировки"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Аутсорсинг персонала</p>
              <Checkbox value="Аутсорсинг персонала" classNames={checkStyle}></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>
                Финансовые услуги (страхование, помощь в получении кредита, банковской гарантии)
              </p>
              <Checkbox
                value="Финансовые услуги (страхование, помощь в получении кредита, банковской гарантии)"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>
                Продвижение компании на сайте (баннерная реклама, выделенная карточка профиля,
                приоритетное размещение в выдаче каталога и др.)
              </p>
              <Checkbox value="Продвижение компании на сайте" classNames={checkStyle}></Checkbox>
            </div>
          </CheckboxGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Что еще можно добавить на сайт Ubrato? (Ваш комментарий)</p>
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
          <p>Если площадка Ubrato станет платной, то какие услуги вы готовы оплачивать?</p>
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
              <p>Участие в тендерах (абонентская плата)</p>
              <Checkbox
                value="Участие в тендерах (абонентская плата)"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Доступ к базе текущих тендеров (единовременная плата за пакет услуг)</p>
              <Checkbox value="Доступ к базе текущих тендеров" classNames={checkStyle}></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>
                Доступ к базе текущих тендеров и продвижение компании (единовременная плата за пакет
                услуг)
              </p>
              <Checkbox
                value="Доступ к базе текущих тендеров и продвижение компании"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>Комиссия за победу в тендере</p>
              <Checkbox value="Комиссия за победу в тендере" classNames={checkStyle}></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>
                Раскрытие контактных данных вашей организации в каталоге Исполнителей (абонентская
                плата)
              </p>
              <Checkbox
                value="Раскрытие контактных данных вашей организации в каталоге Исполнителей"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>
                Размещение и оформление профиля, продвижение компании (единовременная плата за пакет
                услуг)
              </p>
              <Checkbox
                value="Размещение и оформление профиля, продвижение компании"
                classNames={checkStyle}
              ></Checkbox>
            </div>
            <div className={styles.checkContainer}>
              <p>
                Смс-уведомления о публикации новых тендеров в вашем сегменте (абонентская плата)
              </p>
              <Checkbox
                value="Смс-уведомления о публикации новых тендеров в вашем сегменте"
                classNames={checkStyle}
              ></Checkbox>
            </div>
          </CheckboxGroup>
        </li>
        <li>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Что еще вы хотели бы улучшить или добавить на сайте Ubrato?</p>
            <input
              type="text"
              value={surveyStore.question15}
              onChange={(e) => {
                surveyStore.setQuestion15(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
      </ol>
      <div className={styles.btnsContainer}>
        <Link className={`${styles.survey__button} ${styles.backBtn}`} to="/survey/2">
          Назад
        </Link>
        <button className={`${styles.survey__button} ${styles.nextBtn2}`} onClick={handleGoNext}>
          Завершить!
        </button>
      </div>
    </div>
  );
};
