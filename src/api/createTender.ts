import { createTenderData } from "@/types/app"
import { axiosInstance } from "@/utils"

export const getCities = async (query: string) => {
    const res = await axiosInstance.get(`/v1/suggest/city?query=${query}`)
    // console.log(res);
    return res
}

export const createTender = async (token: string, parameters: createTenderData) => {
    const res = await axiosInstance.post(`/v1/tenders/create`, parameters, {
        headers: { authorization: `Bearer ${token}` },
    });
    console.log(res);
}