import { axiosInstance } from "@/utils"

export const isFavoriteExecutor = async (id: number, token: string) => {
    const res = await axiosInstance.get(`/v1/users/${id}/is_favorite`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    return res
}

export const addFavoriteExecutor = async (id: number, token: string) => {
    console.log(`/v1/users/${id}/add_favorite`);
    console.log(token);

    // const res = await axiosInstance.post(`/v1/users/${id}/add_favorite`,
    //     {},
    //     {
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //         },
    //     })
    // return res
}

export const removeFavoriteExecutor = async (id: number, token: string) => {
    const res = await axiosInstance.post(`/v1/users/${id}/remove_favorite`,
        {},
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
    return res
}