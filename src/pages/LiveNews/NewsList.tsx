/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo, useContext } from "react";
import { useNewsState } from "../../context/News/context";
import { NewsState, NewsData } from "../../context/News/types";
import { Link } from "react-router-dom";
import FetchPreferences, { Preferences } from "../FetchPrefrences";
import { OutletContext } from "../../context/outlet";

interface PropsState {
  sportName: string;
  filter: string;
}

const NewsList = ({ sportName, filter }: PropsState) => {
  const isLoggedin = !!localStorage.getItem("userData");

  const { isOpen } = useContext(OutletContext);

  const state: NewsState = useNewsState();
  const { news, isError, isLoading, errorMessage } = state;

  const [newsList, setNewsList] = useState<NewsData[]>(news);
  const [userPreferences, setUserPreferences] = useState<NewsData[]>(news);

  useMemo(() => {
    let filteredNews: NewsData[];
    isLoggedin ? (filteredNews = userPreferences) : (filteredNews = news);

    if (sportName === "" && filter === "") {
      isLoggedin ? setNewsList(filteredNews) : setNewsList(news);
    } else if (filter || sportName) {
      if (sportName) {
        if (isLoggedin) {
          filteredNews = userPreferences.filter((news) => {
            return news.sport.name === sportName;
          });
          setNewsList(filteredNews);
        } else {
          filteredNews = filteredNews.filter((news) => {
            return news.sport.name === sportName;
          });
          setNewsList(filteredNews);
        }
      } else if (sportName === "" && isLoggedin) {
        setNewsList(userPreferences);
      }
      if (filter) {
        if (filter === "Date") {
          setNewsList(
            filteredNews.sort(
              (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
            )
          );
        } else if (filter === "Title") {
          setNewsList(
            filteredNews.sort((a, b) => a.title.localeCompare(b.title))
          );
        } else {
          setNewsList(
            filteredNews.sort((a, b) =>
              a.sport.name.localeCompare(b.sport.name)
            )
          );
        }
      }
    }
  }, [sportName, filter]);

  useEffect(() => {
    let filteredNews: NewsData[] = news;

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
            if (filteredNews.length !== 0) {
              setNewsList(filteredNews);
              setUserPreferences(filteredNews);
            } else if (news.length > 0) {
              setNewsList(news);
              setUserPreferences(news);
            }
          } else if (news.length > 0) {
            setNewsList(news);
            setUserPreferences(news);
          }
        } catch (error) {
          console.log("Error fetching preferences:", error);
        }
      };

      void fetchPreferences();
    } else {
      setNewsList(news);
    }
  }, [isLoggedin, news, isOpen]);

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  // if (news.length === 0) {
  //   throw new Error("Error!");
  // }
  if (isError) {
    return <span>{errorMessage}</span>;
  }
  return (
    <>
      {newsList.map((data: NewsData) => (
        <div
          key={data.id}
          className="card w-[98%] border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-500  flex flex-col lg:flex-row bg-white rounded-lg hover:shadow-xl duration-300 m-2 "
        >
          <div className="">
            <img
              src={data.thumbnail}
              alt="Thumbnail"
              className="w-[300px] min-h-full max-h-[200px] max-[1023px]:w-full max-[1023px]:rounded-t-lg  object-cover min-[1024px]:rounded-l-lg"
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
