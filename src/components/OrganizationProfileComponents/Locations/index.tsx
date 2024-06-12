import { FC, useEffect, useState } from 'react';
import styles from './locations.module.css'
import { Location } from '@/types/app';
import { generateTypesenseClient } from '@/components/FindExecutorComponents/generateSearchclient';

interface Region {
    id: string
    name: string
}

interface City {
    id: string
    name: string
    region_id: string
    region_index: Region
}

const Locations: FC<{ status: 'executor' | 'orderer', loactions: Location[] }> = ({ status, loactions }) => {
    const [modifiedLocations, setModifiedLocations] = useState<[string, City[]][]>([]);
    function groupBy<T>(iterable: Iterable<T>, fn: (item: T) => string | number) {
        return [...iterable].reduce<Record<string, T[]>>((groups, curr) => {
            const key = fn(curr);
            const group = groups[key] ?? [];
            group.push(curr);
            return { ...groups, [key]: group };
        }, {});
    }
    useEffect(() => {
        (async () => {
            const cityFilters = loactions.reduce((acc, el) => acc + el.id + ', ', '')
            const cities = await generateTypesenseClient("city_index", { filter_by: `id:[${cityFilters}]`, include_fields: "$region_index(id, name)" })
            // console.log(Object.groupBy(cities?.map(el => el.document), ({ region_index }) => region_index.name));
            if (cities) setModifiedLocations(Object.entries(groupBy(cities.map(el => el.document) as City[], (city: City) => city.region_index.name)))
        })()
    }, [loactions]);

    return (
        !!modifiedLocations.length && <div className={`container ${styles.container}`}>
            <p className={styles.title}>Локации{status === "executor" && ", в которых компания оказывает услуги"}</p>
            {JSON.stringify(modifiedLocations)}
        </div>
    );
}

export default Locations;