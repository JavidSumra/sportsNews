import React, { createContext, useState } from "react";
interface ThemeContextProps {
  theme: string;
  setTheme: (color: string) => void;
}
const ThemeContext = createContext<ThemeContextProps>({
  theme: localStorage.getItem("theme") ?? "Light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
});
const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "Light");
  const valueToShare = {
    theme,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={valueToShare}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
