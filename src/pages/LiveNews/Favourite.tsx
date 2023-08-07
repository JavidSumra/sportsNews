import React from "react";
import { useSportsState } from "../../context/Sports/context";
import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useTeamsState } from "../../context/Teams/context";
import { Team } from "../../context/Teams/types";
import FavCard from "./FavCard";

const Favourite = () => {
  let { teams } = useTeamsState();
  const { sports } = useSportsState();
  const [selectedSport, setSelectedSport] = React.useState("");
  const [selectedTeam, setSelectedTeam] = React.useState("");

  if (selectedSport) {
    console.log(selectedSport);
    teams = teams.filter((team) => {
      return team.plays == selectedSport;
    });
    // console.log(teams);
  }

  if (sports) {
    return (
      <>
        <div className="p-4 text-2xl font-bold dark:text-gray-100">
          Favourites
        </div>
        <div>
          <Listbox value={selectedSport} onChange={setSelectedSport}>
            <Listbox.Button className=" border rounded-md py-2 px-3 my-2 mx-2 bg-gray-100 text-base text-left">
              {selectedSport ? selectedSport : "Select Sport"}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sports.map((sport) => (
                <Listbox.Option
                  key={sport.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                  value={sport.name}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {sport.name}
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
            <Listbox.Button className=" border rounded-md py-2 px-3 my-2 mx-2 bg-gray-100 text-base text-left">
              {selectedTeam ? selectedTeam : "Select Team"}
            </Listbox.Button>
            <Listbox.Options className="absolute overflow-y-auto mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {teams.map((team: Team) => (
                <Listbox.Option
                  key={team.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                  value={team.name}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {team.name}
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
