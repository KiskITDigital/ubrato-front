import { FC, useState } from 'react';
import styles from './rights-page.module.css'

const ThirdText: FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className={styles.textContainer}>
            <p>Общие положения</p>
            <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» (далее — Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ООО «ИНТЕГРАЦИЯ» (далее – Оператор).</p>
            <p>Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
            <button className={`${styles.button}`} onClick={() => setIsCollapsed(!isCollapsed)}>
                <div className={`${styles.gradient} ${!isCollapsed ? styles.active : ''}`}></div>
            </button>
            {!isCollapsed && (<>
                <p>Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко всей информации, которую Оператор может получить о посетителях и пользователях веб-сайта https://ubrato.ru. (далее – сайт, сервис, веб-сайт).</p>
                <p>Основные понятия, используемые в Политике</p>
                <p>Автоматизированная обработка персональных данных - обработка персональных данных с помощью средств вычислительной техники.</p>
                <p>Блокирование персональных данных - временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).</p>
                <p>Веб-сайт - совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://ubrato.ru.</p>
                <p>Информационная система персональных данных - совокупность содержащихся в базах данных персональных данных, и обеспечивающих их обработку информационных технологий и технических средств.</p>
                <p>Обезличивание персональных данных - действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных.</p>
                <p>Обработка персональных данных - любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.</p>
                <p>Оператор - государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.</p>
                <p>Персональные данные - любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта https://ubrato.ru.</p>
                <p>Персональные данные, разрешенные субъектом персональных данных для распространения - персональные данные, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных путем дачи согласия на обработку персональных данных, разрешенных субъектом персональных данных для распространения в порядке, предусмотренном Законом о персональных данных (далее - персональные данные, разрешенные для распространения).</p>
                <p>Пользователь – любой посетитель веб-сайта https://ubrato.ru. (далее – пользователь, субъект персональных данных).</p>
                <p>Предоставление персональных данных – действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.</p>
                <p>Распространение персональных данных – действия, направленные на раскрытие персональных данных неопределенному кругу лиц;</p>
                <p>Трансграничная передача персональных данных – передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.</p>
                <p>Уничтожение персональных данных – любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и (или) уничтожаются материальные носители персональных данных.</p>
                <p>Cookie – небольшой фрагмент данных, отправленный веб-сервером и хранимый на компьютере пользователя, который веб-клиент или веб-браузер каждый раз пересылает веб-серверу в запросе при попытке открыть страницу соответствующего сайта.</p>
                <p>IP-адрес – уникальный сетевой адрес узла в компьютерной сети, построенной по протоколу IP.</p>
                <p>Основные права и обязанности Оператора</p>
                <p>Оператор имеет право:</p>
                <p>- получать от субъекта персональных данных достоверные информацию и/или документы, содержащие персональные данные;</p>
                <p>- в случае отзыва субъектом персональных данных согласия на обработку персональных данных Оператор вправе продолжить обработку персональных данных без согласия субъекта персональных данных при наличии оснований, указанных в Законе о персональных данных;</p>
                <p>- самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных и принятыми в соответствии с ним нормативными правовыми актами, если иное не предусмотрено Законом о персональных данных или другими федеральными законами.</p>
                <p>Оператор обязан:</p>
                <p>- предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных;</p>
                <p>- организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ;</p>
                <p>- отвечать на обращения и запросы субъектов персональных данных и их законных представителей в соответствии с требованиями Закона о персональных данных;</p>
                <p>- сообщать в уполномоченный орган по защите прав субъектов персональных данных по запросу этого органа необходимую информацию в течение 30 дней с даты получения такого запроса;</p>
                <p>- публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике обработки персональных данных;</p>
                <p>- принимать правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных;</p>
                <p>- прекратить передачу (распространение, предоставление, доступ) персональных данных, прекратить обработку и уничтожить персональные данные в порядке и случаях, предусмотренных Законом о персональных данных;</p>
                <p>- исполнять иные обязанности, предусмотренные Законом о персональных данных.</p>
                <p>Основные права и обязанности субъектов персональных данных</p>
                <p>Субъекты персональных данных имеют право:</p>
                <p>- получать информацию, касающуюся обработки его персональных данных, за исключением случаев, предусмотренных федеральными законами. Сведения предоставляются субъекту персональных данных Оператором в доступной форме, и в них не должны содержаться персональные данные, относящиеся к другим субъектам персональных данных, за исключением случаев, когда имеются законные основания для раскрытия таких персональных данных. Перечень информации и порядок ее получения установлен Законом о персональных данных;</p>
                <p>- требовать от оператора уточнения его персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки, а также принимать предусмотренные законом меры по защите своих прав;</p>
                <p>- выдвигать условие предварительного согласия при обработке персональных данных в целях продвижения на рынке товаров, работ и услуг;</p>
                <p>- на отзыв согласия на обработку персональных данных;</p>
                <p>- обжаловать в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке неправомерные действия или бездействие Оператора при обработке его персональных данных;</p>
                <p>- на осуществление иных прав, предусмотренных законодательством РФ.</p>
                <p>Субъекты персональных данных обязаны:</p>
                <p>- предоставлять Оператору достоверные данные о себе;</p>
                <p>- сообщать Оператору об уточнении (обновлении, изменении) своих персональных данных.</p>
                <p>Лица, передавшие Оператору недостоверные сведения о себе, либо сведения о другом субъекте персональных данных без согласия последнего, несут ответственность в соответствии с законодательством РФ.</p>
                <p>Оператор может обрабатывать следующие персональные данные Пользователя:</p>
                <p>- Фамилия, имя, отчество.</p>
                <p>- Электронный адрес.</p>
                <p>- Номера телефонов.</p>
                <p>- Ник в мессенджере Telegram и иных подобных мессенджерах.</p>
                <p>Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других). Автоматически передаются в процессе посещения страниц сайта следующие данные Пользователей:</p>
                <p>- IP - адрес;</p>
                <p>- информация из cookie;</p>
                <p>- информация о браузере (или иной программе, которая осуществляет доступ к сайту);</p>
                <p>- время доступа;</p>
                <p>- посещенные адреса страниц;</p>
                <p>- реферер (адрес предыдущей страницы). </p>
                <p>Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.</p>
                <p>Обработка специальных категорий персональных данных, касающихся расовой, национальной принадлежности, политических взглядов, религиозных или философских убеждений, интимной жизни, Оператором не осуществляется.</p>
                <p>Обработка персональных данных, разрешенных для распространения, из числа специальных категорий персональных данных, указанных в ч. 1 ст. 10 Закона о персональных данных, допускается, если соблюдаются запреты и условия, предусмотренные ст. 10.1 Закона о персональных данных.</p>
                <p>Согласие Пользователя на обработку персональных данных, разрешенных для распространения, оформляется отдельно от других согласий на обработку его персональных данных. При этом соблюдаются условия, предусмотренные, в частности, ст. 10.1 Закона о персональных данных. </p>
                <p>Согласие на обработку персональных данных, разрешенных для распространения, Пользователь предоставляет Оператору непосредственно.</p>
                <p>Оператор обязан в срок не позднее трех рабочих дней с момента получения указанного согласия Пользователя опубликовать информацию об условиях обработки, о наличии запретов и условий на обработку неограниченным кругом лиц персональных данных, разрешенных для распространения.</p>
                <p>Передача (распространение, предоставление, доступ) персональных данных, разрешенных субъектом персональных данных для распространения, должна быть прекращена в любое время по требованию субъекта персональных данных. Данное требование должно включать в себя фамилию, имя, отчество (при наличии), контактную информацию (номер телефона, адрес электронной почты или почтовый адрес) субъекта персональных данных, а также перечень персональных данных, обработка которых подлежит прекращению. Указанные в данном требовании персональные данные могут обрабатываться только Оператором, которому оно направлено.</p>
                <p>Принципы обработки персональных данных</p>
                <p>Обработка персональных данных осуществляется на законной и справедливой основе.</p>
                <p>Обработка персональных данных ограничивается достижением конкретных, заранее определенных и законных целей. Не допускается обработка персональных данных, несовместимая с целями сбора персональных данных.</p>
                <p>Не допускается объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой.</p>
                <p>Обработке подлежат только персональные данные, которые отвечают целям их обработки.</p>
                <p>Содержание и объем обрабатываемых персональных данных соответствуют заявленным целям обработки. Не допускается избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.</p>
                <p>При обработке персональных данных обеспечивается точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных. Оператор принимает необходимые меры и/или обеспечивает их принятие по удалению или уточнению неполных, или неточных данных.</p>
                <p>Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных. Обрабатываемые персональные данные уничтожаются либо обезличиваются по достижении целей обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено федеральным законом.</p>
                <p>Цели обработки персональных данных</p>
                <p>Цель обработки персональных данных Пользователя:</p>
                <p>- исполнения соглашений по предоставлению доступа к Сайту, его содержанию и/или сервису, к функционалу сервиса, для администрирования сайта, информации и/или материалам, содержащимся на веб-сайте https://ubrato.ru ;</p>
                <p>- идентификации при регистрации на сайте и/или при использовании сервиса;</p>
                <p>- оказания услуг, обработки запросов и заявок;</p>
                <p>- установления обратной связи, включая направление уведомлений и запросов; </p>
                <p>- подтверждения полноты предоставленных персональных данных;</p>
                <p>- заключения договоров, осуществления взаиморасчетов;</p>
                <p>- уточнение деталей заказа, договора, сделки;</p>
                <p>- сбора Оператором статистики;</p>
                <p>- улучшения качества работы сайта и/или его сервиса, удобства их использования и разработки новых сервисов и услуг;</p>
                <p>- проведения маркетинговых (рекламных) мероприятий, направления Оператором предложений и получения их Пользователем для продвижения на рынке услуг Оператора, в том числе, путем осуществления прямых контактов.</p>
                <p>Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных предложениях и различных событиях. Пользователь всегда может отказаться от получения информационных сообщений, направив Оператору письмо на адрес электронной почты info@ubrato.ru с пометкой «Отказ от уведомлений о новых продуктах и услугах и специальных предложениях».</p>
                <p>Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для сбора информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.</p>
                <p>Правовые основания обработки персональных данных</p>
                <p>Правовыми основаниями обработки персональных данных Оператором являются:</p>
                <p>- Конституция Российской Федерации; </p>
                <p>- Федеральный закон от 27.07.2006 г. № 152-ФЗ «О персональных данных»; </p>
                <p>- Федеральный закон от 27.07.2006 г. № 149-ФЗ «Об информации, информационных технологиях и о защите информации»;</p>
                <p>- Постановление Правительства Российской Федерации от 01.11.2012 г. №1119 «Об утверждении требований к защите персональных данных при их обработке в информационных системах персональных данных»;</p>
                <p>- Постановление Правительства Российской Федерации от 15.09.2008 г. № 687 «Об утверждении Положения об особенностях обработки персональных данных, осуществляемых без использования средств автоматизации»; </p>
                <p>- уставные документы Оператора;</p>
                <p>– иные федеральные законы, нормативно-правовые акты в сфере защиты персональных данных;</p>
                <p>– согласия Пользователей на обработку их персональных данных, на обработку персональных данных, разрешенных для распространения.</p>
                <p>Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на сайте info@ubrato.ru или направленные Оператору посредством электронной почты. Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает свое согласие с данной Политикой.</p>
                <p>Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в настройках браузера Пользователя (включено сохранение файлов «cookie» и использование технологии JavaScript).</p>
                <p>Субъект персональных данных самостоятельно принимает решение о предоставлении его персональных данных и дает согласие свободно, своей волей и в своем интересе.</p>
                <p>Условия обработки персональных данных</p>
                <p>Обработка персональных данных осуществляется при следующих условиях:</p>
                <p>- обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных.</p>
                <p>- обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей.</p>
                <p>- обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве.</p>
                <p>- обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем.</p>
                <p>- обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных.</p>
                <p>- осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе (далее – общедоступные персональные данные).</p>
                <p>- осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.</p>
                <p>Порядок сбора, хранения, передачи и других видов обработки персональных данных</p>
                <p>Оператор при обработке персональных данных принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных.</p>
                <p>Обеспечение безопасности персональных данных Оператором достигается, в частности:</p>
                <p>1) определением угроз безопасности персональных данных при их обработке в информационных системах персональных данных;</p>
                <p>2) применением организационных и технических мер по обеспечению безопасности персональных данных при их обработке в информационных системах персональных данных, необходимых для выполнения требований к защите персональных данных, исполнение которых обеспечивает установленные Правительством Российской Федерации уровни защищенности персональных данных;</p>
                <p>3) применением прошедших в установленном порядке процедуру оценки соответствия средств защиты информации;</p>
                <p>4) оценкой эффективности принимаемых мер по обеспечению безопасности персональных данных до ввода в эксплуатацию информационной системы персональных данных;</p>
                <p>5) учетом машинных носителей персональных данных;</p>
                <p>6) обнаружением фактов несанкционированного доступа к персональным данным и принятием мер, в том числе мер по обнаружению, предупреждению и ликвидации последствий компьютерных атак на информационные системы персональных данных и по реагированию на компьютерные инциденты в них;</p>
                <p>7) восстановлением персональных данных, модифицированных или уничтоженных вследствие несанкционированного доступа к ним;</p>
                <p>8) установлением правил доступа к персональным данным, обрабатываемым в информационной системе персональных данных, а также обеспечением регистрации и учета всех действий, совершаемых с персональными данными в информационной системе персональных данных;</p>
                <p>9) контролем за принимаемыми мерами по обеспечению безопасности персональных данных и уровня защищенности информационных систем персональных данных.</p>
                <p>Под угрозами безопасности персональных данных понимается совокупность условий и факторов, создающих опасность несанкционированного, в том числе случайного, доступа к персональным данным, результатом которого могут стать уничтожение, изменение, блокирование, копирование, предоставление, распространение персональных данных, а также иные неправомерные действия при их обработке в информационной системе персональных данных. </p>
                <p>Под уровнем защищенности персональных данных понимается комплексный показатель, характеризующий требования, исполнение которых обеспечивает нейтрализацию определенных угроз безопасности персональных данных при их обработке в информационных системах персональных данных.</p>
                <p>Оператор, при обработке персональных данных обеспечивает определение типа угроз безопасности персональных данных, с учетом оценки возможного вреда.</p>
                <p>Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в случае, если субъектом персональных данных дано согласие Оператору на передачу данных третьему лицу для исполнения обязательств по гражданско-правовому договору.</p>
                <p>В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора info@ubrato.ru с пометкой «Актуализация персональных данных».</p>
                <p>Срок обработки персональных данных определяется достижением целей, для которых были собраны персональные данные, если иной срок не предусмотрен договором или действующим законодательством. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора info@ubrato.ru с пометкой «Отзыв согласия на обработку персональных данных».</p>
                <p>Вся информация, которая собирается сторонними сервисами, в том числе платежными системами, средствами связи и другими поставщиками услуг, хранится и обрабатывается указанными лицами (Операторами) в соответствии с их Политикой обработки персональных данных. Субъект персональных данных и/или Пользователь обязан самостоятельно своевременно ознакомиться с указанными документами. Оператор не несет ответственность за действия третьих лиц, в том числе указанных в настоящем пункте поставщиков услуг.</p>
                <p>Установленные субъектом персональных данных запреты на передачу (кроме предоставления доступа), а также на обработку или условия обработки (кроме получения доступа) персональных данных, разрешенных для распространения, не действуют в случаях обработки персональных данных в государственных, общественных и иных публичных интересах, определенных законодательством РФ.</p>
                <p>Оператор при обработке персональных данных обеспечивает конфиденциальность персональных данных.</p>
                <p>Оператор осуществляет хранение персональных данных в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных.</p>
                <p>Условием прекращения обработки персональных данных может являться достижение целей обработки персональных данных, истечение срока действия согласия субъекта персональных данных или отзыв согласия субъектом персональных данных, а также выявление неправомерной обработки персональных данных.</p>
                <p>Перечень действий, производимых Оператором с полученными персональными данными</p>
                <p>Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.</p>
                <p>Оператор осуществляет автоматизированную обработку персональных данных с получением и/или передачей полученной информации по информационно-телекоммуникационным сетям или без таковой.</p>
                <p>Трансграничная передача персональных данных</p>
                <p>Оператор до начала осуществления трансграничной передачи персональных данных обязан убедиться в том, что иностранным государством, на территорию которого предполагается осуществлять передачу персональных данных, обеспечивается надежная защита прав субъектов персональных данных.</p>
                <p>Трансграничная передача персональных данных на территории иностранных государств, не отвечающих вышеуказанным требованиям, может осуществляться только в случае наличия согласия в письменной форме субъекта персональных данных на трансграничную передачу его персональных данных и/или исполнения договора, стороной которого является субъект персональных данных.</p>
                <p>Конфиденциальность персональных данных</p>
                <p> Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом.</p>
                <p>Заключительные положения</p>
                <p>Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты info@ubrato.ru.</p>
                <p>В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.</p>
                <p>Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу https://ubrato.ru/pravo.</p>
            </>)}
        </div>
    );
}

export default ThirdText;