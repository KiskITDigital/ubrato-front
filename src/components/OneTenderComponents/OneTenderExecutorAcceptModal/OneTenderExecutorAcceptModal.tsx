import { FC } from "react"
import styles from './styles.module.css'
import { Switch } from '@nextui-org/react';
import { sendResponse } from "@/api/respondTender";


type TenderModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    price: number;
    id:number,
  };

export const OneTenderExecutorAcceptModal: FC<TenderModalProps> = ({id, isOpen, closeModal, handleSubmit, handleChange, price}) => {

    const SwicthStyles = {
        base: styles.base,
        wrapper: styles.wrapper,
        thumb: styles.thumb,
      };
    
      const token = localStorage.getItem('token');

    // if (token) {
    //   try {
    //     (async () => {
    //       const res = await sendResponse(token, id);
    //       if (res === 200) {
    //         console.log("error")
    //       }
    //     })();
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    return(
        <>
        {isOpen && (
            <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2 className={styles.modalHeader}>Откликнуться на тендер</h2>
            <form className={styles.form_modal} onSubmit={handleSubmit}>
              <label className={`${styles.field}`}>
                  <p className={styles.accent_paragraph}>Выберите один из вариантов:</p>
                  <div className={styles.wrap_label}><input type="checkbox" name="" className={styles.input_checkbox}  onChange={handleChange} /> <p className={styles.middle_paragraph}>Согласны со стоимостью заказчика {price} рублей</p>
                  </div>
    
              </label>
              <label className={`${styles.field}`}>
                <p className={styles.label_paragraph}>Готовы выполнить работу за</p> 
                <div>
                <input type="text"  name="price" className={styles.input_modal} onChange={handleChange} />
                рублей 
                
                </div>
                <Switch classNames={SwicthStyles} onChange={handleChange}></Switch>
                <span className={styles.span_nds}>вкл. НДС</span>
              </label>
              <div className={styles.nds_notice}>
                <div className={styles.circle}></div>
                <p className={styles.nds_notice_text}>
                Если ваша компания работает по общей системе налогообложения (ОСН), указывайте цену с учетом НДС
                </p>
              </div>
              <button className={styles.button_spec} type="submit">Откликнуться</button>
              
            </form>
          </div>
        </div>
        )}
    </>
    )
}