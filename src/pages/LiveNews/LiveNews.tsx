/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";
import NewsList from "./NewsList";
import { useNewsDispatch } from "../../context/News/context";
import { FetchNews } from "../../context/News/actions";
import Sort from "./Sort";

const LiveNews = () => {
  const dispacth = useNewsDispatch();

  React.useEffect(() => {
    FetchNews(dispacth);
  }, []);

  return (
    <div className="m-4">
      <div className="font-[Poppins] text-2xl font-bold">Trending News</div>
      <div className="flex  p-4 m-3 bg-gray-100 rounded">
        <div className="flex overflow-auto flex-col  justify-between items-start w-4/5">
          <Sort />
          <NewsList />
        </div>
        <div className="">
          <aside>Favourite</aside>
        </div>
      </div>
    </div>
  );
};

export default LiveNews;
