import { FC } from "react";
import style from './OneTednerObject.module.css'

type TenderObject = {
    building: Array<string>, 
}

export const OneTenderObject: FC<TenderObject> = ({building}) =>{
    return(
        <div className={style.block_main}>
            <p className={style.block_main_p}>Объект:</p> <p className={style.block_add_p}>{building.map((obj, index) => ( <p key={index}>{obj}</p>))}</p>
        </div>
    )
}