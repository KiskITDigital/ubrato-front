import { Radio, RadioGroup } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../MainPart.module.css';
import { useSurveyStore } from '@/store/surveyStore';

export const Page2: FC = () => {
  const radioStyle = {
    base: styles.radioNumberBase,
    wrapper: styles.radioWrapper,
    control: styles.radioControl,
  };

  const radioGroupStyle = {
    wrapper: styles.radioGroupNumbersWrapper,
  };

  const tableRadioGroupStyle = {
    wrapper: styles.tableRadioGroupWrapper,
  };

  const rateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
  const [error4, setError4] = useState('');

  const handleGoNext = () => {
    let error = true;
    if (!surveyStore.question2.rate) {
      setError1('Это обязательный вопрос');
      error = true;
    } else {
      error = false;
    }
    if (!surveyStore.question3.rate) {
      setError2('Это обязательный вопрос');
      error = true;
    } else {
      error = false;
    }
    if (
      !surveyStore.question4.naviagtion ||
      !surveyStore.question4.companyInfoChanging ||
      !surveyStore.question4.contactInfoChanging ||
      !surveyStore.question4.portfolioCreating
    ) {
      error = true;
      setError3('Ответьте на все вопросы');
    } else {
      error = false;
    }
    if (!surveyStore.question5.rate) {
      error = true;
      setError4('Это обязательный вопрос');
    } else {
      error = false;
    }
    if (!error) {
      surveyStore.setIsPage2Completed(true);
      navigate('/survey/3');
    }
  };

  useEffect(() => {
    if (
      !(
        !surveyStore.question4.naviagtion ||
        !surveyStore.question4.companyInfoChanging ||
        !surveyStore.question4.contactInfoChanging ||
        !surveyStore.question4.portfolioCreating
      )
    ) {
      setError3('');
    }
  }, [
    surveyStore.question4.companyInfoChanging,
    surveyStore.question4.contactInfoChanging,
    surveyStore.question4.naviagtion,
    surveyStore.question4.portfolioCreating,
  ]);

  useEffect(() => {
    if (!surveyStore.isPage1Completed) {
      navigate('/survey/1');
    }
  }, [navigate, surveyStore.isPage1Completed]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!surveyStore.isPage1Completed) {
    return <div></div>;
  }

  return (
    <div>
      <h1 className={styles.title}>
        Тест-драйв <span className={styles.blueText}>Ubrato</span> Анкета
      </h1>
      <div className={styles.blueBackground}>
        <p className={`${styles.text} ${styles.bold}`}>
          Агрегатор клининговых услуг Ubrato предлагает участникам сервиса, зарегистрированным в
          качестве <span className={styles.blueText}>Исполнителей</span>, принять участие в
          тест-драйве площадки. Условия участия по{' '}
          <Link className={styles.blueText} to="/">
            ссылке
          </Link>
          .
        </p>
        <p className={styles.text}>
          <span className={styles.bold}>
            Пожалуйста, ответьте на вопросы анкеты. <br /> *
          </span>{' '}
          Звездочкой отмечены обязательные для ответов
        </p>
      </div>
      <div className={`${styles.blueBackground} ${styles.questionsHeader}`}>
        <p className={`${styles.text} ${styles.bold}`}>Оцените элементы и сервисы сайта Ubrato</p>
      </div>
      <ol className={styles.questionsContainer}>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p className={styles.bold}>
            Удобно ли вам ориентироваться на нашем сайте и находить нужную вам информацию (ссылки,
            кнопки, переходы в разделы и другие страницы и тд) *
          </p>
          <p>1 - совсем непонятно и неудобно, 10 - все понял, удобно ориентироваться</p>
          <RadioGroup
            value={surveyStore.question2.rate}
            onValueChange={(v) => {
              surveyStore.setQuestion2(v);
              setError1('');
            }}
            classNames={radioGroupStyle}
          >
            {rateArr.map((e) => {
              return (
                <Radio key={e} classNames={radioStyle} value={e.toString()}>
                  {e}
                </Radio>
              );
            })}
            {error1 && <p className={styles.errorText}>{error1}</p>}
          </RadioGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Вашкомментарий</p>
            <input
              type="text"
              value={surveyStore.question2.comment}
              onChange={(e) => {
                surveyStore.setQuestion2comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p className={styles.bold}>
            Пожалуйста, оцените процесс регистрации и верификации в целом *
          </p>
          <p>1 - неудобный, 10 - удобный</p>
          <RadioGroup
            value={surveyStore.question3.rate}
            onValueChange={(v) => {
              surveyStore.setQuestion3(v);
              setError2('');
            }}
            classNames={radioGroupStyle}
          >
            {rateArr.map((e) => {
              return (
                <Radio key={e} classNames={radioStyle} value={e.toString()}>
                  {e}
                </Radio>
              );
            })}
            {error2 && <p className={styles.errorText}>{error2}</p>}
          </RadioGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Ваш комментарий</p>
            <input
              type="text"
              value={surveyStore.question3.comment}
              onChange={(e) => {
                surveyStore.setQuestion3comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <div className={styles.tableQuestinHeader}>
            <p>Элементы</p>
            <div>
              <p>Удобно</p>
              <p>Не удобно</p>
            </div>
          </div>
          <RadioGroup
            value={surveyStore.question4.naviagtion}
            onValueChange={(v) => surveyStore.setQuestion4nav(v)}
            classNames={tableRadioGroupStyle}
          >
            <p>Навигация (меню слева)</p>
            <div>
              <Radio classNames={radioStyle} value={'Удобно'}></Radio>
              <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question4.companyInfoChanging}
            onValueChange={(v) => surveyStore.setQuestion4company(v)}
            classNames={tableRadioGroupStyle}
          >
            <p>Редактирование данных компании</p>
            <div>
              <Radio classNames={radioStyle} value={'Удобно'}></Radio>
              <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question4.contactInfoChanging}
            onValueChange={(v) => surveyStore.setQuestion4contact(v)}
            classNames={tableRadioGroupStyle}
          >
            <p>Редактирование данных о контактном лице</p>
            <div>
              <Radio classNames={radioStyle} value={'Удобно'}></Radio>
              <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question4.portfolioCreating}
            onValueChange={(v) => surveyStore.setQuestion4portfolio(v)}
            classNames={tableRadioGroupStyle}
          >
            <p>Оформление портфолио</p>
            <div>
              <Radio classNames={radioStyle} value={'Удобно'}></Radio>
              <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
            </div>
            {error3 && <p className={styles.errorText}>{error3}</p>}
          </RadioGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Ваш комментарий</p>
            <input
              type="text"
              value={surveyStore.question4.comment}
              onChange={(e) => {
                surveyStore.setQuestion4comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p>Пожалуйста, оцените процесс регистрации и верификации в целом *</p>
          <p>1 - неудобный, 10 - удобный</p>
          <RadioGroup
            value={surveyStore.question5.rate}
            onValueChange={(v) => {
              surveyStore.setQuestion5(v);
              setError4('');
            }}
            classNames={radioGroupStyle}
          >
            {rateArr.map((e) => {
              return (
                <Radio key={e} classNames={radioStyle} value={e.toString()}>
                  {e}
                </Radio>
              );
            })}
            {error4 && <p className={styles.errorText}>{error4}</p>}
          </RadioGroup>
          <div className={`${styles.yourVariant} ${styles.comment}`}>
            <p>Ваш комментарий</p>
            <input
              type="text"
              value={surveyStore.question5.comment}
              onChange={(e) => {
                surveyStore.setQuestion5comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
      </ol>
      <div className={styles.btnsContainer}>
        <Link className={`${styles.survey__button} ${styles.backBtn}`} to="/survey/1">
          Назад
        </Link>
        <button className={`${styles.survey__button} ${styles.nextBtn2}`} onClick={handleGoNext}>
          Далее
        </button>
      </div>
    </div>
  );
};
