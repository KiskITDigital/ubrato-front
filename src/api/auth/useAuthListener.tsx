import { useUserInfoStore } from "@/store/userInfoStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthListener = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setLoggedIn, fetchUser } = useUserInfoStore();

  useEffect(() => {
    const authChannel = new BroadcastChannel("auth");

    const handleLogin = async (token: string) => {
      localStorage.setItem("token", token);
      await fetchUser(token);
      setLoggedIn(true);
      navigate("/my-tenders", { replace: true });
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      setLoggedIn(false);
      navigate("/", { replace: true });
    };

    // Обработчик сообщений от других вкладок
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "LOGIN" && event.data.token) {
        handleLogin(event.data.token);
      } else if (event.data.type === "LOGOUT") {
        handleLogout();
      }
    };

    // Проверка состояния при монтировании
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      handleLogin(token);
    } else if (!token && isLoggedIn) {
      handleLogout();
    }

    authChannel.addEventListener("message", handleMessage);
    return () => {
      authChannel.removeEventListener("message", handleMessage);
      authChannel.close();
    };
  }, [navigate, isLoggedIn, setLoggedIn, fetchUser]);
};
