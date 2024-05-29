import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

export const generateSearchClient = (limit: number = 10) => {
    const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
        server: {
            apiKey: 'Ii388RgSrBidU2XYjSDNElyzDfrZyMnM',
            nodes: [
                {
                    host: 'search.ubrato.ru',
                    port: 443,
                    protocol: 'https',
                    path: "",
                    // tls:true
                }
            ]
        },
        additionalSearchParameters: {
            query_by: "name",
            limit: limit,
            // sort_by: 'price:asc',
        },
    });

    return typesenseInstantsearchAdapter.searchClient
}