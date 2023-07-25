import React, { useEffect } from "react";
import { useNewsDispatch } from "../../context/News/context";
import { FetchNews } from "../../context/News/actions";
import { Outlet } from "react-router-dom";

const LiveNewsContainer = () => {
  const NewsDispatch = useNewsDispatch();

  useEffect(() => {
    void FetchNews(NewsDispatch);
  }, [NewsDispatch]);
  return <Outlet />;
};

export default LiveNewsContainer;
