import { axiosInstance } from '@/utils';

export const isResponded = async (token: string | null, id: number) => {
  const res = await axiosInstance.get(
    `/v1/tenders/tender/${id}/is_responded`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
//   console.log(res.data);
  
  return res.data;
};




// export const fetchProduct = async (id: string | undefined) => {
//     const res = await axiosInstance.get(
//       `/v1/tenders/tender/${id}`
//     );
//         if (res.data) {
//             console.log(res.data)
//         return res.data;
//       } else {
//         return 'ошибочка вышла(';
//       }
//     };
      