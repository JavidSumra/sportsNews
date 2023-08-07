import React, { useEffect } from "react";
import { useNewsState } from "../../context/News/context";
import { NewsData } from "../../context/News/types";
import { Link } from "react-router-dom";
import { useNewsDispatch } from "../../context/News/context";
import { FetchNews } from "../../context/News/actions";

interface PropState {
  sport: string;
  team: string;
}

const FavCard = ({ sport, team }: PropState) => {
  const dispacth = useNewsDispatch();
  useEffect(() => {
    void FetchNews(dispacth);
  }, []);
  //   const { isLoading, isError, errorMessage } = useNewsState();
  const state = useNewsState();
  const { isLoading, isError, errorMessage } = state;
  let { news } = state;
  //   console.log(news);

  if (isError && news.length === 0) {
    return <>{errorMessage}</>;
  }

  if (!isLoading) {
    if (sport && news.length > 0 && !isLoading) {
      news = news.filter((data) => {
        return data.sport.name === sport;
      });
      if (team && news.length > 0) {
        news = news.filter((data) => {
          return data.teams.filter((teamDetail) => {
            return teamDetail.name === team;
          });
        });
      }
    }
    console.log(news);
    return (
      <>
        {news.map((data: NewsData) => (
          <div
            key={data.id}
            className="card flex flex-col lg:flex-row m-2 bg-white rounded-lg hover:shadow-xl duration-300 justify-between "
          >
            <div className="flex flex-col justify-between">
              <div className="middle mx-6 my-3">
                <div className="title text-lg font-bold">{data.title}</div>
                <div className="excerpt text-sm font-medium">
                  {data.summary}
                </div>
              </div>
              <div className="bottom flex justify-between items-center text-sm font-bold w-full">
                <div className="readmore my-2 p-2 text-xl duration-75 w-full">
                  <Link to={`News/${data.id}`}>
                    <button className="bg-gray-500 rounded text-white w-full">
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default FavCard;
