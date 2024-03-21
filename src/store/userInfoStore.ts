import { create } from 'zustand';
import { UserInfoT } from '../types/app';
import { SERVER_URI } from '../utils/serverURI';
import axios from 'axios';

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
      // const response = await axios.post(
      //   `${SERVER_URI}/v1/users/me`,
      //   {},
      //   { headers: { authorization: token } }
      // );
      // if (response.status !== 200) throw response;
      // console.log(response);
      console.log(token);
    } catch (e) {
      console.log(e);
      // let error = e
      // // custom error
      // if (e.status === 400) {
      //   error = await e.json()
      // }
      // set({ error })
    } finally {
      set({ loading: false });
    }
  },
}));
