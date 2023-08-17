import { useEffect, useState, useMemo } from "react";
import { useNewsState } from "../../context/News/context";
import { NewsState, NewsData } from "../../context/News/types";
import { Link } from "react-router-dom";
import FetchPreferences, { Preferences } from "../FetchPrefrences";

interface PropsState {
  sportName: string;
  filter: string;
}

const NewsList = ({ sportName, filter }: PropsState) => {
  const isLoggedin = !!localStorage.getItem("userData");
  const state: NewsState = useNewsState();
  const { news, isError, isLoading, errorMessage } = state;

  const [newsList, setNewsList] = useState<NewsData[]>(news);

  const filteredNews = useMemo(() => {
    let filteredNews = news;

    if (sportName) {
      filteredNews = filteredNews.filter((newsData) => {
        return newsData.sport.name === sportName;
      });
    }

    if (filter) {
      if (filter === "Date") {
        filteredNews.sort(
          (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
        );
      } else if (filter === "Title") {
        filteredNews.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        filteredNews.sort((a, b) => a.sport.name.localeCompare(b.sport.name));
      }
    }

    if (isLoggedin) {
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
          }
        } catch (error) {
          console.log("Error fetching preferences:", error);
        }
      };

      void fetchPreferences();
    }

    return filteredNews;
  }, [isLoggedin, news, sportName, filter]);

  useEffect(() => {
    setNewsList(filteredNews);
  }, [filteredNews]);

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {newsList.map((data: NewsData) => (
        <div
          key={data.id}
          className="card  border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-500  flex flex-col lg:flex-row bg-white rounded-lg hover:shadow-xl duration-300 m-2 "
        >
          <div className="">
            <img
              src={data.thumbnail}
              alt="Thumbnail"
              className="w-[300px] h-full max-h-[200px] max-[1023px]:w-full max-[1023px]:rounded-t-lg  object-cover min-[1024px]:rounded-l-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="top flex flex-row justify-between mx-4 font-semibold text-gray-500">
              <div className="tag mt-4 dark:text-gray-400">
                {data.sport.name}
              </div>
            </div>
            <div className="middle mx-6 my-3">
              <div className="title text-lg font-bold">{data.title}</div>
              <div className="excerpt text-sm font-medium">{data.summary}</div>
            </div>
            <div className="bottom flex justify-between items-center text-sm font-bold mx-10">
              <div className="date mb-4">
                {new Date(data.date).toUTCString().split("", 16)}
              </div>
              <div className="readmore hover:text-blue-500 duration-75 underline">
                <Link to={`News/${data.id}`}>Readmore...</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsList;
