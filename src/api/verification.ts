import { axiosInstance } from "@/utils";

export const askForVerification = async (token: string) => {
  const res = await axiosInstance.get("v1/auth/confirm-email", {
    headers: { authorization: `Bearer ${token}` },
  });
  return res;
};

export const verify = async (token: string) => {
  const res = await axiosInstance.post(`v1/auth/confirm-email?token=${token}`);
  return res.data;
};

export const verifyUser = async (token?: string) => {
  return await axiosInstance.post(
    "v1/users/me/verify",
    {},
    {
      headers: {
        authorization: `Bearer ${
          token ? token : localStorage.getItem("token")
        }`,
      },
    }
  );
};

export interface VerificationHistoryItem {
  id: string;
  verified: boolean;
  msg: string;
  verified_at: string;
  created_at: string;
}

/**
 * Получает историю верификаций пользователя
 *
 * Статусы верификации:
 * - verified=null, verified_at=null — не проверялся
 * - verified=true, verified_at="date" — успешно верифицирован, дата
 * - verified=false, verified_at="date" — верификация не пройдена, дата
 */
export const getVerificationHistory = async (
  token?: string
): Promise<VerificationHistoryItem[]> => {
  const res = await axiosInstance.get("v1/users/me/verification/history", {
    headers: {
      authorization: `Bearer ${token ? token : localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
