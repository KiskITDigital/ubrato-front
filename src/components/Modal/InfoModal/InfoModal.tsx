import { useEffect } from "react";
import styles from "./infoModal.module.css";

type InfoModalProps = {
  title: string;
  text: string;
  onClose: () => void;
};

export default function InfoModal({ title, text, onClose }: InfoModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalContent}>
        {title && <h4 className={styles.modalTitle}>{title}</h4>}

        <p className={styles.modalText}>{text}</p>

        <button className={styles.modalButton} onClick={onClose}>
          ОК
        </button>
      </div>
    </section>
  );
}
