import { FC } from "react";
import styles from './OneTenderWork.module.css'

type MainBLockTypes = {
    gg:string, 
}

export const OneTenderMainBlock: FC<MainBLockTypes> = () => {
    return( 
        <div className={styles.main_block}>
            blockhere
        </div>
    )
}