import { CreateTender } from "@/components/CreateTender/CreateTender";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CreateTenderPage: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/register')
    }, [navigate]);

    return (
        <CreateTender />
    )
}