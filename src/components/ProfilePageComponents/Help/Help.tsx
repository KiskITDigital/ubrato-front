import { Checkbox, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { FC, FormEvent, Ref, useEffect } from 'react';
import useIMask from 'react-imask/esm/hook';
import styles from './help.module.css';
import { helpSchema } from '@/validation/helpSchema';
import { Link } from 'react-router-dom';

interface HelpFormValuesT {
  name: string;
  phone: string;
  question: string;
  confirm: boolean;
}

export const Help: FC = () => {
  const checkStyle = {
    base: styles.checkBase,
    icon: styles.checkIcon,
    wrapper: styles.checkWrapper,
    label: `${styles.checkText} ${styles.infoText}`,
  };

  const itemClasses = {
    input: styles.input,
    innerWrapper: styles.innerWrapper,
    base: styles.base,
    label: styles.label,
    errorMessage: styles.errorMessage,
    helperWrapper: styles.helperWrapper,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialValues: HelpFormValuesT = {
    name: '',
    phone: '',
    question: '',
    confirm: false,
  };

  const formik = useFormik<HelpFormValuesT>({
    initialValues: initialValues,
    onSubmit(values) {
      console.log(values);
    },
    validationSchema: helpSchema,
  });

  const { ref, value, setValue } = useIMask({ mask: '+{7}(900)000-00-00' });

  return (
    <div>
      <h2 className={styles.header}>Помощь</h2>
      <div className={styles.formContainer}>
        <h3 className={styles.formHeader}>Обратная связь c Ubrato</h3>
        <form className={styles.from} onSubmit={formik.handleSubmit}>
          <Input
            id="name"
            name="name"
            type="text"
            label="Как к вам обращаться? *"
            value={formik.values.name}
            onChange={formik.handleChange}
            isInvalid={Boolean(formik.errors.name)}
            errorMessage={formik.errors.name}
            classNames={itemClasses}
          />

          <Input
            ref={ref as Ref<HTMLInputElement>}
            id="phone"
            name="phone"
            label="Ваш номер телефона: *"
            type="phone"
            value={value}
            onChange={formik.handleChange}
            onInput={(e: FormEvent<HTMLInputElement>) => {
              setValue(e.currentTarget.value);
              formik.handleChange(e);
            }}
            isInvalid={Boolean(formik.errors.phone)}
            errorMessage={formik.errors.phone}
            classNames={itemClasses}
          />
          <Input
            id="question"
            name="question"
            type="text"
            label="Какой вопрос у вас возник?"
            value={formik.values.question}
            onChange={formik.handleChange}
            classNames={itemClasses}
          />
          <Checkbox
            id="confirm"
            name="confirm"
            isSelected={formik.values.confirm}
            onChange={formik.handleChange}
            classNames={checkStyle}
          >
            Соглашаюсь с <Link className={styles.links} to={'/rights?document=1'}>Политикой обработки персональных данных ООО “ИНТЕГРАЦИЯ”</Link> и даю <Link className={styles.links} to={'/rights?document=3'}>Согласие на обработку персональных данных</Link>
            <p className={`${styles.errorMessage} ${styles.checkErr}`}>{formik.errors.confirm}</p>
          </Checkbox>
          <input type="submit" className={styles.submit} value="Заказать звонок" />
          {/* <Link></Link> */}
        </form>
      </div>
    </div>
  );
};
