"use client";
import { useState, useEffect } from "react";
import Adash from "../../components/Adash";
import Udash from "../../components/Udash";
import { HandleGetUser } from "../../api/UserAPI";
import Loading from "../loading";

export default function Dashboard() {
    const [role, setRole] = useState(null);
    useEffect(() => {
        try {
            const fetchUser = async () => {
                const userId = localStorage.getItem("userId");
                const response = await HandleGetUser(userId);
                setRole(response?.user?.role);
            };
            fetchUser();
        } catch (err) {
            showToast("Cannot fetch User", "fail");
        }
    }, []);

    return (
        <div>
            {role === null ? (
                <Loading />
            ) : role === "user" ? (
                <Udash />
            ) : (
                <Adash />
            )}
        </div>
    );
}
