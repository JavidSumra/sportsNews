/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TeamsDispatch, TeamsAvailableAction } from "./types";
import { API_ENDPOINT } from "../../config/constants";

export const FetchTeams = async (
    dispatch: TeamsDispatch,
) => {
    try {
        dispatch({ type: TeamsAvailableAction.FETCH_TEAMS_REQUEST })
        const res = await fetch(`${API_ENDPOINT}/teams`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!res.ok) {
            throw new Error("Failed to Fetch Teams")
        }
        const data = await res.json();
        dispatch({ type: TeamsAvailableAction.FETCH_TEAMS_SUCCESS, payload: data })
    } catch (error) {
        console.log(`Operation Failed:${error}`)
        dispatch({ type: TeamsAvailableAction.FETCH_TEAMS_FAILURE, payload: "Unable to Load Matches" })
    }
}