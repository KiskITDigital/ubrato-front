import { FC } from "react";
import style from './OneTenderAttachments.module.css'

type TenderAttachments = {
    attachment: Array<string>, 
}

export const OneTenderAttachments: FC<TenderAttachments> = ({attachment}) =>{
    return(
        <div className={style.block_main}>
            <p className={style.block_main_p}>Объект:</p>{attachment.map((obj, index) => (<p className={style.block_add_p} key={index}>{obj}</p>))}
        </div>
    )
}