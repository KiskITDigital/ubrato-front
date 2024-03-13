import { create } from 'zustand';
import { CleaningTypeT } from '../types/app';

interface CleaningTypeState {
  types: CleaningTypeT[];
  handleActive: (ix: number) => void;
}

export const useCleaningTypeStore = create<CleaningTypeState>()((set) => ({
  types: [
    {
      name: 'Генеральная уборка',
      count: 983,
      image: './general-cleaning.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Регулярная уборка',
      count: 564,
      image: './regular-cleaning.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Поддерживающая уборка',
      count: 100,
      image: './supporting-cleaning.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Комплексная уборка',
      count: 928,
      image: './complex-cleaning.png',
      isActive: false,
      padding: 0
    },
    {
      name: 'Уборка после ремонта',
      count: 764,
      image: './cleaning-after-renovation.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Уборка офиса',
      count: 121,
      image: './office-cleaning.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Уборка ТЦ',
      count: 1306,
      image: './shop-cleaning.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Уборка склада',
      count: 10,
      image: './warehouse-cleaning.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Уборка территории',
      count: 10,
      image: './territory-cleaning.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Вывоз строительного мусора',
      count: 10,
      image: './building-garbage-cleaning.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Вывоз бытового мусора',
      count: 10,
      image: './everyday-garbage-cleaning.png',
      isActive: false,
      padding: 10
    },
    {
      name: 'Зимняя уборка',
      count: 10,
      image: './snow-cleaning.png',
      isActive: false,
      padding: 10
    },
  ],
  handleActive(ix) {
    set((state) => {
      state.types[ix].isActive = !state.types[ix].isActive;
      return { types: state.types };
    });
  },
}));
