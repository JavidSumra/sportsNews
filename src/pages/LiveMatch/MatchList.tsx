import { useMatchesState } from "../../context/Match/context";
import SportCard from "./SportCard";
import { LiveMatchState, LiveMatchData } from "../../context/Match/types";

export default function MatchList() {
  const state: LiveMatchState = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }
  return (
    <>
      <div className="flex items-center justify-between m-4">
        {matches.map((sport: LiveMatchData) => (
          <SportCard sportId={sport.id} key={sport.id} />
        ))}
      </div>
    </>
  );
}
