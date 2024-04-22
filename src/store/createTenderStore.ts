import { City } from "@/types/app";
import axios from "axios";
import { create } from "zustand";

interface createTenderState {
    errors: string[]

    name: string
    price: string
    is_contract_price: boolean
    floor_space: string
    description: string
    wishes: string
    attachments: string[]
    services_groups: number[]
    services_types: number[]

    city: string

    is_NDS: boolean

    objectName: string
    objectCategory: string[]

    services: { id: number, name: string, total: number, types: { id: number, name: string, count: number }[] }[]

    reception_start: string
    reception_time_start: string
    reception_end: string
    reception_time_end: string

    work_start: string
    work_end: string
    city_id: number
    object_group_id: number
    object_type_id: number
    handleSimpleInput: (whatToChange: 'name' | 'reception_time_start' | 'reception_time_end' | 'price' | 'is_contract_price' | 'is_NDS' | 'description' | 'wishes' | 'floor_space' | 'objectName' | 'objectCategory' | 'city', newVal: string | boolean, mask?: (value: string) => string) => void
    addObject: (newObjectName: string, newObjectTypes: string[]) => void
    changeService: (serviceToChangeId: number, newServiceName: string, newServiceTypes: string[]) => void
    removeObjectType: (typeInd: number) => void
    addService: (newServiceName: string, newServiceTypes: string[]) => void
    removeService: (id: number) => void
    removeServiceType: (serviceId: number, typeId: number) => void

    cities: City[]
    getCities: (query: string) => void

    addError: (newError: string) => void
    removeError: (errorToRemove: string) => void

    validateInputs: () => void
}

export const useCreateTenderState = create<createTenderState>()((set) => ({
    errors: [],

    "name": "",
    "price": "",
    "is_contract_price": false,
    "floor_space": "",
    "description": "",
    "wishes": "",
    "attachments": [],
    "services_groups": [],
    "services_types": [],

    is_NDS: true,

    city: '',

    // objects: [
    //     {
    //         id: 1,
    //         name: " ",
    //         objectList: [

    //         ]
    //     }
    // ],
    objectName: "",
    objectCategory: [],

    services: [],

    cities: [],

    "reception_start": "",
    "reception_time_start": "",
    "reception_end": "",
    "reception_time_end": "",

    "work_start": "",
    "work_end": "",
    "city_id": 0,
    "object_group_id": 0,
    "object_type_id": 0,
    handleSimpleInput: (whatToChange: 'name' | 'reception_time_start' | 'reception_time_end' | 'price' | 'is_contract_price' | 'is_NDS' | 'description' | 'wishes' | 'floor_space' | 'objectName' | 'objectCategory' | 'city', newVal: string | boolean, mask?: (value: string) => string) => {
        set((state) => ({ ...state, [whatToChange]: (mask && typeof newVal === 'string') ? mask(newVal) : newVal }))
    },
    addObject: (newObjectName: string, newObjectTypes: string[]) => {
        set((state) => ({ ...state, objectName: newObjectName, objectCategory: newObjectTypes }))
        set((state) => ({ ...state, errors: state.errors.filter(error => error !== 'object') }))
    },
    removeObjectType: (typeInd: number) => {
        set((state) => ({ ...state, objectCategory: state.objectCategory.filter((_, ind) => ind !== typeInd) }))
    },
    addService: (newServiceName: string, newServiceTypes: string[]) => {
        set((state) => ({ ...state, services: [...state.services, { id: Date.now(), name: newServiceName, total: 0, types: newServiceTypes.map((type, ind) => ({ id: Date.now() + ind, name: type, count: 0 })) }] }))
        set((state) => ({ ...state, errors: state.errors.filter(error => error !== 'services') }))
    },
    removeService: (id: number) => {
        set((state) => ({ ...state, services: state.services.filter(service => service.id !== id) }))
    },
    changeService: (serviceToChangeId: number, newServiceName: string, newServiceTypes: string[]) => {
        set((state) => ({ ...state, services: state.services.map(service => service.id === serviceToChangeId ? { id: Date.now(), name: newServiceName, total: 0, types: newServiceTypes.map((type, ind) => ({ id: Date.now() + ind, name: type, count: 0 })) } : service) }))
    },
    removeServiceType: (serviceId: number, typeId: number) => {
        set((state) => {
            const serviceToFind = state.services.find((service: { id: number, name: string, total: number, types: { id: number, name: string, count: number }[] }) => service.id === serviceId)
            if (serviceToFind!.types.length <= 1) {
                // return state.removeService(serviceId)
                // return state
                const newState = state
                newState.services = newState.services.filter(service => service.id !== serviceId)
                // console.log(newState)
                return { ...state, services: newState.services }
            } else {
                return { ...state, services: state.services.map(service => service.id === serviceId ? { ...service, types: service.types.filter(type => type.id !== typeId) } : service) }
            }
        })

        // set((state) => ({ ...state, services: state.services.map(service => service.id === serviceId ? service.types.length <= 1 ?  : { ...service, types: service.types.filter(type => type.id !== typeId) } : service) }))
        // const serviceToFind = this?.services.find((service: { id: number, name: string, total: number, types: { id: number, name: string, count: number }[] }) => service.id === serviceId)
        // if (serviceToFind.types.length <= 1) {
        //     this?.removeService(serviceId)
        // } else {
        //     set((state) => ({ ...state, services: state.services.map(service => service.id === serviceId ? { ...service, types: service.types.filter(type => type.id !== typeId) } : service) }))
        // }
    },

    getCities: async (query: string) => {
        // console.log(query);
        const newSities = query ? (await axios.get(`https://api.ubrato.ru/v1/suggest/city?query=${query}`)).data : []
        console.log(newSities);

        set((state) => ({ ...state, cities: newSities }))
    },

    addError: (newError: string) => {
        set((state) => ({ ...state, errors: [...state.errors, newError] }))
    },

    removeError: (errorToRemove: string) => {
        set((state) => ({ ...state, errors: [...state.errors.filter(error => error !== errorToRemove)] }))
    },

    validateInputs: () => {
        set((state) => {
            const newErrors: string[] = []
            if (!state.name) newErrors.push('name')
            if (!state.price) newErrors.push('price')
            if (!state.city) newErrors.push('city')
            if (!state.floor_space) newErrors.push('floor_space')
            if (!state.description) newErrors.push('description')
            if (!state.wishes) newErrors.push('wishes')
            if (!state.objectName) newErrors.push('object')
            if (!state.services.length) newErrors.push('services')
            if (!state.attachments.length) newErrors.push('attachments')
            return { ...state, errors: [...newErrors] }
        })
    }
}));
