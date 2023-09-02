/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

// tslint:disable-next-line: no-unused-variable

import React, { Fragment, useState, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import "../../App.css";

import {
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import { ThemeContext } from "../../context/theme";
import Logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";
import { OutletContext } from "../../context/outlet";

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Navbar = React.memo(() => {
  const { isOpen, setIsOpen } = useContext(OutletContext);

  const isLogin = !!localStorage.getItem("userData");

  // userNavigatio is used to Provide Option on Menu To user For Redirection
  const userNavigation = [
    isLogin
      ? [
          {
            icon: <PlusIcon className="w-6 h-6 mr-4  " />,
            name: "Sign Up",
            href: "/signup",
          },
          {
            icon: <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-4 " />,
            name: "Sign Out",
            href: "/logout",
          },
          {
            icon: <KeyIcon className="w-5 h-5 mr-4 " />,
            name: "Change Password",
            href: "/ForgotPass",
          },
        ]
      : [
          {
            icon: <ArrowRightOnRectangleIcon className="w-6 h-6 mr-4 " />,
            name: "Sign In",
            href: "/login",
          },
          {
            icon: <PlusIcon className="w-6 h-6 mr-4 " />,
            name: "Sign Up",
            href: "/signup",
          },
        ],
  ];

  const { theme, setTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const toggleOutlet = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "Light") {
      newTheme = "Dark";
    } else {
      newTheme = "Light";
    }

    localStorage.setItem("theme", newTheme);

    setEnabled(!enabled);
    setTheme(newTheme);
  };
  React.useEffect(() => setIsLoggedIn(isLogin), [isLogin]);
  return (
    <>
      <Disclosure
        as="nav"
        className="border-b border-slate-200 dark:border-white dark:bg-gray-800"
      >
        {() => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0  ">
                  <img className="h-20  z-10" src={Logo} alt="Smarter Tasks " />
                </div>
              </div>
              <div className="font-[BroLink] text-center font-medium text-3xl dark:text-white">
                Sports Edge
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    className="w-7 "
                    onClick={toggleTheme}
                    title={`Switch to ${
                      theme === "Light" ? "Dark" : "Light"
                    } Mode`}
                  >
                    {theme === "Light" ? (
                      <MoonIcon
                        className="
                      rounded-full dark:bg-gray-800 bg-white  text-gray-400 hover:text-blue-600"
                      />
                    ) : (
                      <SunIcon className="w-8 dark:text-white bg-white dark:bg-gray-800  dark:hover:text-blue-500  text-gray-400 hover:text-blue-600" />
                    )}
                  </button>
                  {isLoggedIn ? (
                    <Link
                      to={"prefrences"}
                      className="w-7 mx-5"
                      title="User Preference"
                      onClick={toggleOutlet}
                    >
                      <Cog6ToothIcon className="w-8 dark:bg-gray-800 dark:text-white bg-white  text-gray-400  dark:hover:text-blue-500 hover:text-blue-600" />
                    </Link>
                  ) : (
                    <></>
                  )}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="w-8 dark:text-white dark:hover:text-blue-500 dark:bg-gray-800 bg-white p-1 text-gray-400 hover:text-blue-600">
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
                        {userNavigation.flat(1).map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 dark:text-gray-600"
                                )}
                              >
                                <div className="flex items-center">
                                  {item.icon}
                                  {item.name}
                                </div>
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
});

export default Navbar;
