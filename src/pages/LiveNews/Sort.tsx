import React from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
const Sort = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-8 w-full px-4">
        <div className="flex items-center justify-around">
          <span className="font-bold text-lg mx-4">Your News</span>
          <span className="font-bold text-lg mx-4">Cricket</span>
          <span className="font-bold text-lg mx-4">Football</span>
        </div>
        <div>
          <FunnelIcon className="w-5 h-5" />
        </div>
      </div>
    </>
  );
};

export default Sort;
