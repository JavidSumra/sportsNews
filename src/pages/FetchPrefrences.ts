/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { API_ENDPOINT } from "../config/constants";


export interface UserPreferences {
    SelectedSport: string[];
    SelectedTeams: string[];
}
export interface Preferences {
    preferences: UserPreferences;
}


const token: string | null = localStorage.getItem("authToken");

const FetchPreferences = async () => {
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    // console.log(await JSON.parse(response.preferences));
    const data: Preferences = await response.json();
    return data;
};

export default FetchPreferences;