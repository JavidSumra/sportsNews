type Data = {
    id: number,
    name: string
}

export interface NewsData {
    id: number,
    title: string,
    thumbnail: string,
    sport: Data,
    date: string,
    summary: string,
    teams: Data[]
}

export interface NewsState {
    news: NewsData[],
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

export const initialState: NewsState = {
    news: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
};

export enum NewsAvailableAction {
    FETCH_NEWS_REQUEST = "FETCH_NEWS_REQUEST",
    FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS",
    FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE"
}

export type NewsAction =
    | { type: NewsAvailableAction.FETCH_NEWS_REQUEST }
    | { type: NewsAvailableAction.FETCH_NEWS_SUCCESS, payload: NewsData[] }
    | { type: NewsAvailableAction.FETCH_NEWS_FAILURE, payload: string }

export type NewsDispatch = React.Dispatch<NewsAction>