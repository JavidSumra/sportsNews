import LiveNews from "./LiveNews";
import { Outlet } from "react-router-dom";

const NewsSection = () => {
  return (
    <>
      <LiveNews />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default NewsSection;
