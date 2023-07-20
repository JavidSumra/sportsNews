/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NewsDispatch, NewsAvailableAction } from "./types";
import { API_ENDPOINT } from "../../config/constants";

export const FetchNews = async (
    dispatch: NewsDispatch,
) => {
    try {
        dispatch({ type: NewsAvailableAction.FETCH_NEWS_REQUEST })
        const res = await fetch(`${API_ENDPOINT}/articles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!res.ok) {
            throw new Error("Failed to Fetch Articles")
        }
        const data = await res.json();
        console.log(data)
        dispatch({ type: NewsAvailableAction.FETCH_NEWS_SUCCESS, payload: data })
    } catch (error) {
        console.log(`Operation Failed:${error}`)
        dispatch({ type: NewsAvailableAction.FETCH_NEWS_FAILURE, payload: "Unable to Load News" })
    }
}