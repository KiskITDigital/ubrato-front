import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import {
  generateSearchClient,
  generateTypesenseClient,
} from "../generateSearchClient";
import { getCities } from "@/api";
import { useTenderListState } from "@/store/tendersListStore";
import { Cities, FILTER_BY_CITY, objectImages } from "./filters.constants";

const MainFilterTender: FC = () => {
  const tenderListState = useTenderListState();
  const [isSearchClientReady, setIsSearchClientReady] = useState(false);
  const [areAllObjects, setAreAllObjects] = useState(false);
  const [areAllServices, setAreAllServices] = useState(false);
  const [chosenLocation, setChosenLocation] = useState<{
    id: string;
    name: string;
    region_id: string;
  } | null>(null);
  const [cityList, setCityList] = useState<
    { id: string; name: string; region_id: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [selectedObjectNames, setSelectedObjectNames] = useState<string[]>([]);
  const [selectedServiceNames, setSelectedServiceNames] = useState<string[]>(
    []
  );

  useEffect(() => {
    const initializeSearch = async () => {
      try {
        await getLocalCities("");
        setIsSearchClientReady(true);
      } catch (error) {
        console.error("Initialization error:", error);
        setSearchError("Не удалось инициализировать поиск");
      } finally {
        setIsLoading(false);
      }
    };

    initializeSearch();
  }, []);

  const reset = () => {
    setChosenLocation(null);
    tenderListState.handleObjectsIds([]);
    tenderListState.handleObjectTypesIds([]);
    tenderListState.handleServicesIds([]);
    tenderListState.handleServicesTypesIds([]);
    setAreAllObjects(false);
    setAreAllServices(false);
    setSelectedObjectNames([]);
    setSelectedServiceNames([]);

    tenderListState.handleLocation(null);
    tenderListState.handleObjectTypesId([]);
    tenderListState.handleServicesTypesId([]);
    tenderListState.handleSelectedObjectNames([]);
    tenderListState.handleSelectedServiceNames([]);
  };

  const filter = () => {
    tenderListState.handleLocation(chosenLocation ? +chosenLocation.id : null);
    tenderListState.handleObjectTypesId(tenderListState.objectTypesIds);
    tenderListState.handleServicesTypesId(tenderListState.servicesTypesIds);
    tenderListState.handleSelectedObjectNames(selectedObjectNames);
    tenderListState.handleSelectedServiceNames(selectedServiceNames);
  };

  const getLocalCities = async (query: string) => {
    try {
      let cities: { id: string; name: string; region_id: string }[] = [];

      if (query.trim()) {
        const response = await getCities(query);
        cities = response.data.slice(0, 5) as {
          id: string;
          name: string;
          region_id: string;
        }[];
      } else {
        const documents = await generateTypesenseClient("city_index", {
          filter_by: FILTER_BY_CITY,
        });

        const newCities = documents
          ? (documents.map((document) => document.document) as {
              id: string;
              name: string;
              region_id: string;
            }[])
          : [];

        newCities.forEach((city) => {
          if (!("name" in city)) return;
          if (city.name === Cities.Moscow) cities[0] = city;
          else if (city.name === Cities.SaintPetersburg) cities[1] = city;
          else if (city.name === Cities.NizhnyNovgorod) cities[2] = city;
          else if (city.name === Cities.Kazan) cities[3] = city;
          else if (city.name === Cities.Yekaterinburg) cities[4] = city;
        });
      }

      setCityList(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setSearchError("Не удалось загрузить список городов");
    }
  };

  const handleObjectTypesSelect = (hit: { id: number; name: string }) => {
    const isSelected = tenderListState.objectTypesIds.includes(hit.id);

    tenderListState.handleObjectTypesIds(
      isSelected
        ? tenderListState.objectTypesIds.filter((el) => el !== hit.id)
        : [...tenderListState.objectTypesIds, hit.id]
    );

    setSelectedObjectNames((prev) =>
      isSelected
        ? prev.filter((name) => name !== hit.name)
        : [...prev, hit.name]
    );
  };

  const handleServicesTypesSelect = (hit: { id: number; name: string }) => {
    const isSelected = tenderListState.servicesTypesIds.includes(hit.id);

    tenderListState.handleServicesTypesIds(
      isSelected
        ? tenderListState.servicesTypesIds.filter((el) => el !== hit.id)
        : [...tenderListState.servicesTypesIds, hit.id]
    );

    setSelectedServiceNames((prev) =>
      isSelected
        ? prev.filter((name) => name !== hit.name)
        : [...prev, hit.name]
    );
  };

  const handleObjectSelect = (hit: { id: number; name: string }) => {
    const isSelected = tenderListState.objectsIds.includes(hit.id);

    tenderListState.handleObjectsIds(
      isSelected
        ? tenderListState.objectsIds.filter((el) => el !== hit.id)
        : [...tenderListState.objectsIds, hit.id]
    );

    if (isSelected) {
      tenderListState.handleObjectTypesIds([]);
    }
  };

  const handleServiceSelect = (hit: { id: number; name: string }) => {
    const hitId = Number(hit.id);
    const isSelected = tenderListState.servicesIds.includes(hitId);

    tenderListState.handleServicesIds(
      isSelected
        ? tenderListState.servicesIds.filter((el) => el !== hitId)
        : [...tenderListState.servicesIds, hitId]
    );
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (searchError) {
    return <div className={styles.error}>{searchError}</div>;
  }

  return (
    <div className={`container ${styles.container}`}>
      <p className={styles.mainTitle}>Фильтры</p>

      {/* Локации */}
      <div className={styles.block}>
        <p className={styles.title}>Локации:</p>
        {chosenLocation ? (
          <div className={styles.chosenLocations}>
            <p className={styles.chosenLocation}>
              {chosenLocation.name}
              <img
                onClick={() => setChosenLocation(null)}
                className={styles.removeChosenLocation}
                src="/create-tender/create-tender-close.svg"
                alt="delete icon"
              />
            </p>
          </div>
        ) : (
          <>
            <label className={styles.inputFilterLabel}>
              <img
                className={styles.inputFilterLabelImg}
                src="/find-executor/loupe.svg"
                alt="loupe"
              />
              <input
                className={styles.inputFilter}
                type="text"
                onChange={(e) => getLocalCities(e.currentTarget.value)}
                placeholder="Поиск"
              />
            </label>
            {cityList.map((city) => (
              <div
                className={styles.hitList}
                key={city.id}
                onClick={() => setChosenLocation(city)}
              >
                <p className={styles.location}>{city.name}</p>
              </div>
            ))}
          </>
        )}
      </div>

      {isSearchClientReady && (
        <div className={styles.block}>
          <InstantSearch
            indexName="object_group_index"
            searchClient={generateSearchClient(areAllObjects ? 250 : 10)}
          >
            <p className={styles.title}>Объекты:</p>
            <label className={styles.inputFilterLabel}>
              <img
                className={styles.inputFilterLabelImg}
                src="/find-executor/loupe.svg"
                alt="loupe"
              />
              <SearchBox className={styles.inputFilter} placeholder="Поиск" />
            </label>

            <Hits
              classNames={{
                list: styles.hitList,
              }}
              hitComponent={({
                hit,
              }: {
                hit: { id: number; name: string };
              }) => (
                <>
                  <p
                    className={styles.objectItem}
                    onClick={() => handleObjectSelect(hit)}
                  >
                    <img
                      className={styles.objectItemImage}
                      src={`/find-executor/${
                        objectImages[hit.name] || "default"
                      }.svg`}
                      alt="object"
                    />
                    {hit.name}
                  </p>

                  {tenderListState.objectsIds.includes(hit.id) && (
                    <InstantSearch
                      indexName="object_type_index"
                      searchClient={generateSearchClient(250)}
                    >
                      <Hits
                        classNames={{
                          list: styles.objectTypeList,
                        }}
                        hitComponent={(props: {
                          hit: {
                            id: number;
                            group_id: number;
                            name: string;
                          };
                        }) => {
                          const { hit: hitType } = props;
                          return (
                            hitType.group_id === hit.id && (
                              <p
                                className={styles.objectTypeItem}
                                onClick={() => handleObjectTypesSelect(hitType)}
                              >
                                {tenderListState.objectTypesIds.includes(
                                  hitType.id
                                ) ? (
                                  <img
                                    src="/find-executor/checkmark.svg"
                                    alt="check-mark"
                                  />
                                ) : (
                                  <span></span>
                                )}
                                {hitType.name}
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
              className={`${styles.showMore} ${
                areAllObjects ? styles.showLess : ""
              }`}
              onClick={() => setAreAllObjects((prev) => !prev)}
            >
              <img src="/find-executor/arrow-down.svg" alt="" />
              Показать {areAllObjects ? "меньше" : "все"}
            </button>
          </InstantSearch>
        </div>
      )}

      {/* Услуги */}
      {isSearchClientReady && (
        <div className={styles.block}>
          <InstantSearch
            indexName="service_group_index"
            searchClient={generateSearchClient(areAllServices ? 250 : 5)}
          >
            <p className={styles.title}>Услуги:</p>
            <label className={styles.inputFilterLabel}>
              <img
                className={styles.inputFilterLabelImg}
                src="/find-executor/loupe.svg"
                alt="loupe"
              />
              <SearchBox className={styles.inputFilter} placeholder="Поиск" />
            </label>
            <Hits
              classNames={{
                list: styles.hitList,
              }}
              hitComponent={({
                hit,
              }: {
                hit: { id: number; name: string };
              }) => (
                <>
                  <p
                    className={styles.objectItem}
                    onClick={() => handleServiceSelect(hit)}
                  >
                    <img
                      className={styles.objectItemImage}
                      src="/find-executor/service.svg"
                      alt="service"
                    />
                    {hit.name}
                  </p>

                  {tenderListState.servicesIds.includes(Number(hit.id)) && (
                    <InstantSearch
                      indexName="service_type_index"
                      searchClient={generateSearchClient(250)}
                    >
                      <Hits
                        classNames={{
                          list: styles.objectTypeList,
                        }}
                        hitComponent={(props: {
                          hit: {
                            id: number;
                            group_id: number;
                            name: string;
                          };
                        }) => {
                          const { hit: hitType } = props;
                          return (
                            hitType.group_id === hit.id && (
                              <p
                                className={styles.objectTypeItem}
                                onClick={() =>
                                  handleServicesTypesSelect(hitType)
                                }
                              >
                                {tenderListState.servicesTypesIds.includes(
                                  hitType.id
                                ) ? (
                                  <img
                                    src="/find-executor/checkmark.svg"
                                    alt="check-mark"
                                  />
                                ) : (
                                  <span></span>
                                )}
                                {hitType.name}
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
              className={`${styles.showMore} ${
                areAllServices ? styles.showLess : ""
              }`}
              onClick={() => setAreAllServices((prev) => !prev)}
            >
              <img src="/find-executor/arrow-down.svg" alt="" />
              Показать {areAllServices ? "меньше" : "все"}
            </button>
          </InstantSearch>
        </div>
      )}

      {/* Кнопки фильтрации */}
      <div className={styles.block}>
        <button className={styles.makeFilters} onClick={filter}>
          Применить фильтры
        </button>
        <button onClick={reset} className={styles.resetFilters}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default MainFilterTender;
