import "./App.css";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContext } from "./context/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import router from "./routes";
import { MatchesProvider } from "./context/Match/context";
import { NewsProvider } from "./context/News/context";
import { SportsProvider } from "./context/Sports/context";
import { TeamsProvider } from "./context/Teams/context";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`h-screen w-full mx-auto  dark:bg-gray-800 ${
        theme === "Dark" ? "dark bg-white h-full overflow-auto " : ""
      } `}
    >
      <SportsProvider>
        <MatchesProvider>
          <TeamsProvider>
            <NewsProvider>
              <RouterProvider router={router} />
            </NewsProvider>
          </TeamsProvider>
        </MatchesProvider>
      </SportsProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
