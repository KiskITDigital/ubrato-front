import { updateToken, surveyCheck } from "@/api";
import { ProfileNavigation } from "@/components";
import { useUserInfoStore } from "@/store/userInfoStore";
import { FC, useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import styles from "./proflepage.module.css";

const allowedRoutes = [
  "/profile/notifications",
  "/profile/help",
  "/profile/documents",
  "/profile/settings",
];

export const ProfilePage: FC = () => {
  const userStore = useUserInfoStore();
  const navigate = useNavigate();
  const location = useLocation();
  const setPassedSurvey = userStore.setPassedSurvey;
  const isEmailVerified = userStore.user.email_verified;

  useEffect(() => {
    (async () => {
      setPassedSurvey(await updateToken<boolean, null>(surveyCheck, null));
    })();
  }, [setPassedSurvey]);

  const navigationType = useNavigationType();

  useEffect(() => {
    if (!userStore.isLoggedIn) {
      if (navigationType === "POP") navigate(-1);
      else navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const isAllowedRoute = allowedRoutes.includes(location.pathname);

    if (!isEmailVerified && !isAllowedRoute) {
      navigate("/profile/documents");
    }
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!userStore.isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className="container flex">
      <ProfileNavigation />
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};
