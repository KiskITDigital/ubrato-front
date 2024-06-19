import { fetchDocumentsTypes, fetchUserDocs, updateToken } from '@/api';
import { create } from 'zustand';

interface documentInfo {
  type: number;
  header: string;
  id: string;
  link?: string;
  idFile?: string;
}

interface profileDocumentsStore {
  documents: documentInfo[];
  fetchDocuments: () => Promise<void>;
}

const documentsTypes: Record<number, string> = {
  1: 'egrul',
  2: 'company_card',
  3: 'director_order',
  4: 'company_regulation',
};

export const useProfileDocumentsStore = create<profileDocumentsStore>()((set) => ({
    
  documents: [],
  async fetchDocuments() {
    const res = await fetchDocumentsTypes();
    const userDocs = await updateToken<{ id: string; link: string; type: string }[], null>(
      fetchUserDocs,
      null
    );
    const docsArr: documentInfo[] = res.map((e) => {
      return {
        type: e.id,
        header: e.name,
        id: documentsTypes[e.id],
        link: userDocs.find((i) => i.type === e.name)?.link,
        idFile: userDocs.find((i) => i.type === e.name)?.id,
        // fileId: userDocs?.id
      };
    });
    set({ documents: docsArr });
  },
}));
