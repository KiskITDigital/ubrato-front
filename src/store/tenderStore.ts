import { fetchProduct, updateToken } from '@/api';
import { isResponded } from '@/api/isResponded';
import { Category } from '@/components/OneTenderComponentsWrappedVIew/OneTenderInfoViewExecutor/OneTenderInfoViewExecutor';
import { create } from 'zustand';

export interface dataObjectTypes {
  id: number;
  name: string;
  active: boolean;
  price: number;
  object_group: string;
  objects_types: string[];
  location: string;
  floor_space: number;
  categories: Category[];
  description: string;
  wishes: string;
  attachments: string[];
  reception_start: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  created_at: string;
  is_nds_price: boolean;
  is_contract_price: boolean;
  user_id: string;
}

interface TenderState {
  tenderInfo: dataObjectTypes;
  fetchTenderInfo: (id: string) => Promise<void>;
  isResponded: boolean;
  loading: boolean;
  error: null | string;
  setResponded: (responded: boolean) => void;
}

export const useTenderInfoStore = create<TenderState>()((set) => {
  return {
    tenderInfo: {
      id: 0,
      name: '',
      active: false,
      price: 0,
      object_group: '',
      objects_types: [],
      location: '',
      floor_space: 0,
      categories: [],
      description: '',
      wishes: '',
      attachments: [],
      reception_start: '',
      reception_end: '',
      work_start: '',
      work_end: '',
      created_at: '',
      is_nds_price: false,
      is_contract_price: false,
      user_id: '',
    },
    fetchTenderInfo: async (id) => {
      set({ loading: true });
      const responded = await updateToken(isResponded, id);
      const data = await fetchProduct(id);
      if (data) {
        set({ loading: false, tenderInfo: data });
        set({ isResponded: responded.status });
        // console.log(data);
      } else {
        // console.log('proizoshla oshibka');
      }
    },
    isResponded: false,
    loading: true,
    error: null,
    setResponded: (responded) => {
      set({ isResponded: responded });
    },
  };
});
