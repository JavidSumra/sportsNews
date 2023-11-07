import { Sports } from "../Sports/types";

export type Team = Sports & {
  plays: string;
};
export interface TeamsState {
  teams: Team[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: TeamsState = {
  teams: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export enum TeamsAvailableAction {
  FETCH_TEAMS_REQUEST = "FETCH_TEAMS_REQUEST",
  FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS",
  FETCH_TEAMS_FAILURE = "FETCH_TEAMS_FAILURE",
}

export type TeamActions =
  | { type: TeamsAvailableAction.FETCH_TEAMS_REQUEST }
  | { type: TeamsAvailableAction.FETCH_TEAMS_SUCCESS; payload: Team[] }
  | { type: TeamsAvailableAction.FETCH_TEAMS_FAILURE; payload: string };

export type TeamsDispatch = React.Dispatch<TeamActions>;
