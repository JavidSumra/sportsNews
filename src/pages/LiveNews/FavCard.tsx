/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect } from "react";
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
  }, [dispacth]);
  //   const { isLoading, isError, errorMessage } = useNewsState();
  const state = useNewsState();
  const { isLoading, isError, errorMessage } = state;
  let { news } = state;
  //   console.log(news);

  if (isError && news.length === 0) {
    return <>{errorMessage}</>;
  }

  if (!isLoading) {
    if (sport || team) {
      news = news.filter((data) => {
        if (sport && data.sport.name !== sport) {
          return false;
        }
        if (team && !data.teams.some(({ name }) => name === team)) {
          return false;
        }
        return true;
      });
    }
  }
  // console.log(news);
  return (
    <>
      {news.map((data: NewsData) => (
        <div
          key={data.id}
          className="card border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-600  dark:hover:bg-gray-500 flex flex-col lg:flex-row m-2 bg-white rounded-lg hover:shadow-xl duration-300 justify-between "
        >
          <div className="flex flex-col justify-between">
            <div className="middle mx-6 my-3">
              <div className="title text-lg font-bold">{data.title}</div>
              <div className="excerpt text-sm font-medium">{data.summary}</div>
            </div>
            <div className="bottom flex justify-between items-center text-sm font-bold w-full">
              <div className="readmore my-2 p-2 text-xl duration-75 w-full">
                <Link to={`News/${data.id}`}>
                  <button className="bg-gray-500 dark:bg-gray-700 rounded text-white w-full">
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
};

export default FavCard;
