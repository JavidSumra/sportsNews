/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import SportCard from "./SportCard";
import FetchPreferences, { Preferences } from "../FetchPrefrences";
import { useMatchesState } from "../../context/Match/context";
import { LiveMatchData, LiveMatchState } from "../../context/Match/types";
import { nanoid } from "nanoid";

export default function MatchList(): JSX.Element {
  const isLoggedIn = !!localStorage.getItem("userData");
  const { matches, isLoading, isError, errorMessage }: LiveMatchState =
    useMatchesState();
  const [filteredMatches, setFilteredMatches]: [
    LiveMatchData[],
    React.Dispatch<React.SetStateAction<LiveMatchData[]>>
  ] = useState(matches);

  useEffect(() => {
    const fetchPreferences = async (): Promise<void> => {
      if (isLoggedIn) {
        try {
          const data: Preferences = await FetchPreferences();
          const selectedSports: string[] = data.preferences.SelectedSport;
          const SelectedTeams: string[] = data.preferences.SelectedTeams;
          const filtered: LiveMatchData[] = matches.filter(
            (match) =>
              selectedSports.includes(match.sportName) &&
              (SelectedTeams.includes(match?.teams[1]?.name) ||
                SelectedTeams.includes(match?.teams[0]?.name))
          );
          setFilteredMatches(filtered);
        } catch (error) {
          console.log("Error fetching preferences:", error);
        }
      } else {
        setFilteredMatches(matches);
      }
    };

    void fetchPreferences();
  }, [isLoggedIn, matches]);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }
  return filteredMatches.some((match) => match.isRunning === true) ? (
    <div className="flex items-center justify-between m-4">
      {filteredMatches.map((match: LiveMatchData) => (
        <SportCard detail={match} key={nanoid()} />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-between m-4 text-center text-2xl font-medium">
      There is currently no live match.
    </div>
  );
}
