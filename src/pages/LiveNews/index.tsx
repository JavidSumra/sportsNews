/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { Suspense, useEffect } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { FetchNews } from "../../context/News/actions";
import { FetchSports } from "../../context/Sports/actions";
import { FetchTeams } from "../../context/Teams/actions";
import { useNewsDispatch } from "../../context/News/context";
import { useSportsDispatch } from "../../context/Sports/context";
import { useTeamsDispatch } from "../../context/Teams/context";
const LiveNews = React.lazy(() => import("./LiveNews"));

const NewsSection = () => {
  const dispacth = useNewsDispatch();
  const SportDispatch = useSportsDispatch();
  const teamDispatch = useTeamsDispatch();

  useEffect(() => {
    FetchNews(dispacth);
    FetchSports(SportDispatch);
    FetchTeams(teamDispatch);
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <LiveNews />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default NewsSection;
