import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("userData");
  }, []);
  toast.success(`Signout Successfully`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  return <Navigate to="/login" />;
};

export default Logout;
