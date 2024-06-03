import { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import s from "./styles.module.css";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import { generateSearchClient } from "../generateSearchClient";
import { useFindExecutorState } from "@/store/findExecutorStore";

export const MainFilterTender: FC = () => {
  const findExecutorState = useFindExecutorState();
  const [isSearchClient, setIsSearchClient] = useState(false);

  const [areAllObjects, setAreAllObjects] = useState(false);
  const [areAllServices, setAreAllServices] = useState(false);

  useEffect(() => {
    setIsSearchClient(true);
  }, []);

  const [chosenLocation, setChosenLocation] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [objectId, setObjectId] = useState<null | number>(null);
  const [objectTypesId, setobjectTypesId] = useState<number[]>([]);

  const [servicesId, setServicesId] = useState<number[]>([]);
  const [servicesTypesId, setServicesTypesId] = useState<number[]>([]);

  const [searchCityParam, setSearchCityParam] = useState("");

  const reset = () => {
    setChosenLocation(null);
    setObjectId(null);
    setobjectTypesId([]);
    setServicesId([]);
    setServicesTypesId([]);

    setAreAllObjects(false);
    setAreAllServices(false);

    findExecutorState.handleLocation(null);
    findExecutorState.handleObjectTypesId([]);
    findExecutorState.handleServicesTypesId([]);
  };

  const filter = () => {
    findExecutorState.handleLocation(chosenLocation?.id || null);
    findExecutorState.handleObjectTypesId(objectTypesId);
    findExecutorState.handleServicesTypesId(servicesTypesId);
  };

  const objectImages: {
    [key: string]: string;
  } = {
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

  return (
    <div className={`container ${s.container}`}>
      <p className={s.mainTitle}>Фильтры</p>
      {isSearchClient && (
        <div className={s.block}>
          <InstantSearch
            indexName={"city_index"}
            searchClient={
              searchCityParam.trim()
                ? generateSearchClient(5)
                : generateSearchClient(5, {
                    filter_by:
                      'name:="Москва" || name:="Санкт-Петербург" || name:="Казань" || name:="Нижний Новгород" || name:="Екатеринбург"',
                  })
            }
          >
            <p className={s.title}>Локации:</p>
            {chosenLocation ? (
              <>
                <div className={s.chosenLocations}>
                  <p className={s.chosenLocation}>
                    {chosenLocation.name}
                    <img
                      onClick={() => {
                        setChosenLocation(null);
                        setSearchCityParam("");
                      }}
                      className={s.removeChosenLocation}
                      src="/create-tender/create-tender-close.svg"
                      alt="delete icon"
                    />
                  </p>
                </div>
              </>
            ) : (
              <>
                <label className={s.inputFilterLabel}>
                  <img
                    className={s.inputFilterLabelImg}
                    src="/find-executor/loupe.svg"
                    alt="loupe"
                  />
                  <SearchBox
                    className={s.inputFilter}
                    onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearchCityParam(e.target.value)
                    }
                    placeholder="Населенный пункт"
                  />
                </label>
                <Hits
                  classNames={{
                    list: s.hitList,
                    item: s.location,
                  }}
                  hitComponent={({ hit }) => (
                    <p
                      onClick={() => {
                        setChosenLocation({
                          id: hit.id as number,
                          name: hit.name as string,
                        });
                      }}
                    >
                      {hit.name as ReactNode}
                    </p>
                  )}
                />
              </>
            )}
          </InstantSearch>
        </div>
      )}
      {isSearchClient && (
        <div className={s.block}>
          <InstantSearch
            indexName="object_group_index"
            searchClient={generateSearchClient(areAllObjects ? 250 : 5)}
          >
            <p className={s.title}>Объекты:</p>
            <label className={s.inputFilterLabel}>
              <img
                className={s.inputFilterLabelImg}
                src="/find-executor/loupe.svg"
                alt="loupe"
              />
              <SearchBox className={s.inputFilter} placeholder="Поиск" />
            </label>
            <Hits
              classNames={{
                list: s.hitList,
              }}
              hitComponent={({
                hit,
              }: {
                hit: { id: number; name: string };
              }) => (
                <>
                  <p
                    className={s.objectItem}
                    onClick={() => {
                      setObjectId(
                        hit.id === objectId ? null : (hit.id as number)
                      );
                      setobjectTypesId([]);
                    }}
                  >
                    <img
                      className={s.objectItemImage}
                      src={`/find-executor/${objectImages[hit.name]}.svg`}
                      alt="object image"
                    />
                    {hit.name as ReactNode}
                  </p>
                  {hit.id == objectId && (
                    <InstantSearch
                      indexName="object_type_index"
                      searchClient={generateSearchClient(250)}
                    >
                      <Hits
                        classNames={{
                          list: s.objectTypeList,
                        }}
                        hitComponent={(props: {
                          hit: { id: number; group_id: number; name: string };
                        }) => {
                          const { hit: hitType } = props;
                          return (
                            hitType.group_id === hit.id && (
                              <p
                                className={s.objectTypeItem}
                                onClick={() =>
                                  setobjectTypesId((prev) =>
                                    prev.includes(+hitType.id)
                                      ? [
                                          ...prev.filter(
                                            (el) => el !== +hitType.id
                                          ),
                                        ]
                                      : [...prev, +hitType.id]
                                  )
                                }
                                // onClick={(e) => { console.log(objectTypesId, hitType.id, e); setobjectTypesId([+hitType.id]) }}
                              >
                                {objectTypesId.includes(+hitType.id) ? (
                                  <img
                                    src="/find-executor/checkmark.svg"
                                    alt="check-mark"
                                  />
                                ) : (
                                  <span></span>
                                )}
                                {hitType.name as ReactNode}
                              </p>
                            )
                          );
                        }}
                      />
                    </InstantSearch>
                  )}
                </>
              )}
            />
            <button
              className={`${s.showMore} ${
                areAllObjects ? s.showLess : ""
              }`}
              onClick={() => setAreAllObjects((prev) => !prev)}
            >
              <img src="/find-executor/arrow-down.svg" alt="" />
              Показать {areAllObjects ? "меньше" : "все"}
            </button>
          </InstantSearch>
        </div>
      )}
      {isSearchClient && (
        <div className={s.block}>
          <InstantSearch
            indexName="service_group_index"
            searchClient={generateSearchClient(areAllServices ? 250 : 5)}
          >
            <p className={s.title}>Услуги:</p>
            <label className={s.inputFilterLabel}>
              <img
                className={s.inputFilterLabelImg}
                src="/find-executor/loupe.svg"
                alt="loupe"
              />
              <SearchBox className={s.inputFilter} placeholder="Поиск" />
            </label>
            <Hits
              classNames={{
                list: s.hitList,
              }}
              hitComponent={({
                hit,
              }: {
                hit: { id: number; name: string };
              }) => (
                <>
                  <p
                    className={s.objectItem}
                    onClick={() => {
                      setServicesId((prev) =>
                        prev.includes(+hit.id)
                          ? [...prev.filter((el) => el !== +hit.id)]
                          : [...prev, +hit.id]
                      );
                    }}
                  >
                    <img
                      className={s.objectItemImage}
                      src="/find-executor/service.svg"
                      alt="serivce image"
                    />
                    {hit.name as ReactNode}
                  </p>
                  {servicesId.includes(+hit.id) && (
                    <InstantSearch
                      indexName="service_type_index"
                      searchClient={generateSearchClient(250)}
                    >
                      <Hits
                        classNames={{
                          list: s.objectTypeList,
                        }}
                        hitComponent={(props: {
                          hit: { id: number; group_id: number; name: string };
                        }) => {
                          const { hit: hitType } = props;
                          return (
                            hitType.group_id === hit.id && (
                              <p
                                className={s.objectTypeItem}
                                onClick={() =>
                                  setServicesTypesId((prev) =>
                                    prev.includes(+hitType.id)
                                      ? [
                                          ...prev.filter(
                                            (el) => el !== +hitType.id
                                          ),
                                        ]
                                      : [...prev, +hitType.id]
                                  )
                                }
                              >
                                {servicesTypesId.includes(+hitType.id) ? (
                                  <img
                                    src="/find-executor/checkmark.svg"
                                    alt="check-mark"
                                  />
                                ) : (
                                  <span></span>
                                )}
                                {hitType.name as ReactNode}
                              </p>
                            )
                          );
                        }}
                      />
                    </InstantSearch>
                  )}
                </>
              )}
            />
            <button
              className={`${s.showMore} ${
                areAllServices ? s.showLess : ""
              }`}
              onClick={() => setAreAllServices((prev) => !prev)}
            >
              <img src="/find-executor/arrow-down.svg" alt="" />
              Показать {areAllServices ? "меньше" : "все"}
            </button>
          </InstantSearch>
        </div>
      )}
      <div className={s.block}>
        <button className={s.makeFilters} onClick={filter}>
          Применить фильтры
        </button>
        <button onClick={reset} className={s.resetFilters}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

