import { updateToken, uploadFile } from "@/api";
import { useTenderInfoStore } from "@/store/tenderStore";
import { useUserInfoStore } from "@/store/userInfoStore";

import { FC, useState } from "react";
import { AdditionalInfoItem } from "../AdditionalInfoItem/AdditionalInfoItem";
import { cdnUrl } from "@/api/hosts";

const additionalInfoItems = [
  {
    header: "Полный цикл уборки",
    text: "В рамках полного цикла уборки были выполнены все необходимые задачи, включая пылесос по коврам, влажную уборку полов, очистку мебели и пылесос по мягкой мебели. Также были проверены и заменены все использованные полотенца и постельное белье. В результате помещения были приведены в идеальное состояние, готовые к приёму гостей.",
    date: "12.10.24",
    files: [
      "/usr_591c3d54-dfea-4dd9-99e1-38f074fa79d9/b74a077d7829f6f/16.jpg",
      "/usr_591c3d54-dfea-4dd9-99e1-38f074fa79d9/743e507229ace1b/Задани.docx",
    ],
  },
  {
    header: "Мытьё окон и зеркал",
    text: "В ходе уборки было выполнено тщательное мытьё всех окон и зеркал в доме. Использовались специальные средства для удаления пыли и разводов, а также мягкие тряпки для предотвращения появления царапин. После завершения работы все стеклянные поверхности были идеально чистыми и прозрачными, что значительно улучшило общую атмосферу в доме.",
    date: "25.10.24",
    files: [
      "/usr_591c3d54-dfea-4dd9-99e1-38f074fa79d9/2c676d47b2ac840/makeitmeme_dVhbG.jpg",
      "/usr_591c3d54-dfea-4dd9-99e1-38f074fa79d9/0ce9c30adac8ffd/c01dd62406a73c8b6f3ac7c73bb2b29a.jpg",
    ],
  },
];

export const AdditionalInfo: FC = () => {
  const userInfoStore = useUserInfoStore();
  const tenderInfoStore = useTenderInfoStore();
  const [newLinks, setNewLinks] = useState<string[]>([]);

  return (
    <div className="w-[1024px] mx-auto">
      {userInfoStore.user.id === tenderInfoStore.tenderInfo.user_id && (
        <>
          <div className="flex gap-4 items-start mt-5">
            <img src="/info-blue-ic.svg" alt="info" />
            <p className="text-[16px] text-[#666] max-w-[700px]">
              Если необходимо опубликовать дополнительную, уточняющую информацию
              о тендере, разместите ее здесь и отправьте на модерацию
            </p>
          </div>
          <div className="mt-5 px-[10px] py-[10px] bg-light-gray rounded-[20px] flex flex-col gap-[10px] text-[16px]">
            <input
              className="outline-none px-3 py-[10px] text-[16px] rounded-xl"
              type="text"
              name="header"
              placeholder="Заголовок"
            />
            <textarea
              rows={2}
              placeholder="Введите ваш текст..."
              className="outline-none py-[10px] px-3 rounded-xl text-[16px]"
              name="text"
              id=""
            ></textarea>
            <label htmlFor="infoFile">
              <input
                className="hidden"
                onChange={(e) => {
                  // console.log(e.target.files);
                  if (
                    ["image/png", "image/jpeg", "application/pdf"].includes(
                      e.target.files![0].type
                    )
                  ) {
                    if (e.target.files !== null) {
                      if (e.target.files.length <= 4 - newLinks.length) {
                        (async () => {
                          const newNewLinks: string[] = [];

                          for (const i of e.target.files!) {
                            const parameters = { file: i, private: false };
                            const link = await updateToken<
                              string,
                              { file: File; private: boolean }
                            >(uploadFile, parameters);

                            newNewLinks.push(link);
                          }
                          setNewLinks([...newLinks, ...newNewLinks]);
                        })();
                      }
                    }
                  } else {
                    e.target.value = "";
                    // console.log(e.target.files);
                  }
                }}
                id="infoFile"
                name="infoFile"
                type="file"
                multiple={true}
                accept="image/png, image/jpeg, application/pdf"
              />
              {newLinks.length < 4 && (
                <div className="flex py-[10px] w-full justify-center items-center gap-10 border-accent border-dashed border rounded-[10px] cursor-pointer">
                  <img
                    className="w-8 h-8"
                    src="/add-file-ic.svg"
                    alt="addFile"
                  />
                  <div>
                    <p className="font-bold text-[14px]">Добавить файлы</p>
                    <p className="texet-[#666] text-[12px]">
                      Можно загрузить не более {4 - newLinks.length} шт.
                    </p>
                  </div>
                </div>
              )}
            </label>
            <div className="flex gap-3">
              {newLinks.map((link, ix) => (
                <div key={ix} className="relative self-start">
                  <button
                    className="flex items-center justify-center absolute top-[-5px] right-[-5px] w-[16px] h-[16px] rounded-full bg-white"
                    onClick={() => {
                      setNewLinks(newLinks.filter((l) => l !== link));
                    }}
                  >
                    <img
                      className="w-[12px] h-[12px]"
                      src="/x-icon.svg"
                      alt="delete"
                    />
                  </button>
                  <img
                    className="h-[100px] w-auto"
                    src={`${cdnUrl}/s3${link}`}
                  />
                </div>
              ))}
            </div>
            <button className="self-start px-2 py-1 bg-accent rounded-lg text-white text-[16px]">
              Отправить на модерацию
            </button>
          </div>
        </>
      )}
      <div>
        {additionalInfoItems.map((item, ix) => (
          <AdditionalInfoItem
            key={ix}
            header={item.header}
            text={item.text}
            date={item.date}
            files={item.files}
          />
        ))}
      </div>
    </div>
  );
};
