import React from "react";
const Favourite = React.lazy(() => import("./Favourite"));

const FavSection = () => {
  return <Favourite />;
};
export default FavSection;
