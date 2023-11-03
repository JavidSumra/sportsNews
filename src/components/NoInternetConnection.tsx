import { useState, useEffect } from "react";
import NoInternetImage from "../assets/images/NoInternet.png";

const NoInternetConnection = (props: any) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  // if user is online, return the child component else return a custom component
  if (isOnline) {
    return props.children;
  } else {
    return (
      <div className="flex items-center justify-center flex-col">
        <img src={NoInternetImage} alt="No Internet Connection" />
        <div className="font-bold text-2xl">You Are offline!</div>
        <h5 className="font-light">
          It seems there is a Problem with your Connection
        </h5>
        <h5 className="text-center font-light">
          Please Check Your Internet Connection
        </h5>
      </div>
    );
  }
};

export default NoInternetConnection;
