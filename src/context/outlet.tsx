import React, { createContext, useState } from "react";
interface OutletContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const OutletContext = createContext<OutletContextProps>({
  isOpen: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsOpen: () => {},
});
const OutletProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const valueToShare = {
    isOpen,
    setIsOpen,
  };
  return (
    <OutletContext.Provider value={valueToShare}>
      {children}
    </OutletContext.Provider>
  );
};
export { OutletProvider, OutletContext };
