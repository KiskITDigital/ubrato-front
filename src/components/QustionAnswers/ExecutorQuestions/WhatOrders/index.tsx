import { FC } from "react";
import qstyles from '../../questions.module.css';
import { Link } from "react-router-dom";
import { useQuestionBlock } from "../../../../store/questionsBlockStore";

const WhatOrders: FC = () => {
    const questionBlockStore = useQuestionBlock()

    // const { pageNumber, qusetionNumber, qustionsArr } = questionBlockStore
    const { handleQuestionNumber: setQuestionNumber } = questionBlockStore
    return (
        <div className={qstyles.container}>
            <p className={`${qstyles.startText}`}>На сайте Ubrato размещены заказы на оказание клининговых и смежных услуг. Сейчас в <Link className={qstyles.link} to="/">каталоге</Link> находится более 100 услуг, сгруппированных в 17 видов:</p>
            <ul>
                <li className={qstyles.li}>Вывоз (например, вывоз отходов мусора, снега);</li>
                <li className={qstyles.li}>Дезинсекция насекомых;</li>
                <li className={qstyles.li}>Дезинфекция;</li>
                <li className={qstyles.li}>Дератизация;</li>
                <li className={qstyles.li}>Замена оборудования и инвентаря;</li>
                <li className={qstyles.li}>Комплексное обслуживание;</li>
                <li className={qstyles.li}>Мойка (например, мойка фасадов, вывесок, оборудования, инвентаря);</li>
                <li className={qstyles.li}>Мытье (например, мытье посуды, оборудования);</li>
                <li className={qstyles.li}>Очистка (например. очистка от пыли, очистка улиц от снега и льда);</li>
                <li className={qstyles.li}>Полировка и укреплений покрытий;</li>
                <li className={qstyles.li}>Поставка товаров и расходных материалов;</li>
                <li className={qstyles.li}>Предоставление персонала для клининга;</li>
                <li className={qstyles.li}>Промышленный альпинизм;</li>
                <li className={qstyles.li}>Уборка влажная, генеральная, поддерживающая, уборка снега, уборка мусора;</li>
                <li className={qstyles.li}>Услуги прачечной;</li>
                <li className={qstyles.li}>Химчистка (например, химчистка ковров, ковролина, мебели);</li>
                <li className={qstyles.li}>Чистка (например, чистка напольных покрытий, система защиты от грязи, мебели, оборудования).</li>
            </ul>
            <p className={`${qstyles.text} ${qstyles.mt20}`}>При создании тендерной заявки можно выбрать несколько значений из списка.</p>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <p className={`${qstyles.link} ${qstyles.ml20}`} onClick={() => { setQuestionNumber('1') }}>
                    Как стать исполнителем?
                </p>
                <p className={`${qstyles.link} ${qstyles.ml20}`} onClick={() => { setQuestionNumber('4') }}>
                    Как откликнуться на тендер?
                </p>
            </div>
        </div>
    );
}

export default WhatOrders;