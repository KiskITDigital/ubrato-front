import { axiosInstance } from '@/utils';

export interface CompanyResponse {
  company_id: string;
  company_name: string;
  company_avatar: string;
  price: number;
  response_at: string;
}

export const getResponses = async (token: string, id: string) => {
  const res = await axiosInstance.get<CompanyResponse[]>(`/v1/tenders/my/tenders/${id}/responses`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
