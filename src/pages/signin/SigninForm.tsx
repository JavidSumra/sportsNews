/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface UserInputs {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>();

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    const { email, password } = data;
    const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.errors);
      }

      if (data?.errors) {
        throw new Error(data?.errors);
      }

      localStorage.setItem("userData", JSON.stringify(data?.user));
      localStorage.setItem("authToken", data?.auth_token);

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      toast.success(`Welcome Back ${data?.user.name}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(`Operation Failed : ${error}`);
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
    }
  };
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-3xl font-bold  text-gray-800 mb-8 pr-6">Login</div>
      <div>
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue  ${
            errors.email ? "focus:shadow-outline-blue" : ""
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
        <label
          htmlFor="password"
          className="block text-gray-700 font-semibold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.password ? "focus:shadow-outline-blue" : ""
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
        <div className="flex items-center justify-between w-full my-3">
          <div className="hover:underline font-medium hover:text-blue-600 duration-150 cursor-pointer">
            <a href="/ForgotPass">Change Password</a>
          </div>
          <div>
            <input
              type="submit"
              value="Login"
              className="text-xl p-2 bg-blue-500 text-white font-bold rounded cursor-pointer"
            />
          </div>
        </div>
        <fieldset className="border-t border-slate-300">
          <legend className="mx-auto border  rounded px-4 text-black text-base italic text-center">
            OR
          </legend>
          <div className="flex text-base items-center justify-center flex-wrap ">
            Don't have an Account
            <a
              href="/signup"
              className="text-blue-500 mx-2 font-bold hover:underline"
            >
              Signup
            </a>
          </div>
          <div className="flex text-base items-center justify-center flex-wrap ">
            <a
              href="/dashboard"
              className="text-blue-500 mx-2 font-bold hover:underline"
            >
              Start As Guest
            </a>
          </div>
        </fieldset>
      </div>
    </form>
  );
};
export default SigninForm;
