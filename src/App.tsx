import "./App.css";
import { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContext } from "./context/theme";
import router from "./routes";
import { MatchesProvider } from "./context/Match/context";
import { NewsProvider } from "./context/News/context";
import { SportsProvider } from "./context/Sports/context";
import { TeamsProvider } from "./context/Teams/context";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  const { theme } = useContext(ThemeContext);

  // Without Below Code Dark Mode is Not Working in Modal's
  useEffect(() => {
    if (theme === "Dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className={`h-screen w-full mx-auto  dark:bg-gray-800 `}>
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
