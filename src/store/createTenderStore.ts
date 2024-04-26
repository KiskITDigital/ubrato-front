import { getCities } from "@/api/createTender";
import { City } from "@/types/app";
// import { AxiosPromise } from "axios";
// import axios from "axios";
import { ChangeEvent } from "react";
import { create } from "zustand";

interface createTenderState {
    errors: string[]

    name: string
    price: string
    is_contract_price: boolean
    floor_space: string
    description: string
    wishes: string
    attachments: { id: number; data: string | ArrayBuffer; text: string; isChanging: boolean; fileType: string; fileSize: number }[]
    services_groups: number[]


    objects_types: { id: number, name: string }[]
    services_types: number[]

    city: string

    is_NDS: boolean

    objectName: string
    objectCategory: string[]


    services: { id: number, name: string, total: number, types: { id: number, name: string, count: number }[] }[]

    reception_start: Date
    reception_time_start: string
    reception_end: Date
    reception_time_end: string

    work_start: Date
    work_end: Date
    city_id: number
    object_group_id: number
    object_type_id: number

    handleSimpleInput: (whatToChange: 'name' | 'reception_time_start' | 'reception_time_end' | 'price' | 'is_contract_price' | 'is_NDS' | 'description' | 'wishes' | 'floor_space' | 'objectName' | 'objectCategory' | 'city' | 'reception_start' | 'reception_end' | 'work_start' | 'work_end', newVal: string | boolean | Date, mask?: (value: string) => string) => void
    addObject: (newObjectName: string, newObjectTypes: string[]) => void
    // addObject: (newObjectName: string, newObjectTypes: { id: number, name: string }) => void
    changeService: (serviceToChangeId: number, newServiceName: string, newServiceTypes: string[]) => void
    removeObjectType: (typeInd: number) => void
    addService: (newServiceName: string, newServiceTypes: string[]) => void
    removeService: (id: number) => void
    removeServiceType: (serviceId: number, typeId: number) => void

    cities: City[]
    getCities: (query: string) => void

    addError: (newError: string) => void
    removeError: (errorToRemove: string) => void

    validateInputs: () => boolean

    // changeAttachmentText: (id: )
    // React.ChangeEvent<HTMLInputElement>
    handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void
    changeAttachmentText: (id: number, text: string) => void
    changeAttachmentIsChanging: (id: number) => void
    removeAttachment: (id: number) => void
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

    "objects_types": [],
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

    "reception_start": new Date(),
    "reception_time_start": "",
    "reception_end": new Date(),
    "reception_time_end": "",

    "work_start": new Date(),
    "work_end": new Date(),
    "city_id": 0,
    "object_group_id": 0,
    "object_type_id": 0,
    handleSimpleInput: (whatToChange: 'name' | 'reception_time_start' | 'reception_time_end' | 'price' | 'is_contract_price' | 'is_NDS' | 'description' | 'wishes' | 'floor_space' | 'objectName' | 'objectCategory' | 'city' | 'reception_start' | 'reception_end' | 'work_start' | 'work_end', newVal: string | boolean | Date, mask?: (value: string) => string) => {
        set((state) => ({ ...state, [whatToChange]: (mask && typeof newVal === 'string') ? mask(newVal) : newVal }))
    },
    // addObject: (newObjectName: string, newObjectTypes: { id: number, name: string }) => {
    //     set(())
    // }
    addObject: (newObjectName: string, newObjectTypes: string[]) => {
        // console.log(new_objects_types);
        set((state) => ({ ...state, objectName: newObjectName, objectCategory: newObjectTypes }))
        // set((state) => ({ ...state, errors: state.errors.filter(error => error !== 'object') }))
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
        // const newSities = query ? (await axios.get(`https://api.ubrato.ru/v1/suggest/city?query=${query}`)).data : []
        const newSities = query ? await getCities(query) : []
        // console.log(newSities.data);

        set((state) => ({ ...state, cities: newSities.data ?? [] }))
    },

    addError: (newError: string) => {
        set((state) => ({ ...state, errors: [...state.errors, newError] }))
    },

    removeError: (errorToRemove: string) => {
        set((state) => ({ ...state, errors: [...state.errors.filter(error => error !== errorToRemove)] }))
    },

    handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const reader = new FileReader();
        const file = files![files!.length - 1];
        console.log(file.size);

        let newFile: { id: number; data: string | ArrayBuffer; text: string; isChanging: boolean; fileType: string; fileSize: number } | undefined;
        reader.onload = (e) => {
            try {
                const fileType = file.type.split('/')[0];
                if (fileType === 'image' || file.type === 'application/pdf' || file.type === 'text/xml') {
                    newFile = { id: Date.now(), data: e.target!.result!, text: '', isChanging: true, fileType, fileSize: file.size }
                }
                set((state) => ({ ...state, attachments: [...state.attachments, newFile!], errors: state.errors.filter(error => error !== 'attachments') }))
            } catch (err) {
                console.error(err);
            }
        }
        reader.readAsDataURL(file);
    },

    validateInputs: () => {
        const newErrors: string[] = []
        set((state) => {
            if (!state.name) newErrors.push('name')
            if (!state.price) newErrors.push('price')
            if (!state.city) newErrors.push('city')
            if (!state.floor_space) newErrors.push('floor_space')
            if (!state.description) newErrors.push('description')
            if (!state.wishes) newErrors.push('wishes')
            if (!state.objectName) newErrors.push('object')
            if (!state.services.length) newErrors.push('services')
            if (!state.attachments.length) newErrors.push('attachments')

            // if (!newErrors.length) {
            //     const objectToSend = {
            //         name: state.name,
            //         price: +state.price,


            //         is_contract_price: state.is_contract_price,
            //         is_NDS: state.is_NDS,

            //         floor_space: +state.floor_space,

            //         wishes: state.wishes,
            //         description: state.description,

            //         reception_start: state.reception_start.toISOString(),
            //         reception_end: state.reception_end.toISOString(),
            //         reception_time_start: state.reception_time_start,
            //         reception_time_end: state.reception_time_end,
            //         work_start: state.work_start.toISOString(),
            //         work_end: state.work_end.toISOString(),


            //         // object: { objectName: state.objectName, objectCategory: state.objectCategory },
            //         objectName: state.objectName,
            //         objectCategory: state.objectCategory,
            //         services: state.services.map(service => ({ id: service.id, name: service.name, types: service.types.map(type => type.name) })),


            //         attachments: state.attachments,

            //         city: state.city
            //         // services_groups: state.services_groups,
            //         // services_types: state.services_types,

            //         // city_id: state.city_id,
            //         // object_group_id: state.object_group_id,
            //         // object_type_id: state.object_type_id,
            //     }
            //     console.log(objectToSend);

            // }

            return { ...state, errors: [...newErrors] }
        })
        return !!newErrors.length
    },

    changeAttachmentText: (id: number, newText: string) => {
        set((state) => ({ ...state, attachments: state.attachments.map(attachment => attachment.id === id ? { ...attachment, text: newText } : attachment) }))
    },
    changeAttachmentIsChanging: (id: number) => {
        set((state) => ({ ...state, attachments: state.attachments.map(attachment => attachment.id === id ? { ...attachment, isChanging: !attachment.isChanging } : attachment) }))
    },
    removeAttachment: (id: number) => {
        set((state) => ({ ...state, attachments: state.attachments.filter(attachment => attachment.id !== id) }))
    }
}));
