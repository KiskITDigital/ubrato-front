import { FC, useState } from "react";
import styles from "./fileinput.module.css";
import { sendDoc, updateToken, uploadFile } from "@/api";
import { FileInfo } from "../FileInfo/FileInfo";
import { useProfileDocumentsStore } from "@/store/profileDocumentsStore";
import { Tooltip } from "@nextui-org/react";

interface FileInputProps {
  header: string;
  text: string;
  id: string;
  type: number;
  link?: string;
  idFile?: string;
}

export const FileInput: FC<FileInputProps> = ({
  header,
  type,
  id,
  link,
  idFile,
  text,
}) => {
  const fetchDocuments = useProfileDocumentsStore();
  const [error, setError] = useState("");
  const [newIdFile, setNewIdFile] = useState(idFile ?? "");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ в байтах

  return (
    <div className={styles.fileContainer}>
      <div>
        <div className="flex gap-1 max-w-[320px]">
          <h3 className={styles.fileHeader}>{header}</h3>
          <Tooltip
            placement="top"
            closeDelay={100}
            content={
              <p className="w-[400px] bg-white rounded-xl py-3 px-4 shadow-lg">
                {text}
              </p>
            }
          >
            <button className="flex self-start">
              <img src="/info-ic.svg" alt="info" />
            </button>
          </Tooltip>
        </div>
        <p className={styles.fileText}>
          Форматы: pdf, jpg, png, размер одного файла не должен превышать 5 Мб.
        </p>
        <label className={styles.label} htmlFor={id}>
          <input
            disabled={Boolean(link)}
            onChange={(e) => {
              if (!e.target.files || e.target.files.length === 0) return;

              const file = e.target.files[0];

              if (
                !["image/png", "image/jpeg", "application/pdf"].includes(
                  file.type
                )
              ) {
                setError("Неверный тип файла");
                e.target.value = "";
                return;
              }

              if (file.size > MAX_FILE_SIZE) {
                setError("Размер файла превышает 5 МБ");
                e.target.value = "";
                return;
              }

              setError("");
              const parameters = { file: file, private: true };
              (async () => {
                const link = await updateToken<
                  string,
                  { file: File; private: boolean }
                >(uploadFile, parameters);
                const res = await updateToken<
                  string,
                  { link: string; type: number }
                >(sendDoc, {
                  link: link,
                  type: type,
                });
                setNewIdFile(res);
                fetchDocuments.fetchDocuments();
              })();
            }}
            className={styles.inputFile}
            type="file"
            name={id}
            id={id}
            accept="image/png, image/jpeg, application/pdf, text/xml"
          />
          <div className={`${styles.fileBtn} ${Boolean(link) && "hidden"}`}>
            Загрузить
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </label>
      </div>
      {link && <FileInfo link={link} id={newIdFile} />}
    </div>
  );
};
