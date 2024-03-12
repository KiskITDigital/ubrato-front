import { create } from 'zustand';
import { ObjectInfoT } from '../types/app';

interface CountState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

interface ObjectsState {
  objects: ObjectInfoT[];
  handleActive: (ix: number) => void;
}

export const useStore = create<CountState>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));

export const useTypesObjectsStore = create<ObjectsState>()((set) => ({
  objects: [
    {
      name: 'Офисные',
      count: 983,
      image: './office.svg',
      isActive: false,
    },
    {
      name: 'Производственные',
      count: 564,
      image: './factory.svg',
      isActive: false,
    },
    {
      name: 'Складские',
      count: 100,
      image: './warehouse.svg',
      isActive: false,
    },
    {
      name: 'Торговые',
      count: 928,
      image: './commercial.svg',
      isActive: false,
    },
    {
      name: 'Территория',
      count: 764,
      image: './territory.svg',
      isActive: false,
    },
    {
      name: 'Объекты здравоохранения',
      count: 121,
      image: './health.svg',
      isActive: false,
    },
    {
      name: 'Жилые',
      count: 1306,
      image: './housing.svg',
      isActive: false,
    },
    {
      name: 'Природные объекты',
      count: 10,
      image: './nature.svg',
      isActive: false,
    },
  ],
  handleActive(ix) {
    set((state) => {
      state.objects[ix].isActive = !state.objects[ix].isActive;
      return { objects: state.objects };
    });
  },
}));
//Базовый пример глобального хранилища, в будующем нужно будет для авторизации и т.д.
