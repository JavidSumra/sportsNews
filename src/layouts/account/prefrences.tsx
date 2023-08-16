/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTeamsState } from "../../context/Teams/context";
import { useSportsState } from "../../context/Sports/context";
import { Sports } from "../../context/Sports/types";
import { Team } from "../../context/Teams/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
import FetchPreferences, {
  Preferences,
  UserPreferences,
} from "../../pages/FetchPrefrences";

const token: string | null = localStorage?.getItem("authToken");

type FormData = {
  [key: string]: boolean;
};

type FormValues = {
  sports: boolean;
  teams: boolean;
};

const Prefrences: React.FC = () => {
  const [prevPreferences, setPrevPreferences] =
    React.useState<UserPreferences>();
  const [preferences, setPreferences] = React.useState<FormValues>({
    sports: false,
    teams: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPreferences((prevPreferences: FormValues) => ({
      ...prevPreferences,
      [name]: checked,
    }));
  };

  const { register, handleSubmit } = useForm<FormData>();
  const { teams } = useTeamsState();
  const { sports } = useSportsState();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  function closeModal() {
    setIsOpen(false);
    navigate("/dashboard");
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let SelectedSport: string[] = prevPreferences?.SelectedSport ?? [];
    let SelectedTeams: string[] = prevPreferences?.SelectedTeams ?? [];
    console.log(data);
    Object.entries(data).forEach(([key, value]) => {
      // ! Function to Check Weather it is sport or team
      const sport: Sports | undefined = sports.find(
        (sport) => sport.name === key
      );
      console.log(sport);
      const team: Sports | undefined = teams.find((team) => team.name === key);

      if (value && sport?.name && !SelectedSport.includes(key)) {
        console.log("Here The Data is Not Available");
        SelectedSport.push(sport?.name);
      } else if (value && team?.name && !SelectedTeams.includes(key)) {
        SelectedTeams.push(team?.name);
      }
      if (!value && SelectedSport.includes(key)) {
        SelectedSport = SelectedSport.filter((sport) => {
          console.log(sport);
          return sport === key;
        });
        console.log(SelectedSport);
      }
      if (!value && SelectedTeams.includes(key)) {
        SelectedTeams = SelectedTeams.filter((sport) => {
          return sport === key;
        });
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
      if (!res.ok) {
        throw new Error("Failed To Upload Prefrences");
      }
      console.log("Uploaded Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(`Operation Failed: ${error}`);
    }
  };

  useEffect(() => {
    FetchPreferences()
      .then((data: { preferences: UserPreferences }) => {
        setPrevPreferences(data.preferences);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(prevPreferences);
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
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
                      <div className="font-bold text-3xl">Prefrences</div>
                      <button
                        onClick={closeModal}
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
                          onChange={handleCheckboxChange}
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
                          className="mx-2 w-5 h-5"
                          {...register(team.name)}
                          id={`team-${team.id}`}
                          onChange={handleCheckboxChange}
                          defaultChecked={prevPreferences?.SelectedTeams.includes(
                            team.name
                          )}
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
