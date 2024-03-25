import { FC } from "react";
import qstyles from '../../questions.module.css';
import { Link } from "react-router-dom";
import { useQuestionBlock } from "../../../../store/questionsBlockStore";

const Payment: FC = () => {
    const questionBlockStore = useQuestionBlock()

    // const { pageNumber, qusetionNumber, qustionsArr } = questionBlockStore
    const { handleQuestionNumber: setQuestionNumberStore } = questionBlockStore
    return (
        <div className={qstyles.container}>
            <p className={qstyles.startText}>В настоящее время действует промо-период, в течение которого никакая плата с исполнителей и заказчиков не взимается. Все правовые и финансовые условия работы на площадке закреплены в <Link className={`${qstyles.link}`} to="/">Пользовательском соглашении</Link>. Об окончании промо-периода и изменениях в Пользовательском соглашении все пользователи сайта будут оповещены заблаговременно.</p>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <p className={`${qstyles.link} ${qstyles.ml20}`} onClick={() => { setQuestionNumberStore('2') }}>
                    Как зарегистрироваться на сайте Ubrato?
                </p>
            </div>
        </div>
    );
}

export default Payment;