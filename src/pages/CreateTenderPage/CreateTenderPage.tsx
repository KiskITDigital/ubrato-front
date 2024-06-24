import { CreateTender } from "@/components/CreateTender/CreateTender";
import { useUserInfoStore } from "@/store/userInfoStore";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CreateTenderPage: FC = () => {
    const userInfoStore = useUserInfoStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfoStore.isLoggedIn) {
            navigate('/login');
          }
    }, [navigate]);

    return (
        <CreateTender />
    )
}