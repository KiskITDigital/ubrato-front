import { axiosInstance } from '@/utils';

export const changePersonalData = async (
  token: string,
  parameters: { firstName: string; middleName: string; lastName: string; phone: string }
) => {
  await axiosInstance.put(
    '/v1/users/me/info',
    {
      first_name: parameters.firstName,
      middle_name: parameters.middleName,
      last_name: parameters.lastName,
      phone: parameters.phone,
    },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
};
