import { Fragment, useState, useContext, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import "../../App.css";
import {
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { ThemeContext } from "../../context/theme";
import Logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";

const isLoggedIn = !!localStorage.getItem("authToken");
const userNavigation = [
  isLoggedIn
    ? { name: "Sign out", href: "/logout" }
    : { name: "Signin", href: "/login" },
];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isLogInUser, setIsLoginUser] = useState(isLoggedIn);
  const [enabled, setEnabled] = useState(false);

  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "Light") {
      newTheme = "Dark";
      // document.documentElement.classList.add("dark");
    } else {
      newTheme = "Light";
      // document.documentElement.classList.remove("dark");
    }
    setEnabled(!enabled);
    setTheme(newTheme);
  };
  useEffect(() => {
    setIsLoginUser(isLoggedIn);
  }, [isLoggedIn]);
  return (
    <>
      <Disclosure
        as="nav"
        className="border-b border-slate-200 dark:bg-gray-500"
      >
        {({ open }) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 mix-blend-color-burn ">
                  <img
                    className="h-20 mix-blend-color-burn dark:invert"
                    src={Logo}
                    alt="Smarter Tasks "
                  />
                </div>
              </div>
              <div className="font-[BroLink] text-center font-medium text-3xl">
                Sports Edge
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    className="w-7 "
                    onClick={toggleTheme}
                    title={`Change Mode to ${theme}`}
                  >
                    {theme === "Light" ? (
                      <MoonIcon
                        className="
                      rounded-full  dark:bg-gray-500 bg-white  text-gray-400 hover:text-blue-600"
                      />
                    ) : (
                      <SunIcon className="w-8 dark:text-white bg-white dark:bg-gray-500  dark:hover:text-blue-500  text-gray-400 hover:text-blue-600" />
                    )}
                  </button>
                  {isLogInUser ? (
                    <Link
                      to={"prefrences"}
                      className="w-7 mx-5"
                      title="User Preference"
                    >
                      <Cog6ToothIcon className="w-8 dark:bg-gray-500 bg-white  text-gray-400  dark:hover:text-blue-500 hover:text-blue-600" />
                    </Link>
                  ) : (
                    <></>
                  )}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="w-8 dark:text-white dark:hover:text-blue-500 dark:bg-gray-500 bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-8 w-8 "
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
