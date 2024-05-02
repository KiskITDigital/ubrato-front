import { axiosInstance } from '@/utils';
import { axiosInstanceStore } from '@/utils/baseHttp';

export const fetchDocumentsTypes = async (): Promise<[{ id: number; name: string }]> => {
  const res = await axiosInstance.get<[{ id: number; name: string }]>(
    '/v1/verification/docs/types'
  );
  return res.data;
};

export const sendDoc = async (
  token: string,
  parameters: { link: string; type: number }
): Promise<boolean> => {
  const res = await axiosInstance.post<{ status: boolean }>('/v1/verification/docs', parameters, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  return res.data.status;
};

export const fetchUserDocs = async (token: string) => {
  const res = await axiosInstance.get<{ id: string; link: string; type: string }[]>(
    '/v1/verification/docs',
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(res);
  return res.data;
};

export const fetchPrivateFile = async (token: string, link: string) => {
  const res = await axiosInstanceStore.get(`/s3${link}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
};
