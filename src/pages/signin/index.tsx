import React from "react";
import SigninForm from "./SigninForm";
import LoginIMG from "../../assets/images/LoginSvg.avif";

const Signin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full px-6 py-8 bg-white rounded-lg shadow-md flex items-center justify-center">
        <div className="w-full">
          <SigninForm />
        </div>
        <div className="flex items-center justify-center w-full mx-10 max-[634px]:hidden">
          <img src={LoginIMG} alt="sportsImage" />
        </div>
      </div>
    </div>
  );
};
export default Signin;
