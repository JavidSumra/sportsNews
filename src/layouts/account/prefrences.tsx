/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTeamsState } from "../../context/Teams/context";
import { useSportsState } from "../../context/Sports/context";
import { Sports } from "../../context/Sports/types";
import { Team } from "../../context/Teams/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
import FetchPreferences, { UserPreferences } from "../../pages/FetchPrefrences";
import { OutletContext } from "../../context/outlet";

type FormData = {
  [key: string]: boolean;
};

type FormValues = {
  sports: boolean;
  teams: boolean;
};
const isLoggedIn = !!localStorage.getItem("userData");

const Prefrences: React.FC = () => {
  const { isOpen, setIsOpen } = useContext(OutletContext);

  const [prevPreferences, setPrevPreferences] =
    React.useState<UserPreferences>();
  const [preferences, setPreferences] = React.useState<FormValues>({
    sports: false,
    teams: false,
  });

  // Following Function Handle Check box on Change and Also Maintain State of Previously Checky Checkbox
  const handleCheckboxChange = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const { name, checked } = event.target as HTMLInputElement;
    const type = event.currentTarget.getAttribute("data-type");

    if (type === "sport") {
      setPreferences((prevPreferences: FormValues) => ({
        ...prevPreferences,
        sports: checked,
      }));
      setPrevPreferences((prevPreferences: UserPreferences | undefined) => {
        if (prevPreferences?.SelectedSport) {
          const updatedPreferences = {
            ...prevPreferences,
            SelectedSport: checked
              ? [...prevPreferences.SelectedSport, name]
              : prevPreferences.SelectedSport.filter((sport) => sport !== name),
          };
          return updatedPreferences;
        }
        return prevPreferences;
      });
    } else if (type === "team") {
      setPreferences((prevPreferences: FormValues) => ({
        ...prevPreferences,
        teams: checked,
      }));
      setPrevPreferences((prevPreferences: UserPreferences | undefined) => {
        if (prevPreferences?.SelectedTeams) {
          const updatedPreferences = {
            ...prevPreferences,
            SelectedTeams: checked
              ? [...prevPreferences.SelectedTeams, name]
              : prevPreferences.SelectedTeams.filter((team) => team !== name),
          };
          return updatedPreferences;
        }
        return prevPreferences;
      });
    }
  };

  console.log(preferences);

  const { register, handleSubmit } = useForm<FormData>();
  const { teams } = useTeamsState();
  const { sports } = useSportsState();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true);

  function closeModal() {
    setIsOpen(false);
    setIsModalOpen(false);
    navigate("/dashboard");
  }

  //Folllowing Function Handle Submit Event
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    closeModal();
    const token: string | null = localStorage?.getItem("authToken");

    const SelectedSport: string[] = prevPreferences?.SelectedSport ?? [];
    const SelectedTeams: string[] = prevPreferences?.SelectedTeams ?? [];

    Object.entries(data).forEach(([key, value]) => {
      // ! Function to Check Weather it is sport or team

      const sport: Sports | undefined = sports.find(
        (sport) => sport.name === key
      );
      // console.log(sport);
      const team: Sports | undefined = teams.find((team) => team.name === key);

      if (value && sport?.name && !SelectedSport.includes(key)) {
        SelectedSport.push(sport?.name);
      } else if (value && team?.name && !SelectedTeams.includes(key)) {
        SelectedTeams.push(team?.name);
      }
    });
    try {
      const preferences = { SelectedSport, SelectedTeams };
      console.log(preferences);
      const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ preferences }),
      });
      console.log(res);
      if (!res.ok) {
        throw new Error("Failed To Upload Prefrences");
      }
      navigate("/dashboard");
    } catch (error) {
      console.log(`Operation Failed: ${error}`);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      FetchPreferences()
        .then((data: { preferences: UserPreferences }) => {
          setPrevPreferences(data.preferences);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isOpen, isLoggedIn]);

  return (
    <Transition appear show={isModalOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-50"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full  items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-screen-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-bold text-3xl">Preferences</div>
                      <button
                        onClick={handleSubmit(onSubmit)}
                        className="inline-flex justify-center "
                      >
                        <XMarkIcon className="w-8 h-8 text-black" />
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2 grid grid-cols-3">
                    {sports.map((sport: Sports) => (
                      <div key={sport.id} className="m-4 flex items-center ">
                        <input
                          type="checkbox"
                          defaultChecked={prevPreferences?.SelectedSport.includes(
                            sport.name
                          )}
                          className="mx-2 w-5 h-5"
                          {...register(sport.name)}
                          id={`sport-${sport.id}`}
                          data-type="sport"
                          onClick={handleCheckboxChange}
                        />
                        <label htmlFor={`sport-${sport.id}`}>
                          <div className="text-2xl font-medium">
                            {sport.name}
                          </div>
                        </label>
                      </div>
                    ))}
                    <hr className="w-[70dvw]" />
                  </div>
                  <div className="mt-2 grid grid-cols-3">
                    {teams.map((team: Team) => (
                      <div key={team.id} className="m-4 flex items-center ">
                        <input
                          type="checkbox"
                          defaultChecked={prevPreferences?.SelectedTeams.includes(
                            team.name
                          )}
                          className="mx-2 w-5 h-5"
                          {...register(team.name)}
                          id={`team-${team.id}`}
                          data-type="team"
                          onClick={handleCheckboxChange}
                        />
                        <label htmlFor={`team-${team.id}`}>
                          <div className="text-2xl font-medium">
                            {team.name}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-end mx-16">
                    <button
                      className="bg-gray-800 p-2 rounded text-xl font-medium text-white mx-4"
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </button>
                    <input
                      type="submit"
                      className="bg-blue-500 cursor-pointer p-2 rounded text-xl font-medium text-white "
                      value="Save"
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Prefrences;
