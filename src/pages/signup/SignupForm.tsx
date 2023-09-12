/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface UserInputs {
  name: string;
  email: string;
  password: string;
}

// Validation of Password

function validatePassword(password: string): string | undefined {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/(?=.*\d)/.test(password)) {
    return "Password must contain at least one digit.";
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return "Password must contain at least one special character (@$!%*?&).";
  }
}

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>();

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    const { name, email, password } = data;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.warning(validatePassword(password), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/signup");
    } else {
      try {
        const response = await fetch(`${API_ENDPOINT}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (data?.errors) {
          throw new Error(data?.errors);
        }

        if (!response.ok) {
          throw new Error("Signup Failed");
        }

        localStorage.setItem("authToken", data?.auth_token);
        localStorage.setItem("userData", JSON.stringify(data?.user));
        toast.success(`Welcome ${data?.user.name}`, {
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
        console.log(`Operation Failed:${error}`);
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
      }
    }
  };
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-3xl font-bold text-left text-gray-800 mb-8 pr-6">
        Signup
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Name
        </label>
        <input
          type="name"
          id="name"
          placeholder="Javid Sumra"
          {...register("name", { required: true })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue  ${
            errors.name
              ? "focus:shadow-outline-red bg-red-100 shadow-red-200 shadow-sm focus:border-red-400 border-red-200"
              : ""
          }`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="xyz@gmail.com"
          {...register("email", { required: true })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue  ${
            errors.email
              ? "focus:shadow-outline-red bg-red-100 shadow-red-200 shadow-sm focus:border-red-400 border-red-200"
              : ""
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
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          {...register("password", { required: true })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.password
              ? "focus:shadow-outline-red bg-red-100 shadow-red-200 shadow-sm focus:border-red-400 border-red-200"
              : ""
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">This field is required</span>
        )}
        <div className="w-full my-3">
          <input
            type="submit"
            value="Signup"
            className="w-full text-xl p-2 bg-blue-500 text-white font-bold rounded cursor-pointer"
          />
        </div>
        <fieldset className="border-t border-slate-300">
          <legend className="mx-auto border rounded px-4 text-gray-600 text-base italic text-center">
            OR
          </legend>
          <div className="flex text-base items-center justify-center flex-wrap ">
            Already have an Account?
            <a
              href="/login"
              className="text-blue-500 font-bold mx-2 hover:underline"
            >
              Login
            </a>
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export { validatePassword };
export default SignupForm;
