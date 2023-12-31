/* eslint-disable @typescript-eslint/no-unused-vars */

import { useContext, useEffect, useMemo, useState } from "react";
import { useSportsState } from "../../context/Sports/context";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useTeamsState } from "../../context/Teams/context";
import FavCard from "./FavCard";
import FetchPreferences, { Preferences } from "../FetchPrefrences";
import { nanoid } from "nanoid";

import { OutletContext } from "../../context/outlet";
import Skeleton from "react-loading-skeleton";

const Favourite = () => {
  const isLoggedIn = !!localStorage.getItem("userData");

  const { isOpen } = useContext(OutletContext);

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

  // Following Functioon Handle Filter of Team For Particular Sport
  useMemo(() => {
    if (isLoggedIn) {
      const getTeams = selectedSport
        ? teams.filter((team) => {
            return team.plays === selectedSport && teamData.includes(team.name);
          })
        : teams;
      setTeamPreferences(getTeams.map((team) => team.name));
    } else {
      const teamsPlay = selectedSport
        ? teams.filter((team) => team.name && team.plays === selectedSport)
        : teams;
      setTeamPreferences(teamsPlay.map((team) => team.name));
    }
  }, [selectedSport]);

  useEffect(() => {
    // Following Function is Used For Fetching Prefrences For Login User
    const fetchPreferences = async () => {
      const data: Preferences = await FetchPreferences();
      if (
        isLoggedIn &&
        data?.preferences?.SelectedSport?.length !== 0 &&
        data?.preferences?.SelectedSport !== undefined
      ) {
        setSportPreferences(data?.preferences?.SelectedSport ?? []);
      } else if (sports.length > 0) {
        setSportPreferences(sports.map((sport) => sport.name));
      }

      if (
        isLoggedIn &&
        data?.preferences?.SelectedTeams?.length !== 0 &&
        data?.preferences?.SelectedTeams !== undefined
      ) {
        setTeamData(data?.preferences?.SelectedTeams);
        setTeamPreferences(data?.preferences?.SelectedTeams ?? []);
      } else if (teams.length > 0) {
        if (data?.preferences?.SelectedSport?.length > 0 && teams) {
          setTeamData(
            teams
              .filter((team) =>
                data?.preferences?.SelectedSport.includes(team.plays)
              )
              .map((team) => team.name)
          );
          setTeamPreferences(
            teams
              .filter((team) =>
                data?.preferences?.SelectedSport.includes(team.plays)
              )
              .map((team) => team.name)
          );
        } else {
          setTeamData(teams.map((team) => team.name));
          setTeamPreferences(teams.map((team) => team.name));
        }
      }
    };

    if (isLoggedIn) {
      void fetchPreferences();
    } else {
      setTeamData(teams.map((team) => team.name));
      setSportPreferences(sports.map((sport) => sport.name));
      setTeamPreferences(teams.map((team) => team.name));
    }
  }, [isOpen, sports, FetchPreferences, isLoggedIn, teams]);

  if (isLoading) {
    return (
      <>
        <div className="p-4 text-2xl font-bold dark:text-white">Favourites</div>
        <div className="flex items-center justify-between flex-col">
          <Skeleton width={220} height={40} />
          <Skeleton width={220} height={40} />
        </div>
      </>
    );
  }
  if (sports) {
    return (
      <>
        <div className="p-4 text-2xl font-bold dark:text-white">Favourites</div>
        <div>
          <Listbox value={selectedSport} onChange={setSelectedSport}>
            <Listbox.Button className="border w-4/5 font-bold dark:hover:bg-gray-400 dark:hover:border-gray-700  dark:bg-gray-500 dark:border-gray-400 dark:text-white rounded-md py-2 px-3 my-2 mx-2 bg-gray-100 text-base text-left">
              {selectedSport ? selectedSport : "Select Sport"}
            </Listbox.Button>
            <Listbox.Options className="absolute dark:bg-slate-900  overflow-y-auto mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sportPreferences.map((sport) => (
                <Listbox.Option
                  key={nanoid()}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-blue-100 text-blue-900 dark:bg-slate-700 dark:text-slate-50"
                        : "text-gray-900 dark:text-white"
                    }`
                  }
                  value={sport}
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
            <Listbox.Button className=" border w-4/5 font-bold dark:hover:bg-gray-400 dark:hover:border-gray-700  dark:bg-gray-500 dark:border-gray-400 dark:text-white rounded-md py-2 px-3 my-2 mx-2 bg-gray-100 text-base text-left">
              {selectedTeam ? selectedTeam : "Select Team"}
            </Listbox.Button>
            <Listbox.Options className="absolute dark:bg-slate-900  overflow-y-auto mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {teamPreferences.map((team: string) => (
                <Listbox.Option
                  key={nanoid()}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-blue-100 text-blue-900 dark:bg-slate-700 dark:text-slate-50"
                        : "text-gray-900 dark:text-white"
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
          <div className="overflow-x-auto max-h-screen">
            <FavCard team={selectedTeam} sport={selectedSport} />
          </div>
        </div>
      </>
    );
  }
};

export default Favourite;
