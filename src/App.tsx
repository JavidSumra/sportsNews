import "./App.css";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContext } from "./context/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import router from "./routes";
import { MatchesProvider } from "./context/Match/context";
import { NewsProvider } from "./context/News/context";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`h-screen w-full mx-auto ${
        theme === "Dark" ? "dark" : ""
      }dark:bg-slate-600`}
    >
      <MatchesProvider>
        <NewsProvider>
          <RouterProvider router={router} />
        </NewsProvider>
      </MatchesProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
