import { axiosInstance } from "@/utils"

export const getCities = async (query: string) => {
    const res = await axiosInstance.get(`/v1/suggest/city?query=${query}`)
    // console.log(res);
    return res
}