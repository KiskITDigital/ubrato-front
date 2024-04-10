import { FC } from 'react';
import styles from '../MainPart.module.css';
import { Link } from 'react-router-dom';
import { Radio, RadioGroup } from '@nextui-org/react';

export const Page1: FC = () => {

  const radioStyle = {
    base: styles.radioBase,
    wrapper: styles.radioWrapper,
    control: styles.radioControl
  }

  return (
    <div>
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
          <RadioGroup>
            <Radio classNames={radioStyle} value='yes'>Да</Radio>
            <Radio classNames={radioStyle} value='no'>Нет</Radio>
          </RadioGroup>
        </li>
      </ol>
    </div>
  );
};
