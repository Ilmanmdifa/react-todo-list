import { useState, useEffect } from "react";
import { getUserLogged, putAccessToken } from "../utils/network-data";

export function useAuth() {
    const [authedUser, setAuthedUser] = useState("")
    const [initializing, setInitializing] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getUserLogged();
                setAuthedUser(data);
            } catch (error) {
                console.error("Error fetching user", error);
            } finally {
                setInitializing(false);
            }
        }
        fetchUser();
    }, [])
    
    const onLoginSuccess = async ({ accessToken }) => {
        try {
            putAccessToken(accessToken);
            const { data } = await getUserLogged();
            setAuthedUser(data);
        } catch (error) {
            console.error("Login failed", error)
        }
    }
    
    const onLogout = () => {
        setAuthedUser(null);
        putAccessToken("");
    }

    return{authedUser, initializing, onLoginSuccess, onLogout}
}