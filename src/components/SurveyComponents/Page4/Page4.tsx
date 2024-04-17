import { useSurveyStore } from '@/store/surveyStore';
import { RadioGroup, Radio } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../MainPart.module.css';

export const Page4: FC = () => {
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

  const handleGoNext = () => {
    let error = true;
    if (!surveyStore.question9.rate) {
      setError1('Это обязательный вопрос');
      error = true;
    } else {
      error = false;
    }
    if (!surveyStore.question10.rate) {
      setError2('Это обязательный вопрос');
      error = true;
    } else {
      error = false;
    }
    if (
      !surveyStore.question11.response ||
      !surveyStore.question11.priceNDS ||
      !surveyStore.question11.chat ||
      !surveyStore.question11.winnerInfo ||
      !surveyStore.question11.readyConfirm
    ) {
      setError3('Ответьте на все вопросы');
      error = true;
    } else {
      error = false;
    }
    if (!error) {
      surveyStore.setIsPage4Completed(true);
      navigate('/survey/5');
    }
  };

  useEffect(() => {
    if (
      !(
        !surveyStore.question11.response ||
        !surveyStore.question11.priceNDS ||
        !surveyStore.question11.chat ||
        !surveyStore.question11.winnerInfo ||
        !surveyStore.question11.readyConfirm
      )
    ) {
      setError3('');
    }
  }, [
    surveyStore.question11.chat,
    surveyStore.question11.priceNDS,
    surveyStore.question11.readyConfirm,
    surveyStore.question11.response,
    surveyStore.question11.winnerInfo,
  ]);

  useEffect(() => {
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
    }
  }, [
    navigate,
    surveyStore.isPage1Completed,
    surveyStore.isPage2Completed,
    surveyStore.isPage3Completed,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ marginBottom: '120px' }}>
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
        <p className={`${styles.text} ${styles.bold}`}>Оцените удобство работы с тендерами</p>
      </div>
      <ol className={styles.questionsContainer}>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p className={styles.bold}>Пожалуйста, оцените удобства поиска тендеров *</p>
          <p>1 - совсем непонятный и неудобный поиск тендеров, 10 - все понял, все удобно</p>
          <RadioGroup
            value={surveyStore.question9.rate}
            onValueChange={(v) => {
              surveyStore.setQuestion9(v);
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
            <p>Ваш комментарий</p>
            <input
              type="text"
              value={surveyStore.question9.comment}
              onChange={(e) => {
                surveyStore.setQuestion9comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p className={styles.bold}>Пожалуйста, оцените полноту данных о тендере для отклика *</p>
          <p>
            1 - совсем мало данных о тендере, чтобы сделать отклик, 10 - данных о тендере достаточно
            для отклика
          </p>
          <RadioGroup
            value={surveyStore.question10.rate}
            onValueChange={(v) => {
              surveyStore.setQuestion10(v);
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
              value={surveyStore.question10.comment}
              onChange={(e) => {
                surveyStore.setQuestion10comment(e.target.value);
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
            value={surveyStore.question11.response}
            onValueChange={(v) => surveyStore.setQuestion11response(v)}
            classNames={tableRadioGroupStyle}
          >
            <p>Отклик в целом</p>
            <div>
              <Radio classNames={radioStyle} value={'Удобно'}></Radio>
              <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question11.priceNDS}
            onValueChange={(v) => surveyStore.setQuestion11priceNDS(v)}
            classNames={tableRadioGroupStyle}
          >
            <p>Указание в отклике стоимости и работы с НДС</p>
            <div>
              <Radio classNames={radioStyle} value={'Удобно'}></Radio>
              <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question11.chat}
            onValueChange={(v) => surveyStore.setQusetion11chat(v)}
            classNames={tableRadioGroupStyle}
          >
            <p>Чат с заказчиком</p>
            <div>
              <Radio classNames={radioStyle} value={'Удобно'}></Radio>
              <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question11.winnerInfo}
            onValueChange={(v) => surveyStore.setQuestion11winnerInfo(v)}
            classNames={tableRadioGroupStyle}
          >
            <p>Информирование о выборе победителя</p>
            <div>
              <Radio classNames={radioStyle} value={'Удобно'}></Radio>
              <Radio classNames={radioStyle} value={'Не удобно'}></Radio>
            </div>
          </RadioGroup>
          <RadioGroup
            value={surveyStore.question11.readyConfirm}
            onValueChange={(v) => surveyStore.setQuestion11readyConfirm(v)}
            classNames={tableRadioGroupStyle}
          >
            <p>Процедура подтверждения готовности выполнить работы</p>
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
                surveyStore.setQuestion11comment(e.target.value);
              }}
              className={styles.input}
            />
          </div>
        </li>
      </ol>
      <div className={styles.btnsContainer}>
        <Link className={`${styles.survey__button} ${styles.backBtn}`} to="/survey/3">
          Назад
        </Link>
        <button className={`${styles.survey__button} ${styles.nextBtn2}`} onClick={handleGoNext}>
          Далее
        </button>
      </div>
    </div>
  );
};
