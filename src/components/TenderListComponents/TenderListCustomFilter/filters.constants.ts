export const FILTER_BY_CITY =
  'name:="Москва" || name:="Санкт-Петербург" || name:="Казань" || name:="Нижний Новгород" || name:="Екатеринбург"';

export enum Cities {
  Moscow = "Москва",
  SaintPetersburg = "Санкт-Петербург",
  NizhnyNovgorod = "Нижний Новгород",
  Kazan = "Казань",
  Yekaterinburg = "Екатеринбург",
}

export const objectImages: Record<string, string> = {
  HoReCa: "horeca",
  "Транспортная инфраструктура": "road",
  Транспорт: "transport",
  "Торговая недвижимость": "trading",
  Территория: "territory",
  "Спортивно-оздоровительные объекты": "stadium",
  "Складская недвижимость": "stock",
  "Производственная недвижимость": "factory",
  "Природные объекты": "nature",
  "Офисная недвижимость": "office",
  "Объекты образования": "school",
  "Объекты культурного наследия": "museum",
  "Объект здравоохранения": "pharmacy",
  "Жилая недвижимость": "living-building",
};
