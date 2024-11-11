import { axiosInstance } from "@/utils";

export const isFavoriteTender = async (token: string, id: string) => {
  const res = await axiosInstance.get<{ status: boolean }>(`/v1/tenders/tender/${id}/is_favorite`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data.status;
};

export const addFavouriteTender = async (token: string, id: string) => {
  const res = await axiosInstance.post(
    `/v1/tenders/tender/${id}/favorite`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const removeFavoriteTender = async (token: string, id: string) => {
  const res = await axiosInstance.delete(`/v1/tenders/tender/${id}/favorite`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getAllFavoriteTenders = async (token: string | null) => {
  const res = await axiosInstance.get("/v1/users/me/favorite_tenders", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};
