/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from "react";
import NewsList from "./NewsList";
import { useNewsDispatch } from "../../context/News/context";
import { FetchNews } from "../../context/News/actions";
import { FunnelIcon } from "@heroicons/react/24/outline";
import {
  useSportsDispatch,
  useSportsState,
} from "../../context/Sports/context";
import { FetchSports } from "../../context/Sports/actions";
const isLoggedIn = !!localStorage.getItem("authToken");

const LiveNews = () => {
  const [sportName, setSportName] = useState("");
  const dispacth = useNewsDispatch();
  const SportDispatch = useSportsDispatch();

  const changeFilter = (name: string): void => {
    setSportName(name);
  };

  React.useEffect(() => {
    FetchNews(dispacth);
    FetchSports(SportDispatch);
  }, []);

  const { sports, isLoading, isError, errorMessage } = useSportsState();
  console.log(sports);
  return (
    <div className="m-4">
      <div className="font-[Poppins] text-2xl font-bold">Trending News</div>
      <div className="flex  m-3 bg-gray-200 rounded-lg">
        <div className="flex  p-4 overflow-auto flex-col  justify-between items-start w-4/5">
          <div className="flex items-center justify-between mb-8 w-full px-4 overflow-x-auto">
            {!isLoggedIn && sports.length > 0 ? (
              <div className="flex items-center justify-around ">
                <button
                  className={`font-lg  text-lg mx-4 duration-150 ${
                    sportName === ""
                      ? "border-b-2 border-black p-2 font-bold text-black"
                      : "text-gray-400"
                  }`}
                  onClick={() => changeFilter("")}
                >
                  Your News
                </button>
                {sports.map((sport) => (
                  <button
                    className={`font-lg  text-lg mx-4 duration-150 ${
                      sportName === sport.name
                        ? "border-b-2 border-black p-2 font-bold text-black"
                        : "text-gray-400"
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

            <div>
              <FunnelIcon className="w-5 h-5" />
            </div>
          </div>
          <NewsList sportName={sportName} />
        </div>
        <div className="bg-gray-300 w-3/12 rounded-r-lg">
          <aside>Favourite</aside>
        </div>
      </div>
    </div>
  );
};

export default LiveNews;
