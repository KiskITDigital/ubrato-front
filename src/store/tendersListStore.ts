import { tenderList } from "@/types/app";
import { create } from "zustand";

interface tenderListState {
  // ======================
  // Основные состояния фильтров
  // ======================
  locationId: number | null;
  objectTypesId: number[];
  servicesTypesId: number[];
  fastFilterTexts: string[];
  userID: number | null;

  // ======================
  // Данные тендеров
  // ======================
  tenderList: tenderList[];
  tendersCount: number;

  // ======================
  // Названия для отображения
  // ======================
  selectedObjectNames: string[];
  selectedServiceNames: string[];

  // ======================
  // Дополнительные ID для фильтрации
  // ======================
  objectsIds: number[];
  objectTypesIds: number[];
  servicesIds: number[];
  servicesTypesIds: number[];

  // ======================
  // Методы для основных фильтров
  // ======================
  setTendersCount: (newTendersCount: number) => void;
  handleLocation: (newLocationId: number | null) => void;
  handleObjectTypesId: (newObjectTypesId: number[]) => void;
  handleServicesTypesId: (newServicesTypesId: number[]) => void;
  handleFastFilterTexts: (newFastFilterTexts: string[]) => void;
  handleUserID: (newUserID: number | null) => void;
  handleTenderList: (newExecutorList: tenderList[]) => void;

  // ======================
  // Методы для работы с названиями
  // ======================
  handleSelectedObjectNames: (names: string[]) => void;
  handleSelectedServiceNames: (names: string[]) => void;
  removeSelectedObjectName: (name: string) => void;
  removeSelectedServiceName: (name: string) => void;

  // ======================
  // Методы для работы с дополнительными ID
  // ======================
  handleObjectsIds: (ids: number[]) => void;
  handleObjectTypesIds: (ids: number[]) => void;
  handleServicesIds: (ids: number[]) => void;
  handleServicesTypesIds: (ids: number[]) => void;
}

export const useTenderListState = create<tenderListState>()((set) => ({
  // ======================
  // Начальные состояния
  // ======================
  locationId: null,
  objectTypesId: [],
  servicesTypesId: [],
  fastFilterTexts: [],
  userID: null,

  tenderList: [],
  tendersCount: 0,

  selectedObjectNames: [],
  selectedServiceNames: [],

  objectsIds: [],
  objectTypesIds: [],
  servicesIds: [],
  servicesTypesIds: [],

  // ======================
  // Реализации методов
  // ======================

  // Основные методы фильтрации
  setTendersCount: (newTendersCount) => {
    set((state) => ({ ...state, tendersCount: newTendersCount }));
  },
  handleLocation: (newLocationId) => {
    set((state) => ({ ...state, locationId: newLocationId }));
  },
  handleObjectTypesId: (newObjectTypesId) => {
    set((state) => ({ ...state, objectTypesId: newObjectTypesId }));
  },
  handleServicesTypesId: (newServicesTypesId) => {
    set((state) => ({ ...state, servicesTypesId: newServicesTypesId }));
  },
  handleFastFilterTexts: (newFastFilterTexts) => {
    set((state) => ({ ...state, fastFilterTexts: newFastFilterTexts }));
  },
  handleUserID: (newUserID) => {
    set((state) => ({ ...state, userID: newUserID }));
  },
  handleTenderList: (newTenderList) => {
    set((state) => ({ ...state, tenderList: newTenderList }));
  },

  // Методы для работы с названиями
  handleSelectedObjectNames: (names) => set({ selectedObjectNames: names }),
  handleSelectedServiceNames: (names) => set({ selectedServiceNames: names }),
  removeSelectedObjectName: (name) =>
    set((state) => ({
      selectedObjectNames: state.selectedObjectNames.filter((n) => n !== name),
    })),
  removeSelectedServiceName: (name) =>
    set((state) => ({
      selectedServiceNames: state.selectedServiceNames.filter(
        (n) => n !== name
      ),
    })),

  // Методы для работы с дополнительными ID
  handleObjectsIds: (newObjectsIds) => set({ objectsIds: newObjectsIds }),
  handleObjectTypesIds: (newObjectTypesIds) =>
    set({ objectTypesIds: newObjectTypesIds }),
  handleServicesIds: (newServicesIds) => set({ servicesIds: newServicesIds }),
  handleServicesTypesIds: (newServicesTypesIds) =>
    set({ servicesTypesIds: newServicesTypesIds }),
}));
