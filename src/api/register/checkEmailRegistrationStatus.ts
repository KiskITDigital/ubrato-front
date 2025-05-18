import { axiosInstance } from "@/utils";
import { AxiosError } from "axios";

export const checkEmailRegistrationStatus = async (
  email: string
): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(
      `/v1/users/check-email?email=${encodeURIComponent(email)}`
    );
    return response.status === 200;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return false;
    }
    throw error;
  }
};
