import React from "react";
import Navbar from "./Navbar";
import LiveScore from "../LiveMatch";
import NewsSection from "../LiveNews";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <LiveScore />
      <NewsSection />
    </>
  );
};

export default Dashboard;
