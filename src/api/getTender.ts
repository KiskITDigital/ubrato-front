import { axiosInstance } from "@/utils";


export const fetchProduct = async (id: string | undefined) => {
  const res = await axiosInstance.get(
    `/v1/tenders/tender/${id}`
  );
  if (res.data) {
    return res.data;
  } else {
    return 'ошибочка вышла(';
  }
};

export const fetchDrafts = async (token: string | null,) => {
  const res = await axiosInstance.get(
    `/v1/tenders/draft`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
      