import { fetchDocumentsTypes, fetchUserDocs, updateToken } from '@/api';
import { create } from 'zustand';

interface documentInfo {
  type: number;
  header: string;
  text: string;
  id: string;
  link?: string;
  idFile?: string;
}

interface profileDocumentsStore {
  documents: documentInfo[];
  fetchDocuments: () => Promise<void>;
  removeDocument: (id: string) => void;
}

const documentsTypes: Record<number, string> = {
  1: 'egrul',
  2: 'company_card',
  3: 'director_order',
  4: 'company_regulation',
};

const documentsTexts: Record<number, string> = {
  1: 'Сканированная копия Выписки из ЕГРЮЛ на бумажном носителе, полученной в ФНС и заверенной подписью налогового инспектора с простановкой печати, либо электронная Выписка из ЕГРЮЛ, сформированная на сайте www.nalog.ru и подписанная усиленной квалифицированной электронной подписью.',
  2: `В карточке рекомендуем указать следующую информацию о компании:

      Полное наименование компании;
      Сокращенное наименование; 
      ИНН, ОГРН, КПП, ОКВЭД;
      Адрес места нахождения;
      Фактический адрес;
      ФИО руководителя;
      ФИО главного бухгалтера;
      Банковские реквизиты; 
      Контакты для связи (телефон/факс, мобильный телефон, никнейм, e-mail);  
      Дополнительная информация (Применяемая система налогообложения, Сведения о лицензиях).
      `,
  3: 'Например, сканированная копия приказа  о назначении руководителя компании.',
  4: 'Сканированная копия Устава компании. При наличии изменений в Устав, предоставляется Устав вместе с изменениями.',
};

export const useProfileDocumentsStore = create<profileDocumentsStore>()((set) => ({
  documents: [],
  async fetchDocuments() {
    const res = await fetchDocumentsTypes();
    const userDocs = await updateToken<{ id: string; link: string; type: string }[], null>(
      fetchUserDocs,
      null
    );
    // console.log(res);
    // console.log(userDocs);

    const docsArr: documentInfo[] = [];
    res.forEach((e) => {
      // const link = userDocs.find((i) => i.type === e.name)?.id
      // console.log(link);

      // if (!link) {
      //   docsArr.push({
      //     type: e.id,
      //     header: e.name,
      //     id: documentsTypes[e.id]
      //   })
      // } else {
      docsArr.push({
        type: e.id,
        header: e.name,
        text: documentsTexts[e.id],
        id: documentsTypes[e.id],
        link: userDocs.find((i) => i.type === e.name)?.link,
        idFile: userDocs.find((i) => i.type === e.name)?.id,
      });
      // }
    });
    // console.log(docsArr);

    set({ documents: docsArr });
  },
  removeDocument(id: string) {
    // console.log(id);

    const newDocs = this.documents.map((el) =>
      el.idFile === id
        ? {
            type: el.type,
            header: el.header,
            text: el.text,
            id: el.id,
          }
        : el
    );
    // console.log('_', newDocs);

    set({ documents: newDocs });
  },
}));
