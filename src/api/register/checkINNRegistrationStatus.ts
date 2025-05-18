import { axiosInstance } from "@/utils";
import { AxiosError } from "axios";

/**
 * Проверяет, зарегистрирован ли ИНН в системе
 * @param inn ИНН для проверки
 * @returns Promise<boolean> - true если ИНН уже зарегистрирован, false если свободен
 * @throws AxiosError - при ошибках сети или сервера (кроме 404)
 */
export const checkINNRegistrationStatus = async (
  inn: string
): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(
      `/v1/suggest/check-inn?inn=${encodeURIComponent(inn)}`
    );
    return response.status === 200;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return false;
    }
    throw error;
  }
};
