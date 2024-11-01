import { axiosInstance } from '@/utils';

export const checkINN = async (inn: string) => {
  const res = await axiosInstance.get(`/v1/suggest/company?query=${inn}`);
  return res.data[0].name as string;
};
