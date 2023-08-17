import { useMemo, useState } from "react";
import { useNewsState } from "../../context/News/context";
import { NewsData } from "../../context/News/types";
import { Link } from "react-router-dom";
import FetchPreferences, { Preferences } from "../FetchPrefrences";

interface PropState {
  sport: string;
  team: string;
}

const FavCard = ({ sport, team }: PropState) => {
  const isLoggedIn = !!localStorage.getItem("userData");

  const state = useNewsState();
  const { news, isLoading, isError, errorMessage } = state;
  const [newsList, setNewsList] = useState(news);

  useMemo(() => {
    let filteredNews = news;

    if (sport) {
      filteredNews = filteredNews.filter((newsData) => {
        return newsData.sport.name === sport;
      });
    }

    if (team) {
      filteredNews = filteredNews.filter((newsData) => {
        return newsData.teams.some(({ name }) => name === team);
      });
    }

    if (isLoggedIn) {
      const fetchPreferences = async (): Promise<void> => {
        try {
          const data: Preferences = await FetchPreferences();
          if (
            data?.preferences?.SelectedSport.length !== 0 &&
            data?.preferences?.SelectedSport !== undefined
          ) {
            const selectedSports: string[] =
              data?.preferences?.SelectedSport ?? [];
            filteredNews = filteredNews.filter((newsData) =>
              selectedSports.includes(newsData.sport.name)
            );
            setNewsList(filteredNews);
          }
        } catch (error) {
          console.log("Error fetching preferences:", error);
        }
      };

      void fetchPreferences();
    }

    return filteredNews;
  }, [isLoggedIn, news, sport, team]);

  if (isError && news.length === 0) {
    return <>{errorMessage}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  // console.log(newsList);

  return (
    <>
      {newsList.map((data: NewsData) => (
        <div
          key={data.id}
          className="card border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-600  dark:hover:bg-gray-500 flex flex-col lg:flex-row m-2 bg-white rounded-lg hover:shadow-xl duration-300 justify-between "
        >
          <div className="flex flex-col  justify-between">
            <div className="type text-start mt-2 ml-4 text-gray-300 font-medium text-sm">
              {data.sport.name}
            </div>
            <div className="middle mx-6 my-3">
              <div className="title text-lg font-bold">{data.title}</div>
              <div className="summ text-sm font-medium">{data.summary}</div>
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
