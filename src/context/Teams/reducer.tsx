import { Reducer } from "react";
import {
  TeamsState,
  TeamActions,
  TeamsAvailableAction,
  initialState,
} from "./types";

export const TeamReducer: Reducer<TeamsState, TeamActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TeamsAvailableAction.FETCH_TEAMS_REQUEST:
      return { ...state, isLoading: true };
    case TeamsAvailableAction.FETCH_TEAMS_SUCCESS:
      return { ...state, isLoading: false, teams: action.payload };
    case TeamsAvailableAction.FETCH_TEAMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
