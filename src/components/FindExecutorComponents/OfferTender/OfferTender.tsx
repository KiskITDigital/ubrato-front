import { FC, useEffect, useState } from 'react';
import styles from './offer-tender.module.css'
import { Link } from 'react-router-dom';
import Typesense from 'typesense'
import { Radio, RadioGroup } from '@nextui-org/react';
import { offerTender } from '@/api/findExecutor/offerTender';
import { tenderData } from '@/types/app';

const OfferTender: FC<{
    closeModal: (newState: null) => void
    executorId: string
}> = ({ closeModal, executorId }) => {

    const [tenderId, setTenderId] = useState('');
    const [tenderList, setTenderList] = useState<tenderData[]>([]);

    useEffect(() => {
        const client = new Typesense.Client({
            apiKey: 'Ii388RgSrBidU2XYjSDNElyzDfrZyMnM',
            'nodes': [
                {
                    host: 'search.ubrato.ru',
                    port: 443,
                    protocol: 'https',
                    path: "",
                    // tls:true
                }
            ],
        });
        const searchParameters = {
            'q': '',
            'query_by': 'name',
            'per_page': 5,
            'sort_by': 'created_at:desc',
        }
        client.collections('tender_index').documents().search(searchParameters)
            .then(response => {
                const data: tenderData[] = response.hits?.map(hit => hit.document) as tenderData[]
                setTenderList(data)
            })
    }, []);

    const radioStyle = {
        base: styles.radioBase,
        wrapper: styles.radioWrapper,
        control: styles.radioControl,
    };

    const submit = () => {
        const token = localStorage.getItem('token')
        if (!token) return;
        offerTender(token, executorId, +tenderId)
        closeModal(null)
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Предложите тендер исполнителю <img className={styles.title__closeIcon} onClick={() => closeModal(null)} src="/x-icon.svg" alt="" /></p>
            <div className={styles.tenders}>
                <p className={styles.description}>Мои тендеры</p>
                <RadioGroup
                    value={tenderId}
                    onValueChange={setTenderId}
                    classNames={radioStyle}>
                    {
                        tenderList.map(tender => <Radio key={tender.id} value={tender.id}>
                            <p className={styles.tender__receptionTime}>Прием откликов до {new Date(tender.reception_end * 1000).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className={styles.tender__name}>{tender.name}</p>
                        </Radio>)
                    }
                </RadioGroup>
            </div>
            <div className={styles.buttons}>
                <Link to="/create-tender">
                    <button className={styles.button}>Создать тендер</button>
                </Link>
                <button onClick={submit} disabled={tenderId ? false : true} className={styles.button}>Предложить</button>
            </div>
        </div>
    );
}

export default OfferTender;