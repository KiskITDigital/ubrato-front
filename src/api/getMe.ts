import { UserInfoT } from "@/types/app";
import { axiosInstance } from "@/utils";

export const getMe: (token: string) => Promise<UserInfoT> = async (token) => {
  const res = await axiosInstance.get(`/v1/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
