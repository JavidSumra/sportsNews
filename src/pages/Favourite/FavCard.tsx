import { useState, useEffect, useContext } from "react";
import { useNewsDispatch, useNewsState } from "../../context/News/context";
import { NewsData } from "../../context/News/types";
import { Link } from "react-router-dom";
import FetchPreferences, { Preferences } from "../FetchPrefrences";
import { FetchNews } from "../../context/News/actions";
import { OutletContext } from "../../context/outlet";
import SkeletonLoading from "./SkeletonLoading";

interface PropState {
  sport: string;
  team: string;
}

const FavCard = ({ sport, team }: PropState) => {
  const isLoggedIn = !!localStorage.getItem("userData");

  const { isOpen } = useContext(OutletContext);

  const dispatch = useNewsDispatch();

  const state = useNewsState();
  const { news, isLoading, isError, errorMessage } = state;
  const [newsList, setNewsList] = useState<NewsData[]>(news);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    FetchNews(dispatch);
  }, []);

  useEffect(() => {
    let filteredNews = [...news];

    // Following Two If Condition Are Used For Filtering of Data on Base of Selected Team and Sport Type
    if (sport) {
      filteredNews = filteredNews.filter(
        (newsData) => newsData.sport.name === sport
      );
    }

    if (team) {
      filteredNews = filteredNews.filter((newsData) =>
        newsData.teams.some(({ name }) => name === team)
      );
    }

    // Following Condition set News for on base of User Login Condition
    if (isLoggedIn) {
      const fetchPreferences = async () => {
        try {
          const data: Preferences = await FetchPreferences();
          if (data?.preferences?.SelectedSport?.length) {
            const selectedSports: string[] = data.preferences.SelectedSport;
            filteredNews = filteredNews.filter((newsData) =>
              selectedSports.includes(newsData.sport.name)
            );
          }
        } catch (error) {
          console.log("Error fetching preferences:", error);
        }

        const filteredNewsList = [...filteredNews];
        setNewsList(filteredNewsList);
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchPreferences();
    } else {
      const filteredNewsList = [...filteredNews];
      setNewsList(filteredNewsList);
    }
  }, [sport, team, isLoggedIn, isLoading, isOpen]);

  if (isError && news.length === 0) {
    return <>{errorMessage}</>;
  }
  if (isLoading) {
    return (
      <>
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </>
    );
  }

  if (newsList.length > 0) {
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
  } else if (newsList.length === 0) {
    return (
      <div className="text-center font-medium m-3">
        There is No News Article
        {sport ? (team ? ` For ${sport} and ${team}` : sport) : ""}
      </div>
    );
  }
};

export default FavCard;
