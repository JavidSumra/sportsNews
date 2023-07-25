/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from "react";
import { useNewsState } from "../../context/News/context";
import { NewsState, NewsData } from "../../context/News/types";
import { Link } from "react-router-dom";

const NewsList = (props: any) => {
  const { sportName } = props;
  // console.log(sportName);
  const state: NewsState = useNewsState();
  const { isError, isLoading, errorMessage } = state;
  let { news } = state;

  if (sportName) {
    // console.log("Called");
    news = news.filter((newsData) => {
      return newsData.sport.name === sportName;
    });
    console.log(news);
  }
  // console.log(news);

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {news.map((data: NewsData) => (
        <div
          key={data.id}
          className="card flex flex-col lg:flex-row m-2 bg-white rounded-lg hover:shadow-xl duration-300 justify-between "
        >
          <div className="">
            <img
              src={data.thumbnail}
              alt="Thumbnail"
              className="w-[300px] h-full max-h-[200px]  object-cover rounded-l-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="top flex flex-row justify-between mx-4 font-semibold text-gray-500">
              <div className="tag mt-4">{data.sport.name}</div>
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
