import { FC, Ref, useState } from "react";
import styles from "./styles.module.css";
import { Switch } from "@nextui-org/react";
import { sendResponse } from "@/api/respondTender";
import { useIMask } from "react-imask";
// import notion from ''

type TenderModalProps = {
  setResponse: () => void;
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  price: number;
  id: string | undefined;
  response: boolean;
};

export const OneTenderExecutorAcceptModal: FC<TenderModalProps> = ({
  setResponse,
  id,
  isOpen,
  closeModal,
  handleSubmit,
  handleChange,
  price,
  response,
}) => {
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const SwicthStyles = {
    base: styles.base,
    wrapper: styles.wrapper,
    thumb: styles.thumb,
  };

  const handleResponseOnTender = (token: string, id: string, price: number) => {
    if (token) {
      try {
        (async () => {
          await sendResponse(token, id, price);
        })();
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const { ref, value, setValue, unmaskedValue } = useIMask({
    mask: Number,
    min: 0.01,
    max: 9999999999.99,
    thousandsSeparator: " ",
    scale: 2,
    radix: ",",
    mapToRadix: ["."],
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
    if (e.target.checked) {
      setValue(price.toString());
    } else {
      // console.log('error occured');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    const token = localStorage.getItem("token");
    const finalPrice = isAgreed ? price : Number(unmaskedValue);
    console.log(finalPrice);
    e.preventDefault();
    if (token && id) {
      const finalPrice = isAgreed ? price : Number(value);
      if (finalPrice !== null) {
        handleResponseOnTender(token, id, finalPrice);
        setResponse();
        closeModal();
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          {!response ? (
            <div className={styles.modal}>
              <span className={styles.close} onClick={closeModal}>
                &times;
              </span>
              <h2 className={styles.modalHeader}>Откликнуться на тендер</h2>
              <form className={styles.form_modal} onSubmit={handleSubmit}>
                <label className={`${styles.field}`}>
                  <p className={styles.accent_paragraph}>
                    Выберите один из вариантов:
                  </p>
                  <div className={styles.wrap_label}>
                    {/* <label className={styles.input_checkbox}> <span className={styles.phantom_check}></span> <input onChange={handleCheckboxChange} type="checkbox" name=""  /></label>  */}
                    {/* todo - проверить как отображается чекбокс, из-за переписывания стилей в base.css, заменить на чекбокс из nextui */}
                    <input
                      type="checkbox"
                      onChange={handleCheckboxChange}
                      className={styles.input_checkobx}
                    />
                    <p className={styles.middle_paragraph}>
                      Согласны с бюджетом на тендер {price} рублей
                    </p>
                  </div>
                </label>
                <label className={`${styles.field}`}>
                  <p className={styles.label_paragraph}>
                    Готовы выполнить работу за
                  </p>
                  <div>
                    <input
                      ref={ref as Ref<HTMLInputElement>}
                      onChange={(e) => {
                        if (/^0\d+/.test(e.target.value)) {
                          setValue(e.target.value.slice(1));
                        } else {
                          setValue(e.target.value);
                        }
                      }}
                      disabled={isAgreed}
                      value={value}
                      type="text"
                      name="price"
                      className={styles.input_modal}
                    />
                    рублей
                  </div>
                  <Switch
                    classNames={SwicthStyles}
                    onChange={handleChange}
                  ></Switch>
                  <span className={styles.span_nds}>вкл. НДС</span>
                </label>
                <div className={styles.nds_notice}>
                  <div className={styles.circle}></div>
                  <p className={styles.nds_notice_text}>
                    Выбирайте с НДС, если ваша компания работает по общей
                    системе налогообложения (ОСН)
                  </p>
                </div>
                <button
                  onClick={handleFormSubmit}
                  className={styles.button_spec}
                  type="submit"
                >
                  Откликнуться
                </button>
              </form>
            </div>
          ) : (
            <div className={styles.modal_new}>
              <p className={styles.notion}>
                Вы уже откликнулись на этот тендер!
              </p>
              <div className={styles.nds_notice}>
                <p className={styles.nds_notice_text}>
                  Ранее вы уже откликались на этот тендер
                </p>
              </div>
              <button className={styles.button_spec} onClick={closeModal}>
                Закрыть окно
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
