import { axiosInstance } from '@/utils';

export interface orgInfoT {
  id: string;
  brand_name: string;
  full_name: string;
  short_name: string;
  inn: string;
  okpo: string;
  ogrn: string;
  kpp: string;
  tax_code: number;
  address: string;
  avatar: string;
  email: [
    {
      contact: string;
      info: string;
    }
  ];
  phone: [
    {
      contact: string;
      info: string;
    }
  ];
  messager: [
    {
      contact: string;
      info: string;
    }
  ];
  user_id: string;
  update_at: string;
  created_at: string;
}

export const fetchOrganizationInfo = async (token: string) => {
  const res = await axiosInstance.get<orgInfoT>('/v1/organizations/my', {
    headers: { authorization: `Bearer ${token}` },
  });
  console.log(res);
  return res.data;
};
