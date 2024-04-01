import { axiosInstance, axiosInstanceStore } from '@/utils/baseHttp';

type parameters = {
  file: File;
  private: boolean;
};

export const uploadAvatar = async (token: string, parameters: parameters): Promise<string> => {
  const res = await axiosInstanceStore.post('/s3/upload/', parameters, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data.path;
};

export const updateAvatar = async (token: string, link: string): Promise<void> => {
  const res = await axiosInstance.put(
    '/v1/users/me/avatar',
    { avatar: link },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  console.log(res);
};
