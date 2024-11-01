import { ExecutorProfileInfo, OrdererProfileInfo, Organization } from '@/types/app';
import { axiosInstance } from '@/utils';

export const getOrdererProfile = async (orgId: string): Promise<OrdererProfileInfo | undefined> => {
  try {
    const res = await axiosInstance.get(`/v1/organizations/profile/${orgId}/customer`);
    const generalInfo = await axiosInstance.get<Organization>(`/v1/organizations/profile/${orgId}`);
    return {
      org: generalInfo.data,
      orderer: res.data,
      isFavorite: false,
    };
  } catch (e) {
    console.log(e);
  }
};

export const getContractorProfile = async (orgId: string): Promise<ExecutorProfileInfo | null> => {
  try {
    const res = await axiosInstance.get(`/v1/organizations/profile/${orgId}/contractor`);
    const generalInfo = await axiosInstance.get<Organization>(`/v1/organizations/profile/${orgId}`);
    return {
      org: generalInfo.data,
      executor: res.data,
      isFavorite: false,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};
