/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NewsData } from "../../context/News/types";

type ArticleDetail = NewsData & {
  content: string;
};

const ReadArticle = () => {
  const navigate = useNavigate();
  const { Id } = useParams();

  const [data, setData] = useState<ArticleDetail>();
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  // FetchMatchData retrieve Data of Particular Article When User Clicks on Readmore
  const FetchMatchData = async () => {
    const res = await fetch(`${API_ENDPOINT}/articles/${Id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ArticleDetail = await res.json();
    setData(data);
  };

  useEffect(() => {
    void FetchMatchData();
  }, [Id]);

  function closeModal() {
    setIsOpen(false);
    navigate("/dashboard");
  }

  if (data) {
    return (
      <>
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
                  <Dialog.Panel className="w-full max-w-screen-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-bold text-lg">{data.title}</div>
                        <button
                          onClick={closeModal}
                          className="inline-flex justify-center "
                        >
                          <XMarkIcon className="w-6 h-6 text-black" />
                        </button>
                      </div>
                    </Dialog.Title>
                    <div className="mt-2">
                      <img
                        src={data.thumbnail}
                        className="w-full h-[180px] object-cover rounded-lg"
                        alt="Thumbnail"
                      />
                      <div className="text-lg text-left font-medium mt-2 flex justify-between">
                        <div>Sport Type : {data.sport.name}</div>
                        <div className="mx-4">
                          {new Date(data.date).toUTCString().split("", 16)}
                        </div>
                      </div>
                      <div
                        className={`text-lg flex text-left font-medium mt-2 ${
                          data.teams.length > 0 ? "" : "hidden"
                        }`}
                      >
                        <div className="mr-2"> Playing Teams :</div>
                        <ul typeof="1">
                          {data.teams.map((team, index) => (
                            <li key={team.id}>
                              ({index + 1}) {team.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="m-2" />
                      <div className="overflow-y-auto text-lg font-medium mt-4 h-[300px]">
                        {data.content}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  } else {
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
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
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Loading...
                </Dialog.Title>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>;
  }
};

export default ReadArticle;
