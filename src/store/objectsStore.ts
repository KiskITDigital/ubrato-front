import { create } from 'zustand';
import { ObjectInfoT } from '../types/app';

interface ObjectsState {
  objects: ObjectInfoT[];
  handleActive: (ix: number) => void;
}

export const useTypesObjectsStore = create<ObjectsState>()((set) => ({
  objects: [
    {
      name: 'Офисная недвижимость',
      count: 983,
      image: './office.svg',
      isActive: false,
    },
    {
      name: 'Производственныая недвижимость',
      count: 564,
      image: './factory.svg',
      isActive: false,
    },
    {
      name: 'Складскиая недвижимость',
      count: 100,
      image: './warehouse.svg',
      isActive: false,
    },
    {
      name: 'Торговая недвижимость',
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
      name: 'Объект здравоохранения',
      count: 121,
      image: './health.svg',
      isActive: false,
    },
    {
      name: 'Жилая недвижимость',
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
    {
      name: 'HoReCo',
      count: 10,
      image: './horeco.svg',
      isActive: false,
    },
    {
      name: 'Объекты культурного наследия',
      count: 10,
      image: './culture.svg',
      isActive: false,
    },
    {
      name: 'Спортивно-оздаровительные объекты',
      count: 10,
      image: './sport.svg',
      isActive: false,
    },
    {
      name: 'Транспорт',
      count: 10,
      image: './transport.svg',
      isActive: false,
    },
    {
      name: 'Транспортная инфраструктура',
      count: 10,
      image: './transport-inf.svg',
      isActive: false,
    },
    {
      name: 'Объекты образования',
      count: 10,
      image: './education.svg',
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
