import { axiosInstance, axiosInstanceStore } from '@/utils/baseHttp';

type parameters = {
  file: File;
  private: boolean;
};

export const uploadFile = async (token: string, parameters: parameters): Promise<string> => {
  const res = await axiosInstanceStore.post('/s3/upload/', parameters, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data.path;
};


export const downloadFile = async (token: string, link: string) => {
  const res = await axiosInstanceStore.get(`/s3/private/${link}`,
   {
      responseType: 'blob',
      headers: { 
        authorization: `Bearer ${token}`,
      },
    }
  )
  .then((response) => {
    const blob = new Blob([response.data], { type: response.headers['content-type']});
    const url = window.URL.createObjectURL(blob);
    const a: HTMLAnchorElement  = document.createElement('a');
    a.href = url;
    a.download = link.split('/').pop() ?? '';
    a.click();
    console.log(response.data);
    
  })
  console.log(res);
  
};


export const updateAvatar = async (token: string, link: string): Promise<void> => {
  const res = await axiosInstance.put(
    '/v1/users/me/avatar',
    { avatar: link },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  console.log(res);
};



