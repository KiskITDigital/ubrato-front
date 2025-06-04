import { axiosInstance } from "@/utils";

export const deleteAccount = async (
  token?: string | null
): Promise<boolean> => {
  try {
    const res = await axiosInstance.post(
      "/v1/users/me/delete",
      {},
      {
        headers: {
          authorization: `Bearer ${
            token ? token : localStorage.getItem("token")
          }`,
        },
      }
    );
    return res.status === 200;
  } catch (error) {
    return false;
  }
};
