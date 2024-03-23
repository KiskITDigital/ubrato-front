import { create } from 'zustand';
import { UserInfoT } from '../types/app';
import { AxiosError } from 'axios';
import { axiosInstance } from '../utils/baseHttp';
import { refreshToken } from '../utils/refreshToken';

interface UserInfoState {
  user: UserInfoT;
  fetchUser: (token: string) => void;
  loading: boolean;
  error: null | string;
  isLoggedIn: boolean;
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
      const response = await axiosInstance.get(`/v1/users/me`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) throw response;
      console.log(response.data);
      set({
        user: {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          middle_name: response.data.middle_name,
          id: response.data.id,
          created_at: response.data.created_at,
          phone: response.data.phone,
          role: response.data.role,
          verified: response.data.verified,
          email: response.data.email,
        },
        isLoggedIn: true,
      });
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
          if (response.status === 200) {
            console.log(response.data);
            // set()
          }
        }
      }
    } finally {
      set({ loading: false });
    }
  },
  isLoggedIn: false,
}));
