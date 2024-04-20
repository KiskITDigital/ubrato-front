import { refreshToken } from '@/utils';

export const updateToken: <T, C>(
  token: string | null,
  callback: (token: string, args: C) => Promise<T>,
  callbackArgs: C
) => Promise<T> = async (token, callback, callbackArgs) => {
  try {
    if (token) {
      const res = await callback(token, callbackArgs);
      return res;
    } else {
      throw 'no token';
    }
  } catch (e) {
    console.log(e);
    await refreshToken();
    const newToken = localStorage.getItem('token');
    const res = await callback(newToken!, callbackArgs);
    return res;
  }
};
