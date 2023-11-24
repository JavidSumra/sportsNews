import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { UserPreferences } from "../../pages/FetchPrefrences";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

interface UserData {
  id: number;
  name: string;
  email: string;
  preferences: UserPreferences;
}

const Profile = () => {
  const authToken = localStorage?.getItem("authToken") ?? "";

  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState<UserData>();

  const navigate = useNavigate();
  const closeModal = () => {
    setIsOpen(false);
    navigate("/dashboard");
  };

  const fetchUserData = async () => {
    const response = await fetch(`${API_ENDPOINT}/user`, {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    try {
      fetchUserData().then((data) => setUser(data));
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (user) {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-xl font-bold leading-6 text-gray-900"
                  >
                    <div>Hey, {user.name}</div>
                    <div>{new Date().toLocaleDateString("en-IN")}</div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="p-3">
                      <div className="flex items-center w-full font-semibold">
                        <EnvelopeIcon className="w-6 h-6 mr-3" />
                        <div className="flex items-center justify-center text-lg mb-1">
                          {user.email}
                        </div>
                      </div>
                      <div>
                        <span
                          className={`${
                            user.preferences?.SelectedSport ||
                            user.preferences?.SelectedTeams
                              ? ""
                              : "hidden"
                          } block font-semibold text-xl`}
                        >
                          Your Preferences,
                        </span>
                        <span
                          className={`${
                            user.preferences?.SelectedSport ||
                            user.preferences?.SelectedTeams
                              ? ""
                              : "hidden"
                          }`}
                        >
                          <span
                            className={`${
                              user.preferences?.SelectedSport ? "" : "hidden"
                            } block font-semibold`}
                          >
                            Selected Sports:
                            {user.preferences &&
                              user.preferences?.SelectedSport?.join(",")}
                          </span>
                          <span
                            className={`${
                              user.preferences?.SelectedTeams.length > 0
                                ? ""
                                : "hidden"
                            } block font-semibold`}
                          >
                            Selected Teams:
                            {user.preferences &&
                              user.preferences?.SelectedTeams?.join(",")}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
};

export default Profile;
