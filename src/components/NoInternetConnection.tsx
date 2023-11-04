import { useState, useEffect } from "react";
import NoInternetImage from "../assets/images/NoInternet.png";
import OfflineImage from "../assets/images/NoInternet.png"; // Import your offline image

const NoInternetConnection = (props: any) => {
  // state variable holds the state of the internet connection
  const [image, setImage] = useState(NoInternetImage);
  const [isOnline, setOnline] = useState(true);

  // On initialization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
    if (!navigator.onLine) {
      // If the user is offline, set the image to the offline image.
      setImage(OfflineImage);
    }
  }, []);

  // Event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
    setImage(NoInternetImage); // User is online, so set the image back to the default online image.
  });

  window.addEventListener("offline", () => {
    setOnline(false);
    setImage(OfflineImage); // User is offline, so set the image to the offline image.
  });

  // If the user is online, return the child component; else, return a custom component
  if (isOnline) {
    return props.children;
  } else {
    return (
      <div className="flex items-center justify-center flex-col">
        <img src={image} alt="No Internet Connection" />
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
