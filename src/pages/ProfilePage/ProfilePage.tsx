import { surveyCheck } from "@/api";
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
  const {
    isLoggedIn,
    user,
    loading: storeLoading,
    fetchUser,
    setPassedSurvey,
  } = useUserInfoStore();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn && !storeLoading) {
      fetchUser(token).catch(() => {
        navigate("/login");
      });
    }
  }, [fetchUser, isLoggedIn, storeLoading, navigate]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const checkSurvey = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setPassedSurvey(await surveyCheck(token));
        }
      } catch (error) {
        console.error("Survey check failed:", error);
      }
    };

    checkSurvey();
  }, [isLoggedIn, setPassedSurvey]);

  useEffect(() => {
    if (storeLoading) return;

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const isAllowedRoute = allowedRoutes.includes(location.pathname);
    if (!user.email_verified && !isAllowedRoute) {
      navigate("/profile/documents");
    }
  }, [
    isLoggedIn,
    user.email_verified,
    location.pathname,
    navigate,
    storeLoading,
    navigationType,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (storeLoading) {
    return <div className="container flex">Loading...</div>;
  }

  if (!isLoggedIn) {
    return null;
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
