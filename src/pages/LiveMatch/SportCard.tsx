/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TailSpin } from "react-loader-spinner";
import { nanoid } from "nanoid";
import { Sports } from "../../context/Sports/types";
interface propState {
  sportId: number;
}

interface LiveScore {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: { [key: string]: string };
  teams: Sports[];
  sportName: string;
  playingTeam: number;
  story: string;
}

const SportCard = (props: propState) => {
  const [data, setData] = useState<LiveScore>([]);

  const fetchData = async (id: number) => {
    const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: LiveScore = await response.json();
    // console.log(data);
    if (data.isRunning) {
      setData(data);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData(props.sportId);
  }, [props.sportId]);
  const { score, location, sportName, id, isRunning } = data;

  if (score) {
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
        {Object.keys(score).map((key) => (
          <div
            key={nanoid()}
            className="flex justify-between items-center font-bold text-xl"
          >
            <div>{key}</div>
            <div>{score[key]}</div>
          </div>
        ))}
      </div>
    );
  } else if (!isRunning) {
    return;
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
        />
      </div>
    );
  }
};
export default SportCard;
