import Skeleton from "react-loading-skeleton";

const SkeletonLoading = () => {
  return (
    <div className="border-gray-200  shadow hover:bg-gray-100 dark:bg-gray-600  dark:hover:bg-gray-500 flex flex-col lg:flex-row m-2 bg-white rounded-lg hover:shadow-xl duration-300 justify-between ">
      <div className="flex flex-col  justify-between">
        <div className="type text-start mt-2 ml-4 text-gray-300 font-medium text-sm">
          <Skeleton width={100} height={15} />
        </div>
        <div className="middle mx-6 my-3">
          <div className="text-lg font-bold">
            <Skeleton width={200} height={25} />
          </div>
          <div className="text-sm font-medium mt-2">
            <Skeleton width={200} height={15} count={3} />
          </div>
        </div>

        <div className="bottom flex justify-between items-center text-sm font-bold w-full">
          <div className="readmore  p-2 text-xl duration-75 w-full">
            <Skeleton width={250} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
