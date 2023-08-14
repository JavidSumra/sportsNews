/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { toast } from "react-toastify";

interface UserInputs {
  current_password: string;
  new_password: string;
}

const ForgotpassForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>();

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    const { current_password, new_password } = data;
    const response = await fetch(`${API_ENDPOINT}/user/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ current_password, new_password }),
    });
    try {
      if (!response.ok) {
        throw new Error("Failed To Update Password");
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();

      console.log(data);

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      toast.success(`Password Updated Successfully`, {
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
      navigate("back");
    }

    return (
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-3xl font-bold text-center text-gray-800 mb-8 pr-6">
          Update Password
        </div>
        <div>
          <label
            htmlFor="cpass"
            className="block text-gray-700 font-semibold mb-2"
          >
            Current Password
          </label>
          <input
            type="password"
            id="cpass"
            {...register("current_password", { required: true })}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue  ${
              errors.current_password ? "focus:shadow-outline-blue" : ""
            }`}
          />
          {errors.current_password && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
          <label
            htmlFor="npassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="npassword"
            {...register("new_password", { required: true })}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.new_password ? "focus:shadow-outline-blue" : ""
            }`}
          />
          {errors.new_password && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}

          <fieldset className="border-t border-slate-300">
            <legend className="mx-auto px-4 text-black text-2xl italic text-center">
              OR
            </legend>
            <div className="flex items-center justify-center gap-10 flex-wrap text-3xl">
              Go Back To
              <a href="/login">Login</a>
              Page
            </div>
          </fieldset>
        </div>
      </form>
    );
  };
};

export default ForgotpassForm;
