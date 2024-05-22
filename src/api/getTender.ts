// import axios from "axios";
import { axiosInstance } from "@/utils";


export const fetchProduct = async (id: string | undefined) => {
const res = await axiosInstance.get(
  `/v1/tenders/tender/${id}`
);
    if (res.data) {
        console.log('НЕГРЫ')
        console.log(res.data)
    return res.data;

  } else {
    return 'Неверный ИНН';
  }
};
  