import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import AccounLayout from "../layouts/account";
import ReadArticle from "../pages/LiveNews/ReadArticle";
import LiveMatch from "../pages/LiveMatch";
import { Navigate } from "react-router-dom";
import LiveNews from "../pages/LiveNews/LiveNews";
import Prefrences from "../layouts/account/prefrences";
import ForgotPassword from "../pages/Forgotpass";
import ErrorBoundary from "../components/ErrorBoundary";
import { Suspense } from "react";
import NotFound from "../pages/NotFound";
import Profile from "../layouts/account/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  {
    path: "login",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "ChangePass",
    element: <ForgotPassword />,
  },
  {
    path: "dashboard",
    element: <AccounLayout />,
    children: [
      {
        path: "",
        element: (
          <>
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <LiveMatch />
                <LiveNews />
              </Suspense>
            </ErrorBoundary>
          </>
        ),
        children: [
          {
            path: "News/:Id",
            element: <ReadArticle />,
          },
          {
            path: "prefrences",
            element: <Prefrences />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
