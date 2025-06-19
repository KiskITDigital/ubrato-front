import React, { forwardRef } from "react";
import styles from "../../CreateTender.module.css";
import { useCreateTenderState } from "@/store/createTenderStore";

interface NameTenderProps {
  ref?: React.Ref<HTMLDivElement>;
}

const NameTender = forwardRef<HTMLDivElement, NameTenderProps>((_, ref) => {
  const createTenderState = useCreateTenderState();
  const errorMessage = createTenderState.getError("name");

  const handleBlur = () => {
    if (!createTenderState.name) {
      createTenderState.addError("name", "Обязательно для заполнения");
    } else if (createTenderState.name.length < 3) {
      createTenderState.addError("name", "Минимум 3 символа");
    } else if (createTenderState.name.length > 100) {
      createTenderState.addError("name", "Максимум 100 символов");
    } else {
      createTenderState.removeError("name");
    }
  };

  return (
    <div ref={ref} className={`${styles.nameTender}`}>
      <label
        className={`${styles.nameTender__label} ${styles.textBlack60} ${styles.textRegular}`}
      >
        Название тендера:
      </label>
      <input
        onFocus={() => createTenderState.removeError("name")}
        onBlur={handleBlur}
        type="text"
        className={`${styles.nameTender__input} ${styles.input} ${
          errorMessage ? styles.inputError : ""
        }`}
        value={createTenderState.name}
        onChange={(e) =>
          createTenderState.handleSimpleInput("name", e.currentTarget.value)
        }
        maxLength={100}
      />
      {errorMessage && (
        <p
          className={`${styles.inputErrorText} ${styles.inputErrorTextName} ${styles.inputErrorTenderName}`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
});

NameTender.displayName = "NameTender";

export default NameTender;
