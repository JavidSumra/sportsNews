import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import AccounLayout from "../layouts/account";
import ReadArticle from "../pages/LiveNews/ReadArticle";
import LiveMatch from "../pages/LiveMatch";
import { Navigate } from "react-router-dom";
import LiveNews from "../pages/LiveNews/LiveNews";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/dashboard",
    element: <AccounLayout />,
    children: [
      {
        index: true,
        element: [<LiveMatch />, <LiveNews />],
      },
      {
        path: "News/:Id",
        element: <ReadArticle />,
      },
    ],
  },
]);

export default router;
