import { axiosInstance } from "@/utils";

export const confirmDeleteAccount = async (params: {
  code: string;
  email: string;
}): Promise<boolean> => {
  try {
    const res = await axiosInstance.post("v1/users/me/confirm-delete", params);
    return res.status === 200;
  } catch (error) {
    console.error("Account deletion error:", error);
    return false;
  }
};
