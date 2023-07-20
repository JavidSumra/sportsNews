/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";
import NewsList from "./NewsList";
import { useNewsDispatch } from "../../context/News/context";
import { FetchNews } from "../../context/News/actions";

const LiveNews = () => {
  const dispacth = useNewsDispatch();

  React.useEffect(() => {
    FetchNews(dispacth);
  }, []);

  return (
    <div className="m-4">
      <div className="font-[Poppins] text-2xl font-bold">Trending News</div>
      <div className="flex overflow-auto ">
        <NewsList />
      </div>
    </div>
  );
};

export default LiveNews;
