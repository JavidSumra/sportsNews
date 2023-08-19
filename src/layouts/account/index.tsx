import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AccounLayout = () => {
  return (
    <>
      <Navbar />

      <main className="dark:bg-gray-800  dark:text-white">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccounLayout;
