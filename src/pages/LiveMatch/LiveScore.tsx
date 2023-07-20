/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from "react";
import { FetchMatches } from "../../context/Match/actions";
import { useMatchesDispatch } from "../../context/Match/context";
import MatchesList from "./MatchList";

const LiveScore: React.FC = () => {
  const dispactchMatches = useMatchesDispatch();
  useEffect(() => {
    FetchMatches(dispactchMatches);
  }, []);
  return (
    <div className="m-4">
      <div className="font-[Poppins] text-2xl font-bold">Live Score</div>
      <div className="flex overflow-auto ">
        <MatchesList />
      </div>
    </div>
  );
};
export default LiveScore;
