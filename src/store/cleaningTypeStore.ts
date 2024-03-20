import { create } from 'zustand';
import { CleaningTypeT } from '../types/app';
import axios from 'axios';
import { SERVER_URI } from '../utils/serverURI';

type cleaningTypeT = {
  id: number;
  name: string;
  types: [
    {
      id: number;
      name: string;
      count: number;
    }
  ];
};

type apiCleaningTypeT = cleaningTypeT[];

interface CleaningTypeState {
  types: CleaningTypeT[];
  handleActive: (ix: number) => void;
  apiCleaningTypes: apiCleaningTypeT;
  loading: boolean;
  error: null | string;
  fetchCleaningTypes: () => void;
}

export const useCleaningTypeStore = create<CleaningTypeState>()((set) => ({
  types: [
    {
      name: 'Генеральная уборка',
      count: 983,
      image: './general-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Регулярная уборка',
      count: 564,
      image: './regular-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Поддерживающая уборка',
      count: 100,
      image: './supporting-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Комплексная уборка',
      count: 928,
      image: './complex-cleaning.png',
      isActive: false,
      padding: 0,
    },
    {
      name: 'Уборка после ремонта',
      count: 764,
      image: './cleaning-after-renovation.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Уборка офиса',
      count: 121,
      image: './office-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Уборка ТЦ',
      count: 1306,
      image: './shop-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Уборка склада',
      count: 10,
      image: './warehouse-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Уборка территории',
      count: 10,
      image: './territory-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Вывоз строительного мусора',
      count: 10,
      image: './building-garbage-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Вывоз бытового мусора',
      count: 10,
      image: './everyday-garbage-cleaning.png',
      isActive: false,
      padding: 10,
    },
    {
      name: 'Зимняя уборка',
      count: 10,
      image: './snow-cleaning.png',
      isActive: false,
      padding: 10,
    },
  ],
  handleActive(ix) {
    set((state) => {
      let activeIx = -1;

      state.types.every((e, ixc) => {
        if (e.isActive) {
          activeIx = ixc;
          return false;
        }
        return true;
      });

      if (activeIx !== -1) {
        state.types[activeIx].isActive = false;
        state.types[ix].isActive = true;
      } else if (activeIx === ix) {
        state.types[ix].isActive = false;
      } else {
        state.types[ix].isActive = true;
      }

      return { types: state.types };
    });
  },
  apiCleaningTypes: [],
  error: null,
  loading: false,
  fetchCleaningTypes: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${SERVER_URI}/v1/tenders/services-types`);
      if (response.status !== 200) throw response;
      console.log(response);
      set((state) => {
        state.apiCleaningTypes = response.data.groups;
        return { apiCleaningTypes: state.apiCleaningTypes };
      });
      set((state) => {
        state.types.forEach((e) => {
          state.apiCleaningTypes.forEach((o) => {
            o.types.forEach((j) => {
              if (j.name === e.name) {
                e.count = j.count;
              }
            });
          });
        });
        return { types: state.types };
      });
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
