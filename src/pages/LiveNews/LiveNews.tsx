/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect, Suspense, useContext } from "react";
const NewsList = React.lazy(() => import("./NewsList"));

import { FunnelIcon } from "@heroicons/react/24/outline";

import { useSportsState } from "../../context/Sports/context";

import { CheckIcon } from "@heroicons/react/24/outline";
import { Listbox } from "@headlessui/react";

import Favourite from "../Favourite";
import { nanoid } from "nanoid";
import FetchPreferences, { Preferences } from "../FetchPrefrences";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import { OutletContext } from "../../context/outlet";

interface Sorting {
  name: string;
  id: number;
}

// Sort Store The Option's Name For Sorting
const Sort: Sorting[] = [
  { id: 1, name: "Date" },
  { id: 2, name: "Title" },
  { id: 3, name: "Sport Type" },
];

const LiveNews = () => {
  const isLoggedIn = !!localStorage.getItem("userData");

  const { sports } = useSportsState();

  const { isOpen } = useContext(OutletContext);

  const [selectedSort, setSelectedSort] = useState("");
  const [sportName, setSportName] = useState("");
  const [preferences, setPreferences] = useState<string[]>(
    sports.map((sport) => sport.name)
  );

  // changeFilter Funtion is Used For Handling Filter Name change
  const changeFilter = (name: string): void => {
    setSportName(name);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchPreferences = async () => {
        try {
          const data: Preferences = await FetchPreferences();

          if (
            isLoggedIn &&
            data?.preferences?.SelectedSport.length !== 0 &&
            data?.preferences?.SelectedSport !== undefined
          ) {
            setPreferences(data?.preferences?.SelectedSport);
          } else if (sports.length > 0) {
            setPreferences(sports.map((sport) => sport.name));
          } else {
            setPreferences(sports.map((sport) => sport.name));
          }
        } catch (error) {
          console.log("Error In Live News", error);
        }
      };
      void fetchPreferences();
    } else {
      setPreferences(sports.map((sport) => sport.name));
    }
  }, [FetchPreferences, isOpen]);

  return (
    <div className="m-4">
      <div className="font-[Poppins] text-2xl font-bold ">Trending News</div>
      <div className="flex  m-3 bg-gray-200 rounded-lg dark:bg-gray-600 dark:text-white">
        <div className="flex scrollBar  p-2 overflow-auto flex-col items-start w-4/5 max-[766px]:w-full">
          <div className="flex items-center justify-between mb-8 w-full px-4 ">
            {!isLoggedIn && sports.length > 0 ? (
              <div className="flex items-center justify-around overflow-x-auto mx-4 w-4/5">
                <button
                  className={`font-lg  mx-1 duration-150 ${
                    sportName === ""
                      ? "border-b-2 border-black dark:text-gray-50 p-2 font-bold text-black   text-lg"
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
                        ? "border-b-2 dark:text-gray-50 border-black p-2 font-bold text-black text-lg "
                        : "text-gray-400 text-sm"
                    }`}
                    onClick={() => changeFilter(sport.name)}
                  >
                    {sport.name}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-around overflow-x-auto mx-4 w-4/5">
                <button
                  className={`font-lg  mx-1 duration-75 ${
                    sportName === ""
                      ? "border-b-2 border-black dark:text-gray-50 dark:border-gray-900  p-2 font-bold text-black   text-lg"
                      : "text-gray-400 text-sm dark:text-gray-300"
                  }`}
                  onClick={() => changeFilter("")}
                >
                  Your News
                </button>
                {preferences.map((sport) => (
                  <button
                    key={nanoid()}
                    className={`font-lg  mx-4 duration-75 ${
                      sportName === sport
                        ? "border-b-2 dark:text-gray-50 dark:border-gray-900 border-black p-2 font-bold text-black text-lg "
                        : "text-gray-400 dark:text-gray-300 text-sm"
                    }`}
                    onClick={() => changeFilter(sport)}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center w-1/3 justify-around">
              <div>
                <Listbox value={selectedSort} onChange={setSelectedSort}>
                  <Listbox.Button className="flex justify-around border rounded-md py-2 px-3 my-2 mx-2 bg-gray-100 text-base text-left w-full dark:bg-gray-500 dark:border-gray-400 dark:text-white">
                    <Listbox.Label className="font-medium">
                      Sort By:
                    </Listbox.Label>
                    {selectedSort ? selectedSort : "Team"}
                  </Listbox.Button>
                  <Listbox.Options className="absolute overflow-y-auto mt-1 max-h-60 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {Sort.map((team: Sorting) => (
                      <Listbox.Option
                        key={team.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-blue-100 text-blue-900"
                              : "text-gray-900"
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
              </div>
              <div className="mx-2 cursor-pointer">
                <FunnelIcon className="w-10 h-10 bg-gray-300 dark:bg-gray-500 dark:border-gray-200 border mx-2 p-1 rounded" />
              </div>
            </div>
          </div>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <NewsList sportName={sportName} filter={selectedSort} />
            </Suspense>
          </ErrorBoundary>
          <Outlet />
        </div>
        <div className="bg-gray-300 w-3/12 rounded-r-lg dark:bg-gray-700 max-[766px]:hidden">
          <aside>
            <Favourite />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LiveNews;
