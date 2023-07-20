import React from "react";
import { useNewsState, useNewsDispatch } from "../../context/News/context";
import { NewsState, NewsData } from "../../context/News/types";

const NewsList = () => {
  const state: NewsState = useNewsState();

  const { news, isError, isLoading, errorMessage } = state;
  console.log(news);
  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }
  return (
    <>
      {news.map((data: NewsData) => (
        <div key={data.id}>
          <div>
            <img src={data.thumbnail} alt="" />
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsList;
