/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { API_ENDPOINT } from "../config/constants";

export interface UserPreferences {
    SelectedSport: string[];
    SelectedTeams: string[];
}
export interface Preferences {
    preferences: UserPreferences;
    errors?: string[]
}

const FetchPreferences = async () => {
    const token: string | null = localStorage.getItem("authToken");

    try {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data: Preferences = await response.json();

        return data;
    }
    catch (error) {
        throw new Error("Failed To Fetch Preferences");
    }
};

export default FetchPreferences;