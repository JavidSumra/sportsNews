/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useContext, useEffect, useState } from "react";
import SportCard from "./SportCard";
import FetchPreferences, { Preferences } from "../FetchPrefrences";
import { useMatchesState } from "../../context/Match/context";
import { LiveMatchData, LiveMatchState } from "../../context/Match/types";
import { nanoid } from "nanoid";
import { OutletContext } from "../../context/outlet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MatchList(): JSX.Element {
  const isLoggedIn = !!localStorage.getItem("userData");
  const navigate = useNavigate();

  const { isOpen } = useContext(OutletContext);

  const { matches, isLoading, isError, errorMessage }: LiveMatchState =
    useMatchesState();
  const [filteredMatches, setFilteredMatches]: [
    LiveMatchData[],
    React.Dispatch<React.SetStateAction<LiveMatchData[]>>
  ] = useState(matches);

  useEffect(() => {
    // Following Function is Used to Fetch Selected Option of Login User
    const fetchPreferences = async (): Promise<void> => {
      if (isLoggedIn) {
        try {
          const data: Preferences = await FetchPreferences();

          if (data?.errors) {
            // Below IF Condition Redirect User on Login Page if Authentication Fail from API
            if (data?.errors) {
              toast.error("Authentication Failed\nPlease Try To Login Again", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }

            navigate("/login");
          }

          if (
            (data?.preferences?.SelectedSport?.length !== 0 &&
              data?.preferences?.SelectedSport !== undefined) ||
            (data?.preferences?.SelectedTeams?.length !== 0 &&
              data?.preferences?.SelectedTeams !== undefined)
          ) {
            const selectedSports: string[] =
              data?.preferences?.SelectedSport ?? [];
            const SelectedTeams: string[] =
              data?.preferences?.SelectedTeams ?? [];
            if (SelectedTeams.length > 0) {
              const filtered: LiveMatchData[] = matches.filter(
                (match) =>
                  SelectedTeams.includes(match?.teams[1]?.name) ||
                  SelectedTeams.includes(match?.teams[0]?.name)
              );
              setFilteredMatches(filtered);
            } else {
              const filtered: LiveMatchData[] = matches.filter((match) =>
                selectedSports.includes(match.sportName)
              );
              setFilteredMatches(filtered);
            }
          } else {
            setFilteredMatches(matches);
          }
        } catch (error) {
          console.log("Error fetching preferences:", error);
        }
      }
    };

    if (isLoggedIn) {
      void fetchPreferences();
    } else {
      setFilteredMatches(matches);
    }
  }, [isOpen, isLoggedIn, matches]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-between">
        <Skeleton width={250} height={135} className="mx-4" />
        <Skeleton width={250} height={135} className="mx-4" />
        <Skeleton width={250} height={135} className="mx-4" />
      </div>
    );
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return filteredMatches.some((match) => match.isRunning === true) &&
    !isLoading ? (
    <div className="flex items-center justify-between m-4">
      {filteredMatches.map((match: LiveMatchData) => (
        <SportCard detail={match} key={nanoid()} />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-between m-4 text-center text-2xl font-medium">
      At the moment, there are no ongoing Live Matches.
    </div>
  );
}
