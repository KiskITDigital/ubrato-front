export type OpportunitiesInfoT = {
  title: string;
  image: string;
  text: string;
  btnText: string;
  link: string;
};

export type HowToFindCardT = {
  img: string;
  title: string;
  text: string;
};

export const Executor: OpportunitiesInfoT[] = [
  {
    title: 'Тендер',
    text: 'Откликайтесь на тендеры, обсуждайте условия, предлагайте свою цену',
    image: './respond-for-tender.svg',
    btnText: 'Найти тендер',
    link: '/alltenders',
  },
  {
    title: 'Портфолио',
    text: 'Расскажите о возможностях и преимуществах вашей компании, получайте предложения от заказчиков',
    image: './portfolio.svg',
    btnText: 'Создать портфолио',
    link: '/profile/contractor',
  },
];

export const Orderer: OpportunitiesInfoT[] = [
  {
    title: 'Тендер',
    text: 'Создайте тендер, если хотите выбрать лучшее предложение среди откликов на вашу задачу',
    image: './tender.svg',
    btnText: 'Разместить тендер',
    link: '/create-tender',
  },
  {
    title: 'Каталог',
    text: 'Выберите исполнителя из каталога Ubrato по профилю, портфолио и другим критериям',
    image: './catalog-ic.svg',
    btnText: 'Найти исполнителя',
    link: '/find-executor',
  },
];

export const ordererCardList: HowToFindCardT[] = [
  {
    img: './register-ic.svg',
    title: 'Зарегистрируйтесь',
    text: 'Укажите ИНН юридического лица и контактные данные уполномоченного представителя',
  },
  {
    img: './blue-ten-ic.svg',
    title: 'Опубликуйте тендер',
    text: 'Сформулируйте задачу, опишите объект, сроки и бюджет',
  },
  {
    img: './executor-ic.svg',
    title: 'Выберите исполнителя',
    text: 'Изучите портфолио компаний, оставивших отклики и выберите победителя',
  },
];

export const executorCardList: HowToFindCardT[] = [
  {
    img: './register-ic.svg',
    title: 'Зарегистрируйтесь',
    text: 'Укажите ИНН юридического лица и контактные данные уполномоченного представителя',
  },
  {
    img: './portfolio.svg',
    title: 'Разместите портфолио',
    text: 'Расскажите о возможностях и преимуществах вашей компании',
  },
  {
    img: './win-tenders.svg',
    title: 'Побеждайте в тендерах',
    text: 'Предлагайте лучшие условия, общайтесь с заказчиками и зарабатывайте',
  },
];
