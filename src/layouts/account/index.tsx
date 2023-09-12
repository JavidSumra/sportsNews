import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ErrorBoundary from "../../components/ErrorBoundary";

const AccounLayout = () => {
  return (
    <>
      <ErrorBoundary>
        <Navbar />
        <main className="dark:bg-gray-800 dark:min-h-screen dark:text-white">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default AccounLayout;
