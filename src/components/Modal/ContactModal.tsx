import { helpSchema } from "@/validation/helpSchema";
import { Checkbox, Input, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import styles from "./ContactModal.module.css";
import { useIMask } from "react-imask";
import { FormEvent, Ref, useState } from "react";
import { sendHelpMessage } from "@/api";
import { ClickOutside } from "./ClickOutside";

type ContactFormProps = {
  name: string;
  phone: string;
  question: string;
  confirm: boolean;
};

const initialValues: ContactFormProps = {
  name: "",
  phone: "",
  question: "",
  confirm: false,
};

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

export default function ContactModal({
  onClose,
  type,
}: {
  onClose?: () => void;
  type:
    | "SURVEY_TYPE_REGISTRATION"
    | "SURVEY_TYPE_VERIFICATION"
    | "SURVEY_TYPE_FEEDBACK";
}) {
  const [successfullySent, setSuccessfullSent] = useState(false);

  const formik = useFormik<ContactFormProps>({
    initialValues: initialValues,
    onSubmit(values) {
      (async () => {
        try {
          await sendHelpMessage(
            values.name,
            values.phone,
            values.question,
            type
          );
          setSuccessfullSent(true);
          formik.resetForm();
          setValue("");
        } catch (error) {
          console.error(error);
        }
      })();
    },
    validationSchema: helpSchema,
  });

  const { ref, value, setValue } = useIMask({ mask: "+{7}(900)000-00-00" });

  return (
    <form
      className="flex flex-col gap-5 bg-white p-5 rounded-[20px] relative shadow-lg w-fit"
      onSubmit={formik.handleSubmit}
    >
      <>
        {onClose && (
          <img
            src="/x-icon.svg"
            className="absolute min-w-6 size-6 right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
        )}
        <p className="text-[20px] font-bold">
          Обратная связь c <span className="text-accent">Ubrato</span>
        </p>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
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
          placeholder="+7 (900) 000 00 00"
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
        <Textarea
          id="question"
          name="question"
          type="text"
          maxLength={1000}
          placeholder="Напишите ваш вопрос"
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
          Я даю{" "}
          <Link
            className={styles.link}
            target="_blank"
            to="/documents/soglasie_na_obrabotku_personalnyh_dannyh"
          >
            Согласие на обработку персональных данных
          </Link>{" "}
          в соответствии с{" "}
          <Link
            className={styles.link}
            target="_blank"
            to="/documents/politika_v_otnoshenii_obrabotki_personalnyh_dannyh_polzovateley_saita"
          >
            Политикой в отношении обработки персональных данных
          </Link>{" "}
          и принимаю условия{" "}
          <Link
            className={styles.link}
            target="_blank"
            to="/documents/polzovatelskoe_soglashenie"
          >
            Пользовательского соглашения
          </Link>
          .
          <p className={`${styles.errorMessage} ${styles.checkErr}`}>
            {formik.errors.confirm}
          </p>
        </Checkbox>
        <button type="submit" className={styles.submit}>
          Заказать звонок
        </button>
      </>

      {successfullySent && (
        <div className="flex items-center justify-center w-[calc(100%-20px)] h-[calc(100%-15px)] absolute top-[10px] left-[10px] backdrop-blur">
          <ClickOutside
            clickFn={() => {
              setSuccessfullSent(false);
            }}
          >
            <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center gap-6">
              <p className="text-lg">
                Спасибо за Ваше обращение, ожидайте звонка!
              </p>
              {onClose && (
                <button
                  className="w-[70px] rounded-lg p-1 bg-accent text-white flex items-center justify-center"
                  onClick={onClose}
                >
                  ОК
                </button>
              )}
            </div>
          </ClickOutside>
        </div>
      )}
    </form>
  );
}
