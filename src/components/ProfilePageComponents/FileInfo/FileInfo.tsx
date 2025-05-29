import {
  fetchPrivateFile,
  fetchPrivateFileInfo,
  handleFileDelete,
  updateToken,
} from "@/api";
import { useProfileDocumentsStore } from "@/store/profileDocumentsStore";
import { FC, useEffect, useState } from "react";
import styles from "./fileinfo.module.css";

export const FileInfo: FC<{ link: string; id: string }> = ({ link, id }) => {
  const fetchDocuments = useProfileDocumentsStore();
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    format: string;
    size: number;
    ctime: string;
  }>();
  const [fileDate, setFileDate] = useState<Date>();

  const [file, setFile] = useState<string>();

  useEffect(() => {
    // if (!link) {
    console.log(link);
    (async () => {
      const res = await updateToken(fetchPrivateFileInfo, link);
      const file = await updateToken(fetchPrivateFile, link);
      console.log(res);
      setFile(file);
      setFileDate(new Date(res.ctime));
      setFileInfo(res);
    })();
    // }
  }, [link]);

  return (
    // if (!documentId) return null;
    <div className={styles.container}>
      {(fileInfo?.format === ".jpeg" ||
        fileInfo?.format === ".png" ||
        fileInfo?.format === ".jpg") && (
        <img
          className="w-[100px] h-[100px] rounded-[10px]"
          src={`data:image/;base64, ${file}`}
          alt=""
        />
      )}
      {/* {fileInfo?.format === '.pdf' && (
        <embed
          src={`data:application/pdf;base64, ${file}`}
          // type="application/pdf"
          height="300px"
          width="300px"
        ></embed>
      )} */}
      <div className="ml-[15px]">
        <div className={styles.flexText}>
          <p className={styles.text}>{fileInfo?.format.slice(1)}</p>
          <p className={styles.text}>
            {fileInfo ? (fileInfo?.size / 1024).toFixed(1) : ""}kb
          </p>
        </div>
        <p className={styles.text}>
          Загружен{" "}
          {fileDate?.toLocaleString("default", {
            day: "numeric",
            month: "long",
          })}{" "}
          {fileDate?.getFullYear()}
        </p>
        <button
          className={styles.btn}
          onClick={() => {
            (async () => {
              // console.log(id);
              await updateToken(handleFileDelete, id);
              // const token = localStorage.getItem('token')
              // await handleFileDelete( token, id)
              await fetchDocuments.fetchDocuments();
              try {
                fetchDocuments.removeDocument(id);
              } catch (e) {
                fetchDocuments.removeDocument(id);
              }
            })();
          }}
        >
          <img src="/trash-bin.svg" alt="" />
          Удалить <br />
        </button>
      </div>
    </div>
  );
};
