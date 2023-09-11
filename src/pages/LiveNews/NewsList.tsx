/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo, useContext } from "react";
import { useNewsState } from "../../context/News/context";
import { NewsState, NewsData } from "../../context/News/types";
import { Link } from "react-router-dom";
import FetchPreferences, { Preferences } from "../FetchPrefrences";
import { OutletContext } from "../../context/outlet";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

import NewsNotFound from "../../assets/images/ArticleNotFound.gif";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonLoading from "./SkeletonLoading";
import { useTeamsState } from "../../context/Teams/context";
import { nanoid } from "nanoid";
import { Team } from "../../context/Teams/types";

interface PropsState {
  sportName: string;
  filter: string;
}

const NewsList = ({ sportName, filter }: PropsState) => {
  const isLoggedin = !!localStorage.getItem("userData");

  const { isOpen } = useContext(OutletContext);

  const state: NewsState = useNewsState();

  const { news, isError, isLoading, errorMessage } = state;
  const { teams } = useTeamsState();

  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const [teamData, setTeamData] = useState<Team[]>(
    teams.filter((team) => selectedTeams?.includes(team.name))
  );

  const [newsList, setNewsList] = useState<NewsData[]>(news);
  const [userPreferences, setUserPreferences] = useState<NewsData[]>(news);

  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("GuestFav") || "[]")
  );
  const [loginFav, setLoginFav] = useState<number[]>(
    JSON.parse(localStorage.getItem("LoginFav") || "[]")
  );

  // Function Handle Favorite Article
  const addToFav = (id: number): void => {
    if (isLoggedin) {
      const loginUserFav = [...loginFav, id];
      let userFav: number[] = JSON.parse(
        localStorage.getItem("LoginFav") || "[]"
      );
      if (userFav.includes(id)) {
        userFav = userFav.filter((arrId) => arrId !== id);
        localStorage.setItem("LoginFav", JSON.stringify(userFav));
      } else {
        localStorage.setItem("LoginFav", JSON.stringify(loginUserFav));
      }
      setLoginFav(JSON.parse(localStorage.getItem("LoginFav") || "[]"));
    } else {
      const fav = [...favorites, id];
      let userFav: number[] = JSON.parse(
        localStorage.getItem("GuestFav") || "[]"
      );
      if (userFav.includes(id)) {
        userFav = userFav.filter((arrId) => arrId !== id);
        localStorage.setItem("GuestFav", JSON.stringify(userFav));
      } else {
        localStorage.setItem("GuestFav", JSON.stringify(fav));
      }
      setFavorites(JSON.parse(localStorage.getItem("GuestFav") || "[]"));
    }
  };

  useEffect(() => {
    let filteredNews: NewsData[] = news;

    if (isLoggedin) {
      // fetchPreferences function is used for fetching Previously Slected Values of Login User
      const fetchPreferences = async (): Promise<void> => {
        try {
          const data: Preferences = await FetchPreferences();
          if (
            data?.preferences?.SelectedSport?.length !== 0 &&
            data?.preferences?.SelectedSport !== undefined
          ) {
            setSelectedSports(data?.preferences?.SelectedSport ?? []);

            if (data?.preferences?.SelectedTeams?.length > 0) {
              setSelectedTeams(data?.preferences?.SelectedTeams ?? []);
              const teamDetail = teams.filter((team) =>
                data?.preferences?.SelectedTeams.includes(team.name)
              );
              setTeamData(teamDetail);
            }

            filteredNews = filteredNews.filter((newsData) => {
              return data?.preferences?.SelectedSport?.includes(
                newsData.sport.name
              );
            });

            if (data?.preferences?.SelectedTeams?.length > 0) {
              filteredNews = filteredNews.filter((newsData) => {
                if (
                  newsData?.teams?.some((team) =>
                    teamData?.map((team) => team.name).includes(team.name)
                  )
                ) {
                  return (
                    data?.preferences?.SelectedSport?.includes(
                      newsData.sport.name
                    ) &&
                    (data?.preferences?.SelectedTeams?.includes(
                      newsData.teams[0]?.name
                    ) ||
                      data?.preferences?.SelectedTeams?.includes(
                        newsData.teams[1]?.name
                      ))
                  );
                } else if (
                  !teamData
                    ?.map((team) => team.plays)
                    .includes(newsData.sport.name) &&
                  data?.preferences?.SelectedSport.includes(newsData.sport.name)
                ) {
                  return newsData;
                }
              });
            }

            if (sportName !== "" && filteredNews.length > 0) {
              filteredNews = filteredNews.filter(
                (news) => news.sport.name === sportName
              );
              setNewsList(filteredNews);
            } else if (filteredNews.length !== 0) {
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
  }, [isOpen, isLoggedin, news]);

  // Function Execute on sportName or filter change and filter news Data
  useMemo(() => {
    let filteredNews: NewsData[];
    isLoggedin ? (filteredNews = userPreferences) : (filteredNews = news);

    if (sportName === "" && filter === "") {
      isLoggedin ? setNewsList(userPreferences) : setNewsList(news);
    } else if (filter || sportName) {
      if (sportName) {
        if (isLoggedin) {
          filteredNews = news.filter((newsData) => {
            return selectedSports?.includes(newsData.sport.name);
          });
          if (selectedTeams.length > 0) {
            filteredNews = filteredNews.filter((newsData) => {
              if (
                sportName === newsData?.sport?.name &&
                newsData?.teams?.some((team) =>
                  teamData?.map((team) => team.name).includes(team.name)
                )
              ) {
                return (
                  sportName === newsData?.sport?.name &&
                  selectedSports?.includes(newsData.sport.name) &&
                  (selectedTeams?.includes(newsData.teams[0]?.name) ||
                    selectedTeams?.includes(newsData.teams[1]?.name))
                );
              } else if (
                sportName === newsData?.sport?.name &&
                !teamData
                  ?.map((team) => team.plays)
                  .includes(newsData.sport.name) &&
                selectedSports?.includes(newsData.sport.name)
              ) {
                return newsData;
              }
            });
          } else {
            filteredNews = filteredNews.filter(
              (news) => news.sport.name === sportName
            );
          }
          setNewsList(filteredNews);
        } else {
          filteredNews = news.filter((news) => news.sport.name === sportName);
          setNewsList(filteredNews);
        }
      } else if (sportName === "" && isLoggedin) {
        if (selectedTeams.length > 0) {
          filteredNews = filteredNews.filter((newsData) => {
            if (
              newsData?.teams?.some((team) =>
                teamData?.map((team) => team.name).includes(team.name)
              )
            ) {
              return (
                selectedSports?.includes(newsData.sport.name) &&
                (selectedTeams?.includes(newsData.teams[0]?.name) ||
                  selectedTeams?.includes(newsData.teams[1]?.name))
              );
            } else if (
              !teamData
                ?.map((team) => team.plays)
                .includes(newsData.sport.name) &&
              selectedSports?.includes(newsData.sport.name)
            ) {
              return newsData;
            }
          });
          setNewsList(filteredNews);
        } else {
          setNewsList(userPreferences);
        }
      }
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
      } else if (filter === "Favourites") {
        const favList = isLoggedin
          ? JSON.parse(localStorage.getItem("LoginFav") || "[]")
          : JSON.parse(localStorage.getItem("GuestFav") || "[]");
        setNewsList(filteredNews.filter((news) => favList.includes(news.id)));
      } else if (filter === "Select" && sportName === "") {
        setNewsList(filteredNews.sort(() => Math.random() - 0.5));
      } else if (filter === "Sport Type") {
        setNewsList(
          filteredNews.sort((a, b) => a.sport.name.localeCompare(b.sport.name))
        );
      }
    }
  }, [sportName, filter]);

  if (isLoading && teamData.length === 0) {
    return (
      <SkeletonTheme baseColor="#f0f0f0" highlightColor="#dcdcdc">
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </SkeletonTheme>
    );
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if (newsList.length > 0) {
    return (
      <>
        {newsList.map((data: NewsData) => (
          <div
            key={nanoid()}
            className="card max-w-[98%] w-full group border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-500  flex flex-col lg:flex-row bg-white rounded-lg hover:shadow-xl duration-300 m-2 "
          >
            <div>
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
                <button onClick={() => addToFav(data.id)}>
                  {isLoggedin && loginFav.includes(data.id) ? (
                    <SolidHeartIcon className="w-8 h-8 mt-4   duration-150 hover:-translate-y-1 text-rose-500 dark:text-rose-400  dark:hover:text-rose" />
                  ) : !isLoggedin && favorites.includes(data.id) ? (
                    <SolidHeartIcon className="w-8 h-8 mt-4   duration-150 hover:-translate-y-1 text-rose-500 dark:text-rose-400  dark:hover:text-rose" />
                  ) : (
                    <HeartIcon className="w-8 h-8 mt-4 text-rose-400 opacity-0 group-hover:opacity-100 duration-150 hover:-translate-y-1 " />
                  )}
                </button>
              </div>
              <div className="middle mx-6 my-3">
                <div className="title text-lg font-bold">{data.title}</div>
                <div className="excerpt text-sm font-medium">
                  {data.summary}
                </div>
              </div>
              <div className="bottom flex justify-between items-center text-sm font-bold mx-10">
                <div className="date mb-4">
                  {new Date(data.date).toUTCString().split("", 16)}
                </div>
                <div className="readmore hover:text-blue-500 dark:hover:text-slate-900 duration-75 underline">
                  <Link to={`News/${data.id}`}>Readmore...</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-full">
        <img src={NewsNotFound} alt="News Not Found" />
      </div>
    );
  }
};

export default NewsList;
