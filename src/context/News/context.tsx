/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useReducer } from "react";
import { NewsReducer } from "./reducer";
import { NewsState, NewsDispatch, initialState } from "./types";

const NewsStateContext = createContext<NewsState>(initialState);
const NewsDispatchContext = createContext<NewsDispatch>(() => {});

export const NewsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispacth] = useReducer(NewsReducer, initialState);
  return (
    <NewsStateContext.Provider value={state}>
      <NewsDispatchContext.Provider value={dispacth}>
        {children}
      </NewsDispatchContext.Provider>
    </NewsStateContext.Provider>
  );
};

export const useNewsState = () => useContext(NewsStateContext);
export const useNewsDispatch = () => useContext(NewsDispatchContext);
