import { FC } from "react";
import qstyles from '../../questions.module.css';

const Requirements: FC = () => {
    return (
        <div className={qstyles.container}>
            <p className={qstyles.title}>Юрлицо</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>
                На сайте Ubrato могут зарегистрироваться только действующие юридические лица, не находящееся в процедуре банкротства, на стадии ликвидации и в процессе присоединения к другому лицу с последующей ликвидацией. В настоящее время пользователями не могут стать индивидуальные предприниматели и физические лица.
            </p>
            <p className={qstyles.title}>B2B</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>
                Доступ к площадке предоставлен компаниям, работающим в корпоративном сегменте (business-to-business, B2B).
            </p>
            <p className={qstyles.title}>ОКВЭД</p>
            <p className={`${qstyles.text} ${qstyles.ml20}`}>
                Условием для исполнителей является наличие действующего юридического лица с видом деятельности, относящемся к клинингу или к смежным услугам. При этом, исполнитель может участвовать только в тендерах, соответствующих его ОКВЭД. Ubrato регистрирует компании со следующими категориями ОКВЭД:
            </p>
            <ul className={`${qstyles.ml20}`}>
                <li className={`${qstyles.li} ${qstyles.underline}`}>81.00 Деятельность по обслуживанию зданий и территорий</li>
                <li>
                    <ul className={`${qstyles.ml20}`}>
                        <li className={qstyles.li}>81.10  Деятельность по комплексному обслуживанию помещений</li>
                        <li className={qstyles.li}>81.20  Деятельность по чистке и уборке</li>
                        <li>
                            <ul className={`${qstyles.ml20}`}>
                                <li className={qstyles.li}>81.21 Деятельность по общей уборке зданий</li>
                                <ul className={`${qstyles.ml20}`}>
                                    <li className={qstyles.li}>81.21.1 Деятельность по уборке квартир и частных домов</li>
                                    <li className={qstyles.li}>81.21.9 Деятельность по уборке прочих типов зданий и помещений</li>
                                </ul>
                                <li className={qstyles.li}>81.22 Деятельность по чистке и уборке жилых зданий и нежилых помещений прочая</li>
                                <li className={qstyles.li}>81.29 Деятельность по чистке и уборке прочая</li>
                                <li>
                                    <ul className={`${qstyles.ml20}`}>
                                        <li className={qstyles.li}>81.29.1 Дезинфекция, дезинсекция, дератизация зданий, промышленного оборудования</li>
                                        <li className={qstyles.li}>81.29.2 Подметание улиц и уборка снега</li>
                                        <li className={qstyles.li}>81.29.9 Деятельность по чистке и уборке прочая, не включенная в другие группировки</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className={qstyles.li}>81.30  Предоставление услуг по благоустройству ландшафта</li>
                    </ul>
                </li>
                <li className={`${qstyles.li} ${qstyles.underline}`}>68.00  Операции с недвижимым имуществом</li>
                <li>
                    <ul className={`${qstyles.ml20}`}>
                        <li className={qstyles.li}>68.30  Операции с недвижимым имуществом за вознаграждение или на договорной основе</li>
                        <li>
                            <ul className={`${qstyles.ml20}`}>
                                <li className={qstyles.li}>68.32 Управление недвижимым имуществом за вознаграждение или на договорной основе</li>
                                <li>
                                    <ul className={`${qstyles.ml20}`}>
                                        <li className={qstyles.li}>68.32.1 Управление эксплуатацией жилого фонда за вознаграждение или на договорной основе</li>
                                        <li className={qstyles.li}>68.32.2 Управление эксплуатацией нежилого фонда за вознаграждение или на договорной основе</li>
                                        <li className={qstyles.li}>68.32.3 Деятельность по технической инвентаризации недвижимого имущества</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className={`${qstyles.li} ${qstyles.underline}`}></li>
                <li className={`${qstyles.li} ${qstyles.underline}`}>96.00  Деятельность по предоставлению прочих персональных услуг</li>
                <li>
                    <ul className={`${qstyles.ml20}`}>
                        <li className={qstyles.li}>96.01 Стирка и химическая чистка текстильных и меховых изделий - для тендеров по химчисткам и прачечным</li>
                    </ul>
                </li>
                <li className={`${qstyles.li} ${qstyles.underline}`}>39.00 Предоставление услуг в области ликвидации последствий загрязнений и прочих услуг, связанных с удалением отходов</li>
                <li className={`${qstyles.li} ${qstyles.underline}`}>82.00 Деятельность административно-хозяйственная - для тендеров по руководству и найму персонала</li>
                <li>
                    <ul className={`${qstyles.ml20}`}>
                        <li className={qstyles.li}>82.10  Деятельность административно-хозяйственная и вспомогательная деятельность по обеспечению функционирования организации</li>
                        <ul className={`${qstyles.ml20}`}>
                            <li className={qstyles.li}>82.11 Деятельность административно-хозяйственная комплексная по обеспечению работы организации</li>
                            <li className={qstyles.li}>82.19 Деятельность по фотокопированию и подготовке документов и прочая специализированная вспомогательная деятельность по обеспечению деятельности офиса</li>
                        </ul>
                    </ul>
                </li>
                <li className={`${qstyles.li} ${qstyles.underline}`}>37.00 Сбор и обработка сточных вод</li>
                <li className={`${qstyles.li} ${qstyles.underline}`}>38.00 Сбор, обработка и утилизация отходов</li>
            </ul>
        </div>
    );
}

export default Requirements;