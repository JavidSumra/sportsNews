import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Logout from "../pages/logout";

const router = createBrowserRouter([
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
    element: <Dashboard />,
  },
]);

export default router;
