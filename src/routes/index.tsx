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
    path: "ForgotPass",
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
        ],
      },
    ],
  },
]);

export default router;
