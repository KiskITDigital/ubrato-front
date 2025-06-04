import { useUserInfoStore } from "@/store/userInfoStore";

export const logout = () => {
  localStorage.removeItem("token");

  const userInfoStore = useUserInfoStore.getState();
  userInfoStore.setLoggedIn(false);

  if (typeof BroadcastChannel !== "undefined") {
    const authChannel = new BroadcastChannel("auth");
    authChannel.postMessage({ type: "LOGOUT" });
    authChannel.close();
  }

  window.dispatchEvent(
    new StorageEvent("storage", {
      key: "token",
      newValue: null,
    })
  );
};
