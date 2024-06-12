import { useEffect, useState } from "react";
import { Link, Params, useNavigate, useParams } from "react-router-dom";
import { addFavoriteExecutor, getOtherProfilesOrganizations, isFavoriteExecutor, removeFavoriteExecutor } from "@/api";
import Info from "@/components/OrganizationProfileComponents/Info";
import styles from './organization-profile-page.module.css';
import { ErrorInfo, ExecutorProfileInfo, OrdererProfileInfo } from "@/types/app";
import Description from "@/components/OrganizationProfileComponents/Description";
import Locations from "@/components/OrganizationProfileComponents/Locations";

const OrganizationProfilePage = () => {
    const { org_id }: Readonly<Params<string>> = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState<ErrorInfo | ExecutorProfileInfo | OrdererProfileInfo | null>(null);

    const favoriteExecutorsHandler = async (organization: { id: string, isFavorite: boolean }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const res = organization.isFavorite
            ? removeFavoriteExecutor(organization.id, token)
            : addFavoriteExecutor(organization.id, token);

        const resStatus = (await res).data.status ? !organization.isFavorite : organization.isFavorite;

        if (data && 'isFavorite' in data) {
            setData({
                ...data,
                isFavorite: resStatus
            });
        }
    };

    useEffect(() => {
        if (org_id) {
            (async () => {
                const fetchedData = await getOtherProfilesOrganizations(org_id);
                const token = localStorage.getItem('token');
                const isFavorite = !!token && (await isFavoriteExecutor(org_id, token))?.data?.status || false;
                console.log(fetchedData);

                setData({
                    ...fetchedData,
                    isFavorite
                });
            })();
        }
    }, [org_id]);

    return (
        <div className={`container ${styles.container}`}>
            {
                data ? (
                    'msg' in data ?
                        <>
                            <p className={styles.errorMessage}>{data.msg}</p>
                            <Link className={styles.link} to="/find-executor">перейти к списку исполнителей</Link>
                        </>
                        :
                        <>
                            <Info
                                isFavorite={data.isFavorite}
                                favoriteExecutorsHandler={favoriteExecutorsHandler}
                                orgId={data.org.id}
                                status={'executor' in data ? 'executor' : 'orderer'}
                                img={data.org.avatar}
                                brand={data.org.brand_name}
                                name={data.org.short_name}
                                inn={data.org.inn}
                            />
                            {'orderer' in data ? (
                                <Description text={data.orderer.description} />
                            ) : (
                                <Description text={data.executor.description} />
                            )}
                            {'orderer' in data ? (
                                <Locations status="orderer" loactions={data.orderer.locations} />
                            ) : (
                                <Locations status="executor" loactions={data.executor.locations} />
                            )}
                        </>
                ) : <p className={styles.spinner}>🌀</p>
            }
        </div>
    );
};

export default OrganizationProfilePage;
