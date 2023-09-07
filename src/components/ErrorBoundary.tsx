import React, { useState, useEffect, ReactNode } from "react";
import ErrorIMG from "../assets/images/ErrorImg.png";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };
    window.addEventListener("error", handleError);
    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (hasError) {
    return (
      <div className="flex items-center justify-center ">
        <div className="flex items-center justify-center h-[500px]">
          <img src={ErrorIMG} alt="" className="w-[300px]" />
        </div>
        <div>
          <div className="font-[Poppins] text-3xl font-bold">
            Something Went Wrong!
          </div>
          <div className="flex items-center justify-around w-full mt-5">
            <button
              className="bg-green-400 p-2 rounded font-[Poppins] font-medium text-white"
              onClick={handleReload}
            >
              Reload Page
            </button>
            <button
              className="text-green-400 font-[Poppins] font-bold text-lg"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
