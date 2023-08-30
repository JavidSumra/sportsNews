import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../config/constants";

export interface UserPreferences {
    selectedSport: string[];
    selectedTeams: string[];
}

export interface Preferences {
    preferences: UserPreferences;
    errors?: string[];
}

const initialPreferences: Preferences = {
    preferences: {
        selectedSport: [],
        selectedTeams: [],
    },
    errors: [],
};


const useFetch = (): Preferences => {
    const [data, setData] = useState<Preferences>(initialPreferences);
    const token: string | null = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchData = () => {
            if (token !== null) {

                fetch(`${API_ENDPOINT}/user/preferences`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => res.json()).then((data: Preferences) => setData(data)).catch((err) => console.log(err))

            }

        }
        void fetchData();
    }, [token]);

    return data;
};

export default useFetch;
