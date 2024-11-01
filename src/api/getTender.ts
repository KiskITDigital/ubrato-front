import { draftData } from '@/types/app';
import { axiosInstance } from '@/utils';

export const fetchProduct = async (id: string | undefined) => {
  const res = await axiosInstance.get(`/v1/tenders/tender/${id}`);
  if (res.data) {
    return res.data;
  } else {
    return 'ошибочка вышла(';
  }
};

export const fetchDraft = async (token: string, id: string) => {
  const res = await axiosInstance.get<draftData>(`/v1/tenders/draft/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const fetchDrafts = async (token: string) => {
  const res = await axiosInstance.get<draftData[]>(`/v1/tenders/my/drafts`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
