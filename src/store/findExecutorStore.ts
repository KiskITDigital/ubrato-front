import { create } from "zustand";

interface findExecutor {
    locationId: number | null
    objectTypesId: number[]
    servicesTypesId: number[]

    handleLocation: (newLocationId: number | null) => void
    handleObjectTypesId: (newObjectTypesId: number[]) => void
    handleServicesTypesId: (newServicesTypesId: number[]) => void
}

export const useFindExecutorState = create<findExecutor>()((set) => ({
    locationId: null,
    objectTypesId: [],
    servicesTypesId: [],
    handleLocation: (newLocationId: number | null) => {
        set((state) => ({ ...state, locationId: newLocationId }))
    },
    handleObjectTypesId: (newObjectTypesId: number[]) => {
        set((state) => ({ ...state, objectTypesId: newObjectTypesId }))
    },
    handleServicesTypesId: (newServicesTypesId: number[]) => {
        set((state) => ({ ...state, servicesTypesId: newServicesTypesId }))
    }
}))