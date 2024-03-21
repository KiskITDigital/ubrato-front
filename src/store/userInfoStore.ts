import { create } from 'zustand';
import { UserInfoT } from '../types/app';
import { SERVER_URI } from '../utils/serverURI';
import axios, { AxiosError } from 'axios';
axios.defaults.withCredentials = true;

interface UserInfoState {
  user: UserInfoT;
  fetchUser: (token: string) => void;
  loading: boolean;
  error: null | string;
}

export const useUserInfoStore = create<UserInfoState>()((set) => ({
  user: {
    id: '',
    email: '',
    phone: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    verified: false,
    role: -1,
    created_at: '',
  },
  loading: false,
  error: null,
  fetchUser: async (token) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${SERVER_URI}/v1/users/me`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) throw response;
      console.log(response);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.status);
        if (e.response?.status === 401) {
          const resp2 = await axios.get(`${SERVER_URI}/v1/auth/refresh`);
          console.log(1);
          console.log(resp2);
        }
      }
    } finally {
      set({ loading: false });
    }
  },
}));
