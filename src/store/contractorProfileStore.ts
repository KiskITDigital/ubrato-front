import { updateToken } from '@/api';
import { contractorProfileData, fetchContractorProfile } from '@/api/profileOrganization';
import { create } from 'zustand';

interface contractorProfileStoreT {
  profileData: contractorProfileData;
  fetchProfileData: () => Promise<void>;
}

export const useContractorProfileStore = create<contractorProfileStoreT>()((set) => ({
  profileData: {
    description: '',
    locations: [],
    services: [],
    objects: [],
    portfolio: [],
  },
  async fetchProfileData() {
    const res = await updateToken(fetchContractorProfile, null);
    set({ profileData: res });
  },
}));
