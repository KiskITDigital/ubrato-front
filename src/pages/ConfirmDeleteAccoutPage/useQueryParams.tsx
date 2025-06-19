import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return {
    code: searchParams.get("code"),
    email: searchParams.get("email"),
  };
};

export default useQueryParams;
