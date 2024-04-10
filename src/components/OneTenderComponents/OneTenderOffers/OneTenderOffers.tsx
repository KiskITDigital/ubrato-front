import { FC } from "react";
import style from './OneTenderOffers.module.css'

type TenderOffers = {
    offers: Array<string>, 
}

export const OneTenderOffers: FC<TenderOffers> = ({offers}) =>{
    return(
        <div className={style.block_main}>
            <p className={style.block_main_p}>Услуги:</p> <p className={style.block_add_p}>{offers.map((obj, index) => ( <p key={index}>{obj}</p>))}</p>
        </div>
    )
}