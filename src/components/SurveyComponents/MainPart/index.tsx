import styles from './MainPart.module.css'

const SurveyMainPart = () => {
    return (
        <>
            <h1 className={styles.title}>Тест-драйв <span className={styles.blueText}>Ubrato</span></h1>
            <div className={`${styles.part1}`}>
                <div className={`${styles.textBlock}`}>
                    <div className={styles.survey__pair}>
                        <img className={styles.survey__pair__image} src="./survey/check-mark.svg" alt="" />
                        <p className={styles.survey__pair__text}>Примите участие в опросе</p>
                    </div>
                    <div className={styles.survey__pair}>
                        <img className={styles.survey__pair__image} src="./survey/arrow-down.svg" alt="" />
                        <p className={styles.survey__pair__text}>Получите исследование в подарок</p>
                    </div>
                    <div className={styles.survey__pair}>
                        <img className={styles.survey__pair__image} src="./survey/heart.svg" alt="" />
                        <p className={styles.survey__pair__text}>Давайте улучшим <span className={styles.blueText}>Ubrato</span> вместе</p>
                    </div>
                </div>
                <img className={styles.laptopImage} src="./survey/laptop.png" alt="" />
            </div>
            <div className={`${styles.part2} ${styles.container}`}>
                <p className={styles.boldText}>Агрегатор клининговых услуг Ubrato предлагает участникам сервиса, зарегистрированным в качестве <span className={styles.link}>Исполнителей</span>, принять участие в тест-драйве сайта.</p>
                <p className={styles.regularText}>Ubrato – это платформа для корпоративных клиентов, которые ищут профессиональные услуги уборки и сопутствующие услуги. Платформа работает по принципу электронной торговой площадки, где заказчики публикуют свои запросы, а исполнители предлагают им свои услуги. Все взаимодействия на платформе основаны на принципах открытости, честности и профессионализма.</p>
                <p className={styles.boldText}>Преимущества участникам</p>
                <p className={styles.regularText}>За ответы на вопросы анкеты Ubrato предоставит доступ к исследованию рынка клининговых услуг, созданному на основе опроса более 150 представителей клининговых компаний России в 2023 году.</p>
                <p className={styles.regularText}>Участники анкетирования станут ключевым партнерами площадки.</p>
                <ul>
                    <li className={`${styles.regularText} ${styles.dotLi}`}>Вы получите доступ ко всем сервисам площадки.</li>
                    <li className={`${styles.regularText} ${styles.dotLi}`}>За каждым участником тест-драйва будет закреплен персональный менеджер, который ответит в случае возникновения вопросов.</li>
                </ul>
                <p className={styles.regularText}>Уже есть вопросы? <span className={styles.link}>Напишите телефон</span> и мы перезвоним. </p>
                <p className={styles.boldText}>Как принять участие</p>
                <ul>
                    <li className={`${styles.regularText}`}><span className={styles.numberLi}>1. </span><span className={styles.link}>Зарегистрируйтесь</span> на площадке Ubrato в качестве Исполнителя.
                    </li>
                    <li className={`${styles.regularText}`}><span className={styles.numberLi}>2. </span>Ознакомьтесь с возможностями площадки и примите участие в торгах. На сайте создано несколько тестовых тендеров, отмеченных в начале описания тендера заголовком “Тестовый тендер”.
                    </li>
                    <li className={`${styles.regularText}`}><span className={styles.numberLi}>3. </span><span className={styles.link}>Заполните анкету</span> участника в личном кабинете.
                    </li>
                    <li className={`${styles.regularText}`}><span className={styles.numberLi}>4. </span>Получите в подарок от нас Исследование рынка клининговых услуг за 2023 год. Материал станет доступен для скачивания после заполнения анкеты.</li>
                </ul>
                <button className={styles.survey__button}>Участвовать</button>
                <p className={`${styles.italic} ${styles.regularText}`}>Настоящие условия не являются офертой. Администрация площадки Ubrato.ru вправе вносить изменения в условия тест-драйва без предварительного уведомления пользователей.</p>
            </div>
        </>
    );
}

export default SurveyMainPart;