import { FC } from "react";
import style from './OneTednerObject.module.css'

type TenderObject = {
    building: Array<string>, 
}

export const OneTenderObject: FC<TenderObject> = ({building}) =>{
    return(
        <div className={style.block_main}>
            <p className={style.block_main_p}>Объект:</p> <div className={style.lineList}> <div className={style.iconLine}><div className={style.IconBack}><img className={style.icon} src="../../../../public/tenderpics/Vector (1).svg" alt="" /></div> <p>Офисная недвижимость <span>{'>'}</span> </p></div> {building.map((obj, index) => ( <p className={style.block_add_p} key={index}>{obj}</p>))}</div>
        </div>
    )
}