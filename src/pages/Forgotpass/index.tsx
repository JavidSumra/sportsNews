// import React from "react";
import ForgotpassForm from "./ForgotpassForm";
import ChangePassIMG from "../../assets/images/ChangePassword.png";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full px-6 py-8 bg-white rounded-lg shadow-md flex items-center justify-center">
        <div className="w-full">
          <ForgotpassForm />
        </div>
        <div className="flex items-center justify-center w-full mx-10 max-[634px]:hidden">
          <img src={ChangePassIMG} alt="sportsImage" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
