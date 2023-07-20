/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TailSpin } from "react-loader-spinner";

interface propState {
  sportId: number;
}

type team = {
  id: number;
  name: string;
};
interface LiveScore {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: { [key: string]: string };
  teams: team[];
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
    const data = await response.json();
    // console.log(data);
    setData(data);
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData(props.sportId);
  }, [props.sportId]);
  const { score, location, sportName, id } = data;

  if (score) {
    return (
      <div className="w-60 p-2 mx-4 bg-white border border-gray-200 rounded shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
        {Object.keys(score).map((key, index) => (
          <div
            key={index}
            className="flex justify-between items-center font-bold text-xl"
          >
            <div>{key}</div>
            <div>{score[key]}</div>
          </div>
        ))}
      </div>
    );
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
