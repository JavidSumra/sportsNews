/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";
import { Sports } from "../../context/Sports/types";
import { LiveMatchData } from "../../context/Match/types";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SportCardProps {
  detail: LiveMatchData;
}

interface LiveScore {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: { [key: string]: string };
  teams: { [key: string]: Sports };
  sportName: string;
  playingTeam: number;
  story: string;
}

const initialLiveScore: LiveScore = {
  id: 0,
  isRunning: true,
  name: "",
  location: "",
  startsAt: "",
  endsAt: "",
  score: { team1: "", team2: "" },
  teams: { team1: { id: 0, name: "" }, team2: { id: 0, name: "" } },
  sportName: "",
  playingTeam: 0,
  story: "",
};

const SportCard = (props: SportCardProps) => {
  const isLoggedin = !localStorage.getItem("userData");

  const { isRunning, teams, location, sportName, id } = props.detail;
  const [data, setData] = useState<LiveScore | null>(initialLiveScore);
  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("GuestMatchFav") || "[]")
  );
  const [loginFav, setLoginFav] = useState<number[]>(
    JSON.parse(localStorage.getItem("LoginMacthFav") || "[]")
  );

  // fetchData Function is Used for Fetching Data of Particular Match When User Click on Refresh Button
  const fetchData = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: LiveScore = await response.json();
      if (data.isRunning) {
        setData(data);
      }
    } catch (error) {
      throw new Error(`Failed To Fetch Match Deatils With id : ${id}`);
    }
  };

  useEffect(() => {
    void fetchData(id);
  }, [id]);

  // Function Handles Arrow Icon Rotation
  function handleClick(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    const target = event.target as SVGSVGElement;
    target.classList.toggle("rotate-180");
  }

  // Below Function Handle Favorite
  const addToFav = (id: number): void => {
    if (isLoggedin) {
      const loginUserFav = [...loginFav, id];
      let userFav: number[] = JSON.parse(
        localStorage.getItem("LoginMatchFav") || "[]"
      );
      if (userFav.includes(id)) {
        userFav = userFav.filter((arrId) => arrId !== id);
        localStorage.setItem("LoginMatchFav", JSON.stringify(userFav));
      } else {
        localStorage.setItem("LoginMatchFav", JSON.stringify(loginUserFav));
      }
      setLoginFav(JSON.parse(localStorage.getItem("LoginMatchFav") || "[]"));
    } else {
      const fav = [...favorites, id];
      let userFav: number[] = JSON.parse(
        localStorage.getItem("GuestMatchFav") || "[]"
      );
      if (userFav.includes(id)) {
        userFav = userFav.filter((arrId) => arrId !== id);
        localStorage.setItem("GuestMatchFav", JSON.stringify(userFav));
      } else {
        localStorage.setItem("GuestMatchFav", JSON.stringify(fav));
      }
      setFavorites(JSON.parse(localStorage.getItem("GuestMatchFav") || "[]"));
    }
  };
  if (!data) {
    return (
      <div className="flex items-center justify-between">
        <Skeleton width={250} height={135} className="flex" />
      </div>
    );
  }
  if (teams && isRunning) {
    return (
      <div
        key={nanoid()}
        className="w-60 p-2 group mx-4 bg-white border border-gray-200 rounded shadow hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-400 dark:hover:bg-gray-600 duration-150"
      >
        <div className="flex justify-between items-center">
          <div className="text-sm font-bold">{sportName}</div>
          <div>
            <button onClick={() => addToFav(id)}>
              {isLoggedin && loginFav.includes(id) ? (
                <SolidHeartIcon className="w-8 h-8 duration-150 hover:-translate-y-1 text-rose-500 dark:text-rose-400  dark:hover:text-rose" />
              ) : !isLoggedin && favorites.includes(id) ? (
                <SolidHeartIcon className="w-8 h-8  duration-150 hover:-translate-y-1 text-rose-500 dark:text-rose-400  dark:hover:text-rose" />
              ) : (
                <HeartIcon className="w-8 h-8  text-rose-400 opacity-0 group-hover:opacity-100 duration-150 hover:-translate-y-1 " />
              )}
            </button>
            <button onClick={() => fetchData(id)}>
              <ArrowPathIcon
                className="w-6 h-6 font-bold transition duration-1000 ease-in-out transform"
                onClick={handleClick}
                title="Refresh"
              />
            </button>
          </div>
        </div>
        <div>{location}</div>
        {Object.keys(teams).map((key: any) => (
          <div
            key={nanoid()}
            className="flex justify-between items-center font-bold text-xl"
          >
            <div>{data.score[teams[key].name]}</div>
            <div>{teams[key].name}</div>
          </div>
        ))}
      </div>
    );
  }
};

export default SportCard;
