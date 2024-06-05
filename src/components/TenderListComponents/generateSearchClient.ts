import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

export const generateSearchClient = (limit: number = 10, parameters?: { filter_by?: string }) => {
    const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
        server: {
            apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
            nodes: [
                {
                    host: `${import.meta.env.VITE_TYPESENSE_API_URI}`,
                    port: import.meta.env.VITE_TYPESENSE_API_PORT,
                    protocol: 'https',
                    path: "",
                }
            ]
        },
        additionalSearchParameters: {
            query_by: "name",
            limit: limit,
            ...parameters
        },
    });

    return typesenseInstantsearchAdapter.searchClient
}