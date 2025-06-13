import { tenderList } from "@/types/app";
import { create } from "zustand";

interface tenderListState {
  locationId: number | null;
  objectTypesId: number[];
  servicesTypesId: number[];
  fastFilterTexts: string[];
  userID: number | null;

  tenderList: tenderList[];
  tendersCount: number;

  // Новые поля для названий
  selectedObjectNames: string[];
  selectedServiceNames: string[];

  // Методы для обновления состояний
  setTendersCount: (newTendersCount: number) => void;
  handleLocation: (newLocationId: number | null) => void;
  handleObjectTypesId: (newObjectTypesId: number[]) => void;
  handleServicesTypesId: (newServicesTypesId: number[]) => void;
  handleFastFilterTexts: (newFastFilterTexts: string[]) => void;
  handleUserID: (newUserID: number | null) => void;
  handleTenderList: (newExecutorList: tenderList[]) => void;

  // Методы для работы с названиями
  handleSelectedObjectNames: (names: string[]) => void;
  handleSelectedServiceNames: (names: string[]) => void;

  // Новые методы для удаления отдельных названий
  removeSelectedObjectName: (name: string) => void;
  removeSelectedServiceName: (name: string) => void;
}

export const useTenderListState = create<tenderListState>()((set) => ({
  locationId: null,
  objectTypesId: [],
  servicesTypesId: [],
  fastFilterTexts: [],
  userID: null,

  tenderList: [],
  tendersCount: 0,

  selectedObjectNames: [],
  selectedServiceNames: [],

  setTendersCount: (newTendersCount) => {
    set((state) => ({ ...state, tendersCount: newTendersCount }));
  },
  handleLocation: (newLocationId: number | null) => {
    set((state) => ({ ...state, locationId: newLocationId }));
  },
  handleObjectTypesId: (newObjectTypesId: number[]) => {
    set((state) => ({ ...state, objectTypesId: newObjectTypesId }));
  },
  handleServicesTypesId: (newServicesTypesId: number[]) => {
    set((state) => ({ ...state, servicesTypesId: newServicesTypesId }));
  },
  handleFastFilterTexts: (newFastFilterTexts: string[]) => {
    set((state) => ({ ...state, fastFilterTexts: newFastFilterTexts }));
  },
  handleUserID: (newUserID: number | null) => {
    set((state) => ({ ...state, userID: newUserID }));
  },
  handleTenderList: (newTenderList: tenderList[]) => {
    set((state) => ({ ...state, tenderList: newTenderList }));
  },

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
}));
