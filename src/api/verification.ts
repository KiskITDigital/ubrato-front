import { axiosInstance } from "@/utils"

export const isVerificated = async (token: string) => {
    const res = await axiosInstance.get("v1/auth/confirm-email", {
        headers: { authorization: `Bearer ${token}` }
    })
    console.log(res);
    return res
}

export const verify = async (token: string) => {
    const res = await axiosInstance.post(`v1/auth/confirm-email?token=${token}`)
    console.log(res);
    return res.data
}