import { create } from 'zustand';
import { UserInfoT } from '../types/app';
import { SERVER_URI } from '../utils/serverURI';
import axios, { AxiosError } from 'axios';
import { axiosInstance } from '../utils/baseHttp';
import { refreshToken } from '../utils/refreshToken';

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
          await refreshToken();
        }
        const newToken = localStorage.getItem('token');
        if (newToken) {
          const response = await axiosInstance.get(`/v1/users/me`, {
            headers: { authorization: `Bearer ${newToken}` },
          });
          console.log(response);
        }
      }
    } finally {
      set({ loading: false });
    }
  },
}));
