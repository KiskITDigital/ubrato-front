import { axiosInstance } from '@/utils';

export const checkINN = async (inn: string) => {
  return axiosInstance.get(`/v1/suggest/company?query=${inn}`);
};
