import { axiosInstance } from "@/utils";

export const checkINN = async (inn: string) => {
  const res = await axiosInstance.get(`/v1/suggest/company?query=${inn}`);
  console.log(!!res.data.length);
  if (res.data.length > 0) {
    return res.data[0].name as string;
  }
  return "";
};
