import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import Typesense from "typesense";
import { executorList } from "@/types/app";
import { SearchResponseHit } from "typesense/lib/Typesense/Documents";
import {
    getExecutor,
    isFavoriteExecutor,
} from "@/api/index";

export const generateSearchClient = (limit: number = 10, parameters?: { filter_by?: string }) => {
    const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
        server: {
            apiKey: 'Lwiy87ndh1SKllepXzu4CBIApJeDcnbw',
            nodes: [
                {
                    host: 'search.ubrato.ru',
                    port: 443,
                    protocol: 'https',
                    path: ""
                }
            ]
        },
        additionalSearchParameters: {
            query_by: "name",
            limit: limit,
            ...parameters,
        },
    });

    return typesenseInstantsearchAdapter.searchClient
}

export const generateTypesenseClient = async (collection: string, parameters?: { per_page?: number, page?: number, filter_by?: string, sort_by?: "" | "name:asc" | "name:desc" | "created_at:asc" | "created_at:desc", include_fields?: string }) => {
    try {
        const client = new Typesense.Client({
            apiKey: "Lwiy87ndh1SKllepXzu4CBIApJeDcnbw",
            nodes: [
                {
                    host: "search.ubrato.ru",
                    port: 443,
                    protocol: "https",
                    path: ""
                },
            ],
        });

        const searchParameters = {
            q: "",
            query_by: "name",
            ...parameters,
        };

        const res = await client
            .collections(collection)
            .documents()
            .search(searchParameters)

        return res.hits || []
    } catch (e) {
        console.error("Typesense.Client error: ", e);
    }
}

export const getExecutorList = async (hits: SearchResponseHit<object>[] | undefined) => {
    const newExecutorList = [] as executorList[];
    const token = localStorage.getItem("token");

    const promises = (hits || [])
        .map((res, index) => {
            const { id } = res.document as { id: string };
            if (!id) return null;

            return (async () => {
                const data = await getExecutor(id);
                const isFavorite =
                    (!!token &&
                        (await isFavoriteExecutor(id, token))?.data?.status) ||
                    false;
                return {
                    index,
                    executorData: {
                        id: data.organizationInfo.id,
                        img: data.organizationInfo.avatar
                            ? `${data.organizationInfo.avatar?.replace("/files", "")}`
                            : "/avatar-ic.svg",
                        name: data.organizationInfo.short_name,
                        inn: data.organizationInfo.inn,
                        text: data.contractorInfo.description,
                        regions: data.contractorInfo.locations,
                        services: data.contractorInfo.services,
                        areServicesHidden: data.contractorInfo.services.length > 5,
                        isFavorite: isFavorite,
                        isTextHidden: true
                    },
                } as { index: number; executorData: executorList };
            })();
        })
        .filter((promise) => promise !== null);

    const results = await Promise.all(promises);

    results
        .sort((a, b) => a!.index - b!.index)
        .forEach((result) => {
            newExecutorList.push(result!.executorData);
        });

    return newExecutorList
}



// export const getTenderList = async (hits: SearchResponseHit<object>[] | undefined) => {
//     const newTenderList = [] as tenderList[];
//     const token = localStorage.getItem("token");

//     const promises = (hits || [])
//         .map((res, index) => {
//             const { id } = res.document as { id: string };
//             if (!id) return null;

//             return (async () => {
//                 const data = await fetchProduct(id);
//                 const isFavorite =
//                     (!!token &&
//                         (await isFavoriteTender(id, token))?.data?.status) ||
//                     false;
//                 return {
//                     index,
//                     tenderData: {
//                         id: data.id,
//                         name: data.name,
//                         reception_end: data.reception_end,
//                         work_start: data.work_start,
//                         work_end: data.work_end,
//                         price: data.price,
//                         user: data.user_id,
//                         is_favorite: isFavorite
//                       } as tenderData,
//                 } as { index: number; tenderData: tenderData };
//             })();
//         })
//         .filter((promise) => promise !== null);

//     const results = await Promise.all(promises);

//     results
//         .sort((a, b) => a!.index - b!.index)
//         .forEach((result) => {
//             newExecutorList.push(result!.executorData);
//         });

//     return newExecutorList
// }