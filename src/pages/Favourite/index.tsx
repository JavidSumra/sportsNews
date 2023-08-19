import React, { useEffect } from "react";
const Favourite = React.lazy(() => import("./Favourite"));

import { FetchSports } from "../../context/Sports/actions";
import { FetchTeams } from "../../context/Teams/actions";
import { useSportsDispatch } from "../../context/Sports/context";
import { useTeamsDispatch } from "../../context/Teams/context";

const FavSection = () => {
  const SportDispatch = useSportsDispatch();
  const teamDispatch = useTeamsDispatch();

  useEffect(() => {
    void FetchSports(SportDispatch);
    void FetchTeams(teamDispatch);
  }, []);
  return <Favourite />;
};
export default FavSection;
