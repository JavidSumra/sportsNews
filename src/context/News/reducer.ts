import { Reducer } from "react";
import { NewsState, NewsAction, NewsAvailableAction, initialState } from "./types";


export const NewsReducer: Reducer<NewsState, NewsAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case NewsAvailableAction.FETCH_NEWS_REQUEST:
            return { ...state, isLoading: true }
        case NewsAvailableAction.FETCH_NEWS_SUCCESS:
            return { ...state, isLoading: false, news: action.payload }
        case NewsAvailableAction.FETCH_NEWS_FAILURE:
            return { ...state, isLoading: false, isError: true, errorMessage: action.payload }
        default:
            return state;
    }
}