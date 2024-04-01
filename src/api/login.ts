import { axiosInstance } from '@/utils';

type parameters = {
  email: string;
  password: string;
};

export const login = async (parameters: parameters) => {
  const res = await axiosInstance.post(`/v1/auth/signin`, parameters);
  localStorage.setItem('token', res.data.access_token);
  console.log(res);
};
