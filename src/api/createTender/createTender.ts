import { createTenderData } from "@/types/app"
import { axiosInstance } from "@/utils"

export const createTender = async (token: string, parameters: createTenderData, isDraft?: boolean) => {
    await axiosInstance.post(`/v1/tenders/${isDraft ? 'draft' : 'create'}`, parameters, {
        headers: { authorization: `Bearer ${token}` },
    });
}