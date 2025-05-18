import { axiosInstance } from "@/utils";

export const deleteAccount = async (): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete("/v1/users/me/delete");
    return res.status === 200;
  } catch (error) {
    return false;
  }
};
