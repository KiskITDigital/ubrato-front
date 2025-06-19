import {
  fetchPrivateFile,
  fetchPrivateFileInfo,
  handleFileDelete,
  updateToken,
} from "@/api";
import { useProfileDocumentsStore } from "@/store/profileDocumentsStore";
import { FC, useEffect, useState } from "react";
import styles from "./fileinfo.module.css";

export const FileInfo: FC<{
  link: string;
  id: string;
  isDisabled?: boolean;
}> = ({ link, id, isDisabled }) => {
  const fetchDocuments = useProfileDocumentsStore();
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    format: string;
    size: number;
    ctime: string;
  }>();
  const [fileDate, setFileDate] = useState<Date>();
  const [file, setFile] = useState<string>();
  const [blobUrl, setBlobUrl] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await updateToken(fetchPrivateFileInfo, link);
      const file = await updateToken(fetchPrivateFile, link);
      setFile(file);
      setFileDate(new Date(res.ctime));
      setFileInfo(res);

      // Создаем Blob URL для файла
      if (file) {
        const byteCharacters = atob(file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Определяем MIME-тип в зависимости от формата файла
        const mimeType =
          res.format === ".pdf"
            ? "application/pdf"
            : `image/${res.format.slice(1)}`;

        const blob = new Blob([byteArray], { type: mimeType });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      }
    })();

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [link]);

  return (
    <div className={styles.container}>
      {(fileInfo?.format === ".jpeg" ||
        fileInfo?.format === ".png" ||
        fileInfo?.format === ".jpg") && (
        <div className="relative w-[100px] h-[100px] rounded-[10px] overflow-hidden group">
          <img
            className="w-full h-full object-cover"
            src={`data:image/;base64, ${file}`}
            alt="Превью файла"
          />
          <a
            href={blobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <span className="text-white text-sm font-medium">Открыть</span>
          </a>
        </div>
      )}

      {fileInfo?.format === ".pdf" && (
        <div className="relative w-[100px] h-[100px] rounded-[10px] overflow-hidden bg-gray-200">
          <iframe src={blobUrl} className="w-full h-full" title="PDF preview" />
          <a
            href={blobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
          >
            <span className="text-white text-sm">Открыть</span>
          </a>
        </div>
      )}

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
        {!isDisabled && (
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
        )}
      </div>
    </div>
  );
};
