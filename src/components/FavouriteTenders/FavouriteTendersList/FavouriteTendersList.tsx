import { getAllFavoriteTenders } from "@/api/favouriteTenders";
import { TenderListElem } from "@/components/TenderListComponents/TenderListElement/inedx";
import { FC, useEffect, useState } from "react";

export const FavouriteTendersList: FC = () => {
    const [favTenders, setFavTenders] = useState([])
    useEffect(()=>{
        (async() => {
            const token = localStorage.getItem('token')
            const favTenders = await getAllFavoriteTenders(token)
            console.log(favTenders.data);
            setFavTenders(favTenders.data)
        })()
    }, [])

    return(
        <div>
            {favTenders.map((tender) => (
        <TenderListElem hit={tender}></TenderListElem>
    ))}
        </div>
    )
}