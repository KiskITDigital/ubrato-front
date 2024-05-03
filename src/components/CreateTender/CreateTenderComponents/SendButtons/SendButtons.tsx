import { useCleaningTypeStore } from "@/store/cleaningTypeStore";
import { useCreateTenderState } from "@/store/createTenderStore";
import { useTypesObjectsStore } from "@/store/objectsStore";
import { FC } from "react";
import { formatDate } from "../../funcs";
import { createTender } from "@/api/index"
import styles from '../../CreateTender.module.css'

const SendButtons: FC = () => {
    const createTenderState = useCreateTenderState()
    const objectsStore = useTypesObjectsStore()
    const cleaningTypeStore = useCleaningTypeStore()

    const submit = (isDraft?: boolean) => {
        if (createTenderState.validateInputs()) return;
        const arrToSearchObjectTypes = objectsStore.apiObjects
            .flatMap(type => type.types)
            .filter(el => createTenderState.objectCategory.includes(el.name))
            .map(el => el.id);
        const servicesToCheck = createTenderState.services
            .map(el => el.types)
            .reduce((acc, el) => [...acc, ...el], [])
            .map(el => el.name)
        const arrToSearchServicesTypes = cleaningTypeStore.apiCleaningTypes
            .filter(el => createTenderState.services.some(elem => elem.name === el.name))
            .flatMap(type => type.types)
            .filter(el => servicesToCheck.includes(el.name))
            .map(el => el.id)
        const city_id = createTenderState.cities.find(el => el.name === createTenderState.city)?.id || 0

        const objectToSend = {
            objects_types: arrToSearchObjectTypes,
            services_types: arrToSearchServicesTypes,
            name: createTenderState.name,
            price: +createTenderState.price,
            is_contract_price: createTenderState.is_contract_price,
            is_nds_price: createTenderState.is_NDS,
            floor_space: +createTenderState.floor_space,
            wishes: createTenderState.wishes,
            description: createTenderState.description,
            reception_start: formatDate(createTenderState.reception_start, createTenderState.reception_time_start),
            reception_end: formatDate(createTenderState.reception_end, createTenderState.reception_time_end),
            work_start: formatDate(createTenderState.work_start),
            work_end: formatDate(createTenderState.work_end),
            city_id,
            attachments: createTenderState.attachments.map(attachment => attachment.linkToSend)
        }
        // console.log(objectToSend);
        const token = localStorage.getItem('token');
        token && city_id && createTender(token, objectToSend, isDraft)
    }
    return (
        <div className={`${styles.section} ${styles.sendButtons}`}>
            <div className={`${styles.section__block}`}>
                <p className={`${styles.section__block__p}`}></p>
                <div className={`${styles.section__sendButtons__block}`}>
                    <button onClick={() => { submit() }} className={styles.section__sendButtons__block__moderationButton}>Отправить на модерацию</button>
                    <button onClick={() => { submit(true) }} className={styles.section__sendButtons__block__templateButton}>Сохранить как черновик</button>
                </div>
            </div>
        </div>
    );
}

export default SendButtons;