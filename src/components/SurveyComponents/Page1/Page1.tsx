import { FC, useEffect, useState } from 'react';
import styles from '../MainPart.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, RadioGroup } from '@nextui-org/react';
import { useSurveyStore } from '@/store/surveyStore';

export const Page1: FC = () => {
  const radioStyle = {
    base: styles.radioBase,
    wrapper: styles.radioWrapper,
    control: styles.radioControl,
  };

  const radioGroupStyle = {
    wrapper: styles.radioGroupWrapper,
  };

  const [error, setError] = useState('');
  const surveyStore = useSurveyStore();
  const navigate = useNavigate();

  const handleGoNext = () => {
    if (
      !surveyStore.question1.answer ||
      (surveyStore.question1.answer === 'свой вариант' && !surveyStore.question1.comment)
    ) {
      setError('Это обязательный вопрос');
    } else {
      surveyStore.setIsPage1Completed(true);
      navigate('/survey/2');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ marginBottom: '120px' }}>
      <h1 className={styles.title}>
        Тест-драйв <span className={styles.blueText}>Ubrato</span> Анкета
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
        <p className={styles.text}>
          Полезен ли <span className={styles.blueText}>Ubrato</span> для бизнеса вашей компании?{' '}
        </p>
      </div>
      <ol className={styles.questionsContainer}>
        <li className={`${styles.questionItem} ${styles.text}`}>
          <p>
            Помогает ли профильный агрегатор Ubrato в решении задач вашего бизнеса? * Чем полезен
            сайт Ubrato - смотрите на странице{' '}
            <Link to="/" target="_blank">
              “<span className={styles.blueText}>О сервисе</span>”
            </Link>
            .
          </p>
          <RadioGroup
            value={surveyStore.question1.answer}
            onValueChange={(v) => {
              surveyStore.setQuestion1(v);
              setError('');
            }}
            classNames={radioGroupStyle}
          >
            <Radio classNames={radioStyle} value="да">
              Да
            </Radio>
            <Radio classNames={radioStyle} value="нет">
              Нет
            </Radio>
            <Radio classNames={radioStyle} value="не решил">
              Ещё не решил
            </Radio>
            <div className={styles.yourVariant}>
              <Radio classNames={radioStyle} value="свой вариант">
                Ваш вариант
              </Radio>
              <input
                value={surveyStore.question1.comment}
                onChange={(e) => {
                  surveyStore.setQuestion1comment(e.target.value);
                }}
                disabled={surveyStore.question1.answer !== 'свой вариант'}
                type="text"
                className={styles.input}
              />
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
          </RadioGroup>
        </li>
      </ol>
      <button className={`${styles.survey__button} ${styles.nextBtn}`} onClick={handleGoNext}>
        Далее
        <img src="/arrow-with-line-right-white.svg" alt="" />
      </button>
    </div>
  );
};
