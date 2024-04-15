import { create } from 'zustand';
import { UserInfoT } from '@/types/app';
import { AxiosError } from 'axios';
import { axiosInstance, refreshToken } from '@/utils';
import { surveyCheck } from '@/api';

interface UserInfoState {
  user: UserInfoT;
  fetchUser: (token: string) => Promise<void>;
  loading: boolean;
  error: null | string;
  isLoggedIn: boolean;
  setLoggedIn: (e: boolean) => void;
  passedSurvey: boolean;
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
    is_contractor: false,
    created_at: '',
    avatar: '',
    organization: {
      id: '',
      short_name: '',
      inn: '',
    },
  },
  passedSurvey: false,
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
      const surveyPass = await surveyCheck(token);
      set({
        passedSurvey: surveyPass,
        user: {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          middle_name: response.data.middle_name,
          id: response.data.id,
          created_at: response.data.created_at,
          phone: response.data.phone,
          is_contractor: response.data.is_contractor,
          verified: response.data.verified,
          email: response.data.email,
          avatar: response.data.avatar,
          organization: response.data.organiztion,
        },
        isLoggedIn: true,
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.status);
        if (e.response?.status === 401 || e.response?.status === 400) {
          await refreshToken();
          const newToken = localStorage.getItem('token');
          if (newToken) {
            const response = await axiosInstance.get(`/v1/users/me`, {
              headers: { authorization: `Bearer ${newToken}` },
            });
            console.log(response);
            const surveyPass = await surveyCheck(newToken);
            if (response.status === 200) {
              console.log(response.data);
              set({
                passedSurvey: surveyPass,
                user: {
                  first_name: response.data.first_name,
                  last_name: response.data.last_name,
                  middle_name: response.data.middle_name,
                  id: response.data.id,
                  created_at: response.data.created_at,
                  phone: response.data.phone,
                  is_contractor: response.data.is_contractor,
                  verified: response.data.verified,
                  email: response.data.email,
                  avatar: response.data.avatar,
                  organization: response.data.organiztion,
                },
                isLoggedIn: true,
              });
            }
          }
        }
      }
    } finally {
      set({ loading: false });
    }
  },
  isLoggedIn: false,
  setLoggedIn(e) {
    set({ isLoggedIn: e });
  },
}));
