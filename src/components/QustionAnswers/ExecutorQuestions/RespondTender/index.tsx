import { FC } from "react";
import qstyles from '../../questions.module.css';
import { Link } from "react-router-dom";
import { useQuestionBlock } from "../../../../store/questionsBlockStore";

const RespondTender: FC = () => {
    const questionBlockStore = useQuestionBlock()

    // const { pageNumber, qusetionNumber, qustionsArr } = questionBlockStore
    const { handleQuestionNumber: setQuestionNumber } = questionBlockStore
    return (
        <div className={qstyles.container}>
            <ul className={qstyles.mt20}>
                <li className={qstyles.li}>На странице <Link to="/" className={qstyles.link}>“Найти тендер”</Link> отфильтруйте тендеры по параметрам, соответствующим профилю и возможностям вашей компании. Использование фильтров обеспечит выдачу точных результатов.</li>
                <li className={qstyles.li}>Ознакомьтесь с условиями тендера.</li>
                <li className={qstyles.li}>Обсудите возникшие вопросы с заказчиком в чате.</li>
                <li className={qstyles.li}>Нажмите на кнопку “Откликнуться на тендер”.</li>
                <li className={qstyles.li}>Во всплывающем окне укажите свою стоимость или согласитесь со стоимостью заказчика. Нажмите на кнопку “Откликнуться на тендер”.</li>
                <li className={qstyles.li}>Победитель тендера будет выбран заказчиком после окончания периода приема откликов.</li>
            </ul>
            <div className={qstyles.seeAlso}>
                <p className={qstyles.title}>Смотрите также:</p>
                <p className={`${qstyles.link} ${qstyles.ml20}`} onClick={() => { setQuestionNumber('1') }}>
                    Как стать исполнителем?
                </p>
            </div>
        </div>
    );
}

export default RespondTender;