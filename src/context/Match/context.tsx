/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useReducer } from "react";
import { MatchReducer } from "./reducer";
import { LiveMatchState, MatchDispatch, initialState } from "./types";

const MatchesStateContext = createContext<LiveMatchState>(initialState);
const MatcheDispatchContext = createContext<MatchDispatch>(() => {});

export const MatchesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispacth] = useReducer(MatchReducer, initialState);
  return (
    <MatchesStateContext.Provider value={state}>
      <MatcheDispatchContext.Provider value={dispacth}>
        {children}
      </MatcheDispatchContext.Provider>
    </MatchesStateContext.Provider>
  );
};

export const useMatchesState = () => useContext(MatchesStateContext);
export const useMatchesDispatch = () => useContext(MatcheDispatchContext);
