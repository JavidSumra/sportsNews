import React from "react";

const LiveScore = React.lazy(() => import("./LiveScore"));

const LiveMatch = () => {
  return (
    <>
      <LiveScore />
    </>
  );
};

export default LiveMatch;
