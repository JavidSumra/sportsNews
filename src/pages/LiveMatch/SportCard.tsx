/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TailSpin } from "react-loader-spinner";
import { nanoid } from "nanoid";
import { Sports } from "../../context/Sports/types";
import { LiveMatchData } from "../../context/Match/types";

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
  const { isRunning, teams, location, sportName, id } = props.detail;
  const [data, setData] = useState<LiveScore | null>(initialLiveScore);

  const fetchData = async (id: number) => {
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
  };
  console.log(data);

  if (teams && isRunning) {
    return (
      <div
        key={nanoid()}
        className="w-60 p-2 mx-4 bg-white border border-gray-200 rounded shadow hover:bg-gray-100 dark:bg-gray-500 dark:border-gray-300 dark:hover:bg-gray-600 duration-150 dark:text-gray-50"
      >
        <div className="flex justify-between items-center">
          <div className="text-sm font-bold">{sportName}</div>
          <button onClick={() => fetchData(id)}>
            <ArrowPathIcon
              className="h-6 w-6 font-bold hover:rotate-180 ease-linear duration-1000"
              title="Refresh"
            />
          </button>
        </div>
        <div>{location}</div>
        {Object.keys(teams).map((key: any) => (
          <div
            key={nanoid()}
            className="flex justify-between items-center font-bold text-xl"
          >
            <div>{key}</div>
            <div>{teams[key].name}</div>
          </div>
        ))}
      </div>
    );
  } else if (!isRunning) {
    return null;
  } else {
    return (
      <div className="w-60 flex items-center justify-center p-2 mx-4 bg-white border border-gray-200 rounded shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <TailSpin
          height="60"
          width="60"
          color="#414141"
          ariaLabel="tail-spin-loading"
          radius="2"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          key={nanoid()}
        />
      </div>
    );
  }
};

export default SportCard;
