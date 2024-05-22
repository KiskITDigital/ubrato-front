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

export const fetchOrdererProfile = async (token: string) => {
  const res = await axiosInstance.get<{
    description: string;
    locations: { id: number; name: string }[];
  }>('/v1/organizations/my/profile/customer', {
    headers: { authorization: `Bearer ${token}` },
  });
  console.log(res.data);
  return res.data;
};

export const putOrdererProfile = async (
  token: string,
  params: { description: string; locations: number[] }
) => {
  const res = await axiosInstance.put('/v1/organizations/my/profile/customer', params, {
    headers: { authorization: `Bearer ${token}` },
  });
  console.log(res);
};

export const putBrandData = async (token: string, params: { name: string; avatar: string }) => {
  await axiosInstance.put('/v1/organizations/my/profile/brand', params, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export interface contacntsT {
  emails: {
    contact: string;
    info: string;
  }[];
  phones: {
    contact: string;
    info: string;
  }[];
  messengers: {
    contact: string;
    info: string;
  }[];
}

export const putBrandContacts = async (token: string, params: contacntsT) => {
  const res = await axiosInstance.put('/v1/organizations/my/profile/brand/contacts', params, {
    headers: { authorization: `Bearer ${token}` },
  });
  console.log(res);
};
