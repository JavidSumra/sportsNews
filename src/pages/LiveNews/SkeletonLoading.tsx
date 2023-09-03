import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoading: React.FC = () => {
  return (
    <div className="card w-[98%] group border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-700  dark:hover:bg-gray-500  flex flex-col lg:flex-row bg-white rounded-lg hover:shadow-xl duration-300 m-2 ">
      <div>
        <Skeleton
          width={300}
          height={400}
          className="min-h-full max-h-[200px]  max-[1023px]:w-full max-[1023px]:rounded-t-lg  object-cover min-[1024px]:rounded-l-lg"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="top flex flex-row justify-between mx-4 font-semibold text-gray-500">
          <div className="tag mt-4 dark:text-gray-400">
            <Skeleton width={100} height={25} />
          </div>
        </div>

        <div className="middle mx-6 my-3">
          <div className="title text-lg font-bold">
            <Skeleton width={350} height={25} />
          </div>
          <div className="excerpt text-sm font-medium">
            <Skeleton width={500} height={40} />
          </div>
        </div>
        <div className="bottom flex justify-between items-center text-sm font-bold mx-10">
          <div className="date mb-4">
            <Skeleton width={100} height={20} />
          </div>
          <div className="readmore hover:text-blue-500 duration-75 underline">
            <Skeleton width={100} height={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
