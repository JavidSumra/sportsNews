/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNewsState } from "../../context/News/context";
import { NewsState, NewsData } from "../../context/News/types";
import { Link } from "react-router-dom";

interface PropsState {
  sportName: string;
  filter: string;
}

const NewsList = ({ sportName, filter }: PropsState) => {
  // const { sportName, filter } = props;
  // console.log(filter);
  const state: NewsState = useNewsState();
  const { isError, isLoading, errorMessage } = state;
  let { news } = state;

  if (sportName) {
    // console.log("Called");
    news = news.filter((newsData) => {
      return newsData.sport.name === sportName;
    });
    // console.log(news);
  }

  if (filter) {
    console.log(filter);
    if (filter == "Date") {
      news.sort(
        (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
      );
    } else if (filter == "Title") {
      news.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      news.sort((a, b) => a.sport.name.localeCompare(b.sport.name));
    }
    // news.sort();
  }
  // console.log(news);

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {news.map((data: NewsData) => (
        <div
          key={data.id}
          className="card flex flex-col lg:flex-row bg-white rounded-lg hover:shadow-xl duration-300 m-2 "
        >
          <div className="">
            <img
              src={data.thumbnail}
              alt="Thumbnail"
              className="w-[300px] h-full max-h-[200px]  object-cover rounded-l-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="top flex flex-row justify-between mx-4 font-semibold text-gray-500">
              <div className="tag mt-4">{data.sport.name}</div>
            </div>
            <div className="middle mx-6 my-3">
              <div className="title text-lg font-bold">{data.title}</div>
              <div className="excerpt text-sm font-medium">{data.summary}</div>
            </div>
            <div className="bottom flex justify-between items-center text-sm font-bold mx-10">
              <div className="date mb-4">
                {new Date(data.date).toUTCString().split("", 16)}
              </div>
              <div className="readmore hover:text-blue-500 duration-75 underline">
                <Link to={`News/${data.id}`}>Readmore...</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsList;
