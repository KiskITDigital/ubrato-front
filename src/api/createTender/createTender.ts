import { createTenderData } from '@/types/app';
import { axiosInstance } from '@/utils';

export const createTender = async (
  token: string,
  params: { parameters: createTenderData; isDraft?: boolean }
) => {
  const res = await axiosInstance.post(
    `/v1/tenders/${params.isDraft ? 'draft' : 'create'}`,
    params.parameters,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return res;
};
