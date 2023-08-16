/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from "react";
import { FetchMatches } from "../../context/Match/actions";
import { useMatchesDispatch } from "../../context/Match/context";
import MatchesList from "./MatchList";

const LiveScore: React.FC = () => {
  const dispactchMatches = useMatchesDispatch();
  useEffect(() => {
    FetchMatches(dispactchMatches);
  }, [dispactchMatches]);
  return (
    <>
      <div className="font-[Poppins] text-2xl font-bold dark:text-gray-50">
        Live Score
      </div>
      <div className="flex overflow-auto">
        <MatchesList />
      </div>
    </>
  );
};
export default LiveScore;
