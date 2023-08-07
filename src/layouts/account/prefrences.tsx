import React from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTeamsState } from "../../context/Teams/context";
import { useSportsState } from "../../context/Sports/context";
import { Sports } from "../../context/Sports/types";
import { Team } from "../../context/Teams/types";

const Prefrences = () => {
  const { teams } = useTeamsState();
  const { sports } = useSportsState();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  function closeModal() {
    setIsOpen(false);
    navigate("/dashboard");
  }
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
                        name="selectSport"
                        className="mx-2 w-5 h-5"
                        id={`sport-${sport.id}`}
                      />
                      <label htmlFor={`sport-${sport.id}`}>
                        <div className="text-2xl font-medium">{sport.name}</div>
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
                        name="selectSport"
                        className="mx-2 w-5 h-5"
                        id={`team-${team.id}`}
                      />
                      <label htmlFor={`team-${team.id}`}>
                        <div className="text-2xl font-medium">{team.name}</div>
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
                  <button className="bg-blue-500 p-2 rounded text-xl font-medium text-white ">
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Prefrences;
