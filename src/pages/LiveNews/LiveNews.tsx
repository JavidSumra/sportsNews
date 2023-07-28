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

import { Listbox, Transition } from "@headlessui/react";

import Favourite from "./Favourite";
interface sorting {
  name: string;
  id: number;
}

const sort: sorting[] = [
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
  }, []);

  const { sports, isLoading, isError, errorMessage } = useSportsState();
  // console.log(sports);
  return (
    <div className="m-4">
      <div className="font-[Poppins] text-2xl font-bold">Trending News</div>
      <div className="flex  m-3 bg-gray-200 rounded-lg">
        <div className="flex  p-2 overflow-auto flex-col  justify-between items-start w-4/5">
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

            <div className="w-3/12 ">
              <Listbox value={selectedSort} onChange={setSelectedSort}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="text-sm font-medium text-gray-700">
                      Sort By:
                    </Listbox.Label>
                    <div className="relative flex items-center justify-around">
                      <span className="inline-block w-full">
                        <Listbox.Button className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 relative border shadow-md border-gray-300 rounded text-gray-800">
                          <span className="block truncate">
                            {selectedSort ? selectedSort?.name : "Date"}
                          </span>
                          <Transition
                            show={open}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="border border-gray-300 rounded mt-1 w-full"
                            >
                              {sort.map((sorting) => (
                                <Listbox.Option
                                  key={sorting.id}
                                  value={sorting}
                                >
                                  {({ selected, active }) => (
                                    <div
                                      className={`${
                                        active
                                          ? "text-white bg-indigo-600"
                                          : "text-gray-900"
                                      } cursor-default select-none relative py-2 pl-10 pr-4`}
                                    >
                                      <span
                                        className={`${
                                          selected
                                            ? "font-semibold"
                                            : "font-normal"
                                        }`}
                                      >
                                        {sorting.name}
                                      </span>
                                      {selected && (
                                        <span
                                          className={`${
                                            active
                                              ? "text-white"
                                              : "text-indigo-600"
                                          } absolute inset-y-0 left-0 flex items-center pl-2`}
                                        >
                                          <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </Listbox.Button>
                      </span>
                      <FunnelIcon className="w-10 h-10 bg-gray-300 mx-4 p-1 rounded" />
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
          <NewsList sportName={sportName} filter={selectedSort} />
        </div>
        <div className="bg-gray-300 w-3/12 rounded-r-lg dark:bg-gray-500">
          <aside>
            <Favourite />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LiveNews;
