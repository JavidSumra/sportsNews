/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import {
  useSportsDispatch,
  useSportsState,
} from "../../context/Sports/context";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useTeamsDispatch, useTeamsState } from "../../context/Teams/context";
import FavCard from "./FavCard";
import FetchPreferences, { Preferences } from "../FetchPrefrences";
import { nanoid } from "nanoid";
import { FetchSports } from "../../context/Sports/actions";
import { FetchTeams } from "../../context/Teams/actions";

const Favourite = () => {
  console.log("State Updated");
  const isLoggedIn = !!localStorage.getItem("userData");

  const SportDispatch = useSportsDispatch();
  const teamDispatch = useTeamsDispatch();

  const { teams } = useTeamsState();
  const { sports, isLoading } = useSportsState();

  const [selectedSport, setSelectedSport] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamData, setTeamData] = useState<string[]>([]);
  const [teamPreferences, setTeamPreferences] = useState<string[]>(
    teams.map((team) => team.name)
  );
  const [sportPreferences, setSportPreferences] = useState<string[]>(
    sports.map((sport) => sport.name)
  );

  const handleTeamFilter = (selectedSport: string) => {
    console.log("called");
    if (selectedSport) {
      const getTeams = teams.filter((team) => {
        return team.plays === selectedSport && teamData.includes(team.name);
      });
      console.log(getTeams);
      setTeamPreferences(getTeams.map((team) => team.name));
    } else {
      setTeamPreferences(teams.map((team) => team.name));
    }
  };

  useEffect(() => {
    void FetchSports(SportDispatch);
    void FetchTeams(teamDispatch);
  }, []);

  useEffect(() => {
    const fetchPreferences = async () => {
      const data: Preferences = await FetchPreferences();
      if (
        isLoggedIn &&
        data?.preferences?.SelectedSport.length !== 0 &&
        data?.preferences?.SelectedSport !== undefined
      ) {
        setSportPreferences(data.preferences.SelectedSport ?? []);
      } else if (sports.length > 0) {
        console.log("Else 1");
        setSportPreferences(sports.map((sport) => sport.name));
      }
      if (
        isLoggedIn &&
        data?.preferences?.SelectedTeams.length !== 0 &&
        data?.preferences?.SelectedTeams !== undefined
      ) {
        setTeamData(data?.preferences?.SelectedTeams);
        setTeamPreferences(data.preferences.SelectedTeams ?? []);
      } else if (teams.length > 0) {
        console.log("Else 2");
        setTeamData(teams.map((team) => team.name));
        setTeamPreferences(teams.map((team) => team.name));
      }
    };

    if (isLoggedIn) {
      void fetchPreferences();
    } else {
      console.log("Else 2");
      setTeamData(teams.map((team) => team.name));
      setSportPreferences(sports.map((sport) => sport.name));
      setTeamPreferences(teams.map((team) => team.name));
    }
  }, [sports, FetchPreferences, isLoggedIn]);

  if (isLoading) {
    return <>Loading...</>;
  }
  if (sports) {
    return (
      <>
        <div className="p-4 text-2xl font-bold dark:text-white">Favourites</div>
        <div>
          <Listbox value={selectedSport} onChange={setSelectedSport}>
            <Listbox.Button className=" border w-4/5 dark:hover:bg-gray-400 dark:hover:border-gray-700  dark:bg-gray-500 dark:border-gray-400 dark:text-white rounded-md py-2 px-3 my-2 mx-2 bg-gray-100 text-base text-left">
              {selectedSport ? selectedSport : "Select Sport"}
            </Listbox.Button>
            <Listbox.Options className="absolute overflow-y-auto mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sportPreferences.map((sport) => (
                <Listbox.Option
                  key={nanoid()}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                  value={sport}
                  onClick={() => handleTeamFilter(sport)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {sport}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          <br />
          <Listbox value={selectedTeam} onChange={setSelectedTeam}>
            <Listbox.Button className=" border w-4/5 dark:hover:bg-gray-400 dark:hover:border-gray-700  dark:bg-gray-500 dark:border-gray-400 dark:text-white rounded-md py-2 px-3 my-2 mx-2 bg-gray-100 text-base text-left">
              {selectedTeam ? selectedTeam : "Select Team"}
            </Listbox.Button>
            <Listbox.Options className="absolute overflow-y-auto mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {teamPreferences.map((team: string) => (
                <Listbox.Option
                  key={nanoid()}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                  value={team}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {team}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          <FavCard team={selectedTeam} sport={selectedSport} />
        </div>
      </>
    );
  }
};

export default Favourite;
