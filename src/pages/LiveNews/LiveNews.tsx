/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from "react";
import NewsList from "./NewsList";
import { FetchNews } from "../../context/News/actions";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { FetchSports } from "../../context/Sports/actions";
import { FetchTeams } from "../../context/Teams/actions";

import { useTeamsDispatch } from "../../context/Teams/context";
import { useNewsDispatch } from "../../context/News/context";
import {
  useSportsDispatch,
  useSportsState,
} from "../../context/Sports/context";

import { CheckIcon } from "@heroicons/react/24/outline";
import { Listbox } from "@headlessui/react";

import Favourite from "./Favourite";
import { Outlet } from "react-router-dom";
interface Sorting {
  name: string;
  id: number;
}

const Sort: Sorting[] = [
  { id: 1, name: "Date" },
  { id: 2, name: "Title" },
  { id: 3, name: "Sport Type" },
];

const isLoggedIn = !!localStorage.getItem("authToken");

const LiveNews = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [sportName, setSportName] = useState("");

  const dispacth = useNewsDispatch();
  const SportDispatch = useSportsDispatch();
  const teamDispatch = useTeamsDispatch();

  const changeFilter = (name: string): void => {
    setSportName(name);
  };

  React.useEffect(() => {
    FetchNews(dispacth);
    FetchSports(SportDispatch);
    FetchTeams(teamDispatch);
  }, [SportDispatch, dispacth, teamDispatch]);

  const { sports } = useSportsState();
  // console.log(sports);
  return (
    <div className="m-4">
      <div className="font-[Poppins] text-2xl font-bold">Trending News</div>
      <div className="flex  m-3 bg-gray-200 rounded-lg">
        <div className="flex  p-2 overflow-auto flex-col   items-start w-4/5">
          <div className="flex items-center justify-between mb-8 w-full px-4 ">
            {!isLoggedIn && sports.length > 0 ? (
              <div className="flex items-center justify-around overflow-x-auto mx-4 w-4/5">
                <button
                  className={`font-lg  mx-4 duration-150 ${
                    sportName === ""
                      ? "border-b-2 border-black p-2 font-bold text-black   text-lg"
                      : "text-gray-400 text-sm"
                  }`}
                  onClick={() => changeFilter("")}
                >
                  Your News
                </button>
                {sports.map((sport) => (
                  <button
                    key={sport.id}
                    className={`font-lg  mx-4 duration-150 ${
                      sportName === sport.name
                        ? "border-b-2 border-black p-2 font-bold text-black text-lg "
                        : "text-gray-400 text-sm"
                    }`}
                    onClick={() => changeFilter(sport.name)}
                  >
                    {sport.name}
                  </button>
                ))}
              </div>
            ) : (
              "Not Loaded"
            )}

            <div className=" flex items-center justify-between">
              <Listbox value={selectedSort} onChange={setSelectedSort}>
                <Listbox.Label>Sort By:</Listbox.Label>
                <Listbox.Button className=" border rounded-md py-2 px-3 my-2 mx-2 bg-gray-100 text-base text-left">
                  {selectedSort ? selectedSort : "Team"}
                </Listbox.Button>
                <Listbox.Options className="absolute overflow-y-auto mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {Sort.map((team: Sorting) => (
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
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
              <FunnelIcon className="w-10 h-10 bg-gray-300 mx-4 p-1 rounded" />
            </div>
          </div>
          <NewsList sportName={sportName} filter={selectedSort} />
          <Outlet />
        </div>
        <div className="bg-gray-300 w-3/12 rounded-r-lg dark:bg-gray-400">
          <aside>
            <Favourite />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LiveNews;
